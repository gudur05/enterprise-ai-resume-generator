from fastapi import APIRouter, HTTPException

from app.orchestrator.resume_orchestrator import ResumeOrchestrator
from app.schemas.copilot import (
    CopilotRequest,
    CopilotResponse,
    CopilotResumeGenerateRequest,
    CopilotResumeGenerateResponse,
)
from app.services.resume_copilot_service import ResumeCopilotService


router = APIRouter()

orchestrator = ResumeOrchestrator()


@router.post(
    "/resume-copilot/chat",
    response_model=CopilotResponse,
)
def chat_with_resume_copilot(
    request: CopilotRequest,
) -> CopilotResponse:
    try:
        service = ResumeCopilotService()

        history = [
            message.model_dump()
            for message in request.history
        ]

        answer = service.answer_question(
            question=request.question,
            resume_result=request.resume_result,
            history=history,
        )

        return CopilotResponse(
            answer=answer,
        )

    except RuntimeError as exc:
        raise HTTPException(
            status_code=500,
            detail=str(exc),
        ) from exc

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=(
                "Resume Copilot was unable to answer "
                f"the question: {exc}"
            ),
        ) from exc


@router.post(
    "/resume-copilot/generate",
    response_model=CopilotResumeGenerateResponse,
)
def generate_resume_from_copilot(
    request: CopilotResumeGenerateRequest,
) -> CopilotResumeGenerateResponse:
    try:
        resume_request = {
            "name": request.name.strip(),
            "skills": [
                skill.strip()
                for skill in request.skills
                if skill.strip()
            ],
            "experience": request.experience.strip(),
            "projects": [
                project.strip()
                for project in request.projects
                if project.strip()
            ],
            "education": request.education.strip(),
            "certifications": [
                certification.strip()
                for certification in request.certifications
                if certification.strip()
            ],
            "job_description": request.job_description.strip(),
        }

        result = orchestrator.run(resume_request)

        return CopilotResumeGenerateResponse(
            result=result,
        )

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=(
                "Resume Copilot was unable to generate "
                f"the resume: {exc}"
            ),
        ) from exc