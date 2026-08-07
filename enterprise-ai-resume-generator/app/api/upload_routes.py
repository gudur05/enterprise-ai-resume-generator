from fastapi import APIRouter, UploadFile, File, HTTPException, Depends

from app.security.api_key import verify_api_key
from app.parser.pdf_parser import extract_text_from_pdf
from app.parser.docx_parser import extract_docx_text

import os
import shutil

router = APIRouter()


@router.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...),
    api_key: str = Depends(verify_api_key)
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
        text = extract_text_from_pdf(file_path)
    else:
        text = extract_docx_text(file_path)

    return {
        "filename": file.filename,
        "text": text
    }