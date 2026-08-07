from fastapi import APIRouter
from fastapi.responses import FileResponse
from app.generators.pdf_generator import generate_resume_pdf
from app.orchestrator.resume_orchestrator import ResumeOrchestrator

router = APIRouter()

orchestrator = ResumeOrchestrator()


@router.post("/download-resume")
def download_resume(result: dict):

    output_file = "generated_resume.pdf"

    generate_resume_pdf(
        result,
        output_file
    )

    return FileResponse(
        path=output_file,
        media_type="application/pdf",
        filename="AI_Generated_Resume.pdf"
    )