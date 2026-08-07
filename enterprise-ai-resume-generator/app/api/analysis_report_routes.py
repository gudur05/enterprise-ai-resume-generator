import os
import tempfile

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from starlette.background import BackgroundTask

from app.generators.analysis_report_generator import (
    generate_analysis_report_pdf,
)


router = APIRouter()


def remove_temporary_file(file_path: str) -> None:
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
    except OSError:
        pass


@router.post("/download-analysis-report")
def download_analysis_report(result: dict):
    required_keys = {
        "request",
        "ats_analysis",
        "review_analysis",
        "job_match",
    }

    missing_keys = [
        key
        for key in required_keys
        if key not in result
    ]

    if missing_keys:
        raise HTTPException(
            status_code=400,
            detail=(
                "Analysis data is incomplete. Missing: "
                + ", ".join(sorted(missing_keys))
            ),
        )

    temporary_file = tempfile.NamedTemporaryFile(
        prefix="resume_analysis_",
        suffix=".pdf",
        delete=False,
    )

    output_path = temporary_file.name
    temporary_file.close()

    try:
        generate_analysis_report_pdf(
            result,
            output_path,
        )
    except Exception as exc:
        remove_temporary_file(output_path)

        raise HTTPException(
            status_code=500,
            detail=f"Unable to generate analysis report: {exc}",
        ) from exc

    return FileResponse(
        path=output_path,
        media_type="application/pdf",
        filename="AI_Resume_Analysis_Report.pdf",
        background=BackgroundTask(
            remove_temporary_file,
            output_path,
        ),
    )