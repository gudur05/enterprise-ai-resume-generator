from pydantic import BaseModel
from typing import List


class ParsedResume(BaseModel):
    name: str
    skills: List[str]
    experience: str
    education: str
    projects: List[str]
    certifications: List[str]