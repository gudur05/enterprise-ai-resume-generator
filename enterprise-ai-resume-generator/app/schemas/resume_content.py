from pydantic import BaseModel
from typing import List


class ResumeContent(BaseModel):
    professional_summary: str
    experience_bullets: List[str]
    skills: List[str]
    project_descriptions: List[str]