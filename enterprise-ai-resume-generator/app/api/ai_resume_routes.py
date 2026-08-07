from fastapi import APIRouter, UploadFile, File, Form, HTTPException
import os
import shutil

from app.parser.pdf_parser import extract_text_from_pdf
from app.parser.docx_parser import extract_docx_text
from app.services.resume_parser_service import parse_resume
from app.orchestrator.resume_orchestrator import ResumeOrchestrator

router = APIRouter()

orchestrator = ResumeOrchestrator()


@router.post("/generate-ai-resume")
async def generate_ai_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):

    extension = file.filename.split(".")[-1].lower()

    if extension not in ["pdf", "docx"]:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are supported."
        )

    os.makedirs("uploads", exist_ok=True)

    file_path = os.path.join("uploads", file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    if extension == "pdf":
        resume_text = extract_text_from_pdf(file_path)
    else:
        resume_text = extract_docx_text(file_path)

    parsed_resume = parse_resume(resume_text)

    parsed_resume["job_description"] = job_description

    result = orchestrator.run(parsed_resume)

    return result