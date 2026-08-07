import json
import os
import shutil
import uuid
from collections.abc import Generator
from typing import Any

from fastapi import (
    APIRouter,
    File,
    Form,
    HTTPException,
    UploadFile,
)
from fastapi.responses import StreamingResponse

from app.graph.graph import graph
from app.parser.docx_parser import extract_docx_text
from app.parser.pdf_parser import extract_text_from_pdf
from app.services.resume_parser_service import parse_resume


router = APIRouter()


NODE_LABELS = {
    "profile_analyzer": "Profile Analyzer",
    "ats_optimizer": "ATS Optimizer",
    "resume_writer": "Resume Writer",
    "reviewer": "Resume Reviewer",
    "job_match": "Job Matcher",
}


def create_sse_event(
    event_type: str,
    data: dict[str, Any],
) -> str:
    payload = {
        "type": event_type,
        **data,
    }

    return f"data: {json.dumps(payload, default=str)}\n\n"


def stream_resume_generation(
    resume_text: str,
    job_description: str,
    request_id: str,
) -> Generator[str, None, None]:

    state: dict[str, Any] = {
        "request_id": request_id,
        "resume_text": resume_text,
    }

    try:
        yield create_sse_event(
            "step_started",
            {
                "step": "resume_parser",
                "label": "Resume Parser",
            },
        )

        parsed_resume = parse_resume(resume_text)

        parsed_resume["job_description"] = job_description

        state["request"] = parsed_resume

        yield create_sse_event(
            "step_completed",
            {
                "step": "resume_parser",
                "label": "Resume Parser",
            },
        )

        yield create_sse_event(
            "pipeline_started",
            {
                "request_id": request_id,
            },
        )

        for update in graph.stream(
            {
                "request": parsed_resume,
                "request_id": request_id,
                "resume_text": resume_text,
            },
            stream_mode="updates",
        ):
            if not isinstance(update, dict):
                continue

            for node_name, node_update in update.items():

                label = NODE_LABELS.get(
                    node_name,
                    node_name.replace("_", " ").title(),
                )

                yield create_sse_event(
                    "step_completed",
                    {
                        "step": node_name,
                        "label": label,
                    },
                )

                if isinstance(node_update, dict):
                    state.update(node_update)

        yield create_sse_event(
            "completed",
            {
                "request_id": request_id,
                "result": state,
            },
        )

    except Exception as exc:
        yield create_sse_event(
            "error",
            {
                "request_id": request_id,
                "message": str(exc),
            },
        )


@router.post("/generate-ai-resume-stream")
async def generate_ai_resume_stream(
    file: UploadFile = File(...),
    job_description: str = Form(...),
):
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="A resume file is required.",
        )

    extension = file.filename.rsplit(".", 1)[-1].lower()

    if extension not in {"pdf", "docx"}:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are supported.",
        )

    if not job_description.strip():
        raise HTTPException(
            status_code=400,
            detail="Job description is required.",
        )

    os.makedirs("uploads", exist_ok=True)

    safe_filename = (
        f"{uuid.uuid4()}_{os.path.basename(file.filename)}"
    )

    file_path = os.path.join(
        "uploads",
        safe_filename,
    )

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer,
            )

        if extension == "pdf":
            resume_text = extract_text_from_pdf(file_path)
        else:
            resume_text = extract_docx_text(file_path)

        if not resume_text.strip():
            raise HTTPException(
                status_code=400,
                detail=(
                    "No readable text was found in the uploaded resume."
                ),
            )

        request_id = str(uuid.uuid4())

        return StreamingResponse(
            stream_resume_generation(
                resume_text=resume_text,
                job_description=job_description.strip(),
                request_id=request_id,
            ),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no",
            },
        )

    finally:
        await file.close()