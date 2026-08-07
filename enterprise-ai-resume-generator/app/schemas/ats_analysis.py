from pydantic import BaseModel
from typing import List


class ATSAnalysis(BaseModel):
    ats_score: int
    missing_keywords: List[str]
    formatting_suggestions: List[str]