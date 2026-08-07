from fastapi import APIRouter, Depends, UploadFile, File
import os
import shutil

from app.security.api_key import verify_api_key
from app.orchestrator.resume_orchestrator import ResumeOrchestrator
from app.schemas.resume_request import ResumeRequest

router = APIRouter()

orchestrator = ResumeOrchestrator()


@router.post("/profile-analysis")
def profile_analysis(
    request: ResumeRequest,
    api_key: str = Depends(verify_api_key)
):

    result = orchestrator.run(
        request.model_dump()
    )
    return result

@router.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...),
    api_key: str = Depends(verify_api_key)
):

    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "Resume uploaded successfully",
        "filename": file.filename,
        "path": file_path
    }