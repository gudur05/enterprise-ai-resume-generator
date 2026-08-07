from pydantic import BaseModel
from typing import List


class ReviewAnalysis(BaseModel):
    grammar_score: int
    professionalism_score: int
    formatting_score: int
    overall_score: int
    strengths: List[str]
    improvements: List[str]