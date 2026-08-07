from pydantic import BaseModel
from typing import List


class ResumeRequest(BaseModel):
    name: str
    skills: List[str]
    experience: str
    projects: List[str]
    education: str
    certifications: List[str]
    job_description: str
