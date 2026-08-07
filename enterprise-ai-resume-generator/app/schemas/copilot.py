from typing import Any

from pydantic import BaseModel, Field


class CopilotMessage(BaseModel):
    role: str = Field(
        ...,
        pattern="^(user|assistant)$",
    )

    content: str = Field(
        ...,
        min_length=1,
        max_length=5000,
    )


class CopilotRequest(BaseModel):
    question: str = Field(
        ...,
        min_length=1,
        max_length=5000,
    )

    resume_result: dict[str, Any]

    history: list[CopilotMessage] = Field(
        default_factory=list,
        max_length=20,
    )


class CopilotResponse(BaseModel):
    answer: str


class CopilotResumeGenerateRequest(BaseModel):
    name: str = Field(
        ...,
        min_length=2,
        max_length=150,
    )

    skills: list[str] = Field(
        default_factory=list,
    )

    experience: str = Field(
        ...,
        min_length=10,
        max_length=10000,
    )

    projects: list[str] = Field(
        default_factory=list,
    )

    education: str = Field(
        ...,
        min_length=2,
        max_length=1000,
    )

    certifications: list[str] = Field(
        default_factory=list,
    )

    job_description: str = Field(
        ...,
        min_length=10,
        max_length=15000,
    )


class CopilotResumeGenerateResponse(BaseModel):
    result: dict[str, Any]