from typing import Any

from fastapi import (
    APIRouter,
    HTTPException,
)

from pydantic import BaseModel

from app.orchestrator.resume_orchestrator import (
    ResumeOrchestrator,
)

from app.schemas.copilot import (
    CopilotRequest,
    CopilotResponse,
    CopilotResumeGenerateRequest,
    CopilotResumeGenerateResponse,
)

from app.services.resume_copilot_service import (
    ResumeCopilotService,
)


router = APIRouter()

orchestrator = ResumeOrchestrator()


# =========================================================
# COPILOT ACTION MODELS
# =========================================================


class CopilotActionRequest(BaseModel):
    action: str

    resume_result: dict[
        str,
        Any,
    ]


class CopilotActionResponse(BaseModel):
    result: dict[
        str,
        Any,
    ]

    message: str


# =========================================================
# RESUME COPILOT CHAT
# =========================================================


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
            for message
            in request.history
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
                "Resume Copilot was unable "
                "to answer the question: "
                f"{exc}"
            ),
        ) from exc


# =========================================================
# GENERATE RESUME USING COPILOT
# =========================================================


@router.post(
    "/resume-copilot/generate",
    response_model=CopilotResumeGenerateResponse,
)
def generate_resume_from_copilot(
    request: CopilotResumeGenerateRequest,
) -> CopilotResumeGenerateResponse:

    try:

        resume_request = {
            "name":
                request.name.strip(),

            "skills": [
                skill.strip()
                for skill
                in request.skills
                if skill.strip()
            ],

            "experience":
                request.experience.strip(),

            "projects": [
                project.strip()
                for project
                in request.projects
                if project.strip()
            ],

            "education":
                request.education.strip(),

            "certifications": [
                certification.strip()
                for certification
                in request.certifications
                if certification.strip()
            ],

            "job_description":
                request.job_description.strip(),
        }

        result = orchestrator.run(
            resume_request
        )

        return (
            CopilotResumeGenerateResponse(
                result=result,
            )
        )

    except Exception as exc:

        raise HTTPException(
            status_code=500,
            detail=(
                "Resume Copilot was unable "
                "to generate the resume: "
                f"{exc}"
            ),
        ) from exc


# =========================================================
# APPLY AI IMPROVEMENT TO GENERATED RESUME
# =========================================================


@router.post(
    "/resume-copilot/apply-action",
    response_model=CopilotActionResponse,
)
def apply_resume_copilot_action(
    request: CopilotActionRequest,
) -> CopilotActionResponse:

    try:

        service = ResumeCopilotService()

        updated_result, message = (
            service.apply_resume_action(
                action=request.action,
                resume_result=request.resume_result,
            )
        )

        return CopilotActionResponse(
            result=updated_result,
            message=message,
        )

    except ValueError as exc:

        raise HTTPException(
            status_code=400,
            detail=str(exc),
        ) from exc

    except Exception as exc:

        raise HTTPException(
            status_code=500,
            detail=(
                "Resume Copilot was unable "
                "to apply the requested improvement: "
                f"{exc}"
            ),
        ) from exc