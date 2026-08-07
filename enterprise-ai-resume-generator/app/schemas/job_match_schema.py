from pydantic import BaseModel
from typing import List


class JobMatchAnalysis(BaseModel):
    match_score: int
    matching_skills: List[str]
    missing_skills: List[str]
    recommendations: List[str]