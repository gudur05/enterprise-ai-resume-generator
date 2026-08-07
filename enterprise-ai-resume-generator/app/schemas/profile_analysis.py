from pydantic import BaseModel


class ProfileAnalysis(BaseModel):
    candidate_level: str
    primary_domain: str
    years_experience: int