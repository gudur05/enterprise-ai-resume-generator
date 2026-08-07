from pydantic import BaseModel
from typing import List


class ResumeContent(BaseModel):

    professional_summary: str

    experience_bullets: List[str]

    skills: List[str]

    projects: List[str]