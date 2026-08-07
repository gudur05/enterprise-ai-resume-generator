from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router as profile_router
from app.api.upload_routes import router as upload_router
from app.api.ai_resume_routes import router as ai_resume_router
from app.api.download_routes import router as download_router
from app.api.stream_resume_routes import router as stream_resume_router
from app.api.analysis_report_routes import (
    router as analysis_report_router,
)
from app.api.copilot_routes import (
    router as copilot_router,
)


app = FastAPI(
    title="Enterprise AI Resume Generator",
    description=(
        "Multi-agent AI platform for resume parsing, ATS optimization, "
        "resume generation, review, job matching, analysis reporting, "
        "Resume Copilot assistance, and PDF export."
    ),
    version="1.2.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "application": "Enterprise AI Resume Generator",
        "status": "running",
        "documentation": "/docs",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
    }


app.include_router(
    profile_router,
    tags=["Profile Analysis"],
)

app.include_router(
    upload_router,
    tags=["Resume Upload"],
)

app.include_router(
    ai_resume_router,
    tags=["AI Resume Generation"],
)

app.include_router(
    stream_resume_router,
    tags=["Streaming AI Workflow"],
)

app.include_router(
    download_router,
    tags=["Resume Download"],
)

app.include_router(
    analysis_report_router,
    tags=["Analysis Report"],
)

app.include_router(
    copilot_router,
    tags=["Resume Copilot"],
)