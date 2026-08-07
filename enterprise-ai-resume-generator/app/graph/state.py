from typing_extensions import TypedDict

class ResumeState(TypedDict):
    request: dict

    request_id: str
    

    profile_analysis: dict
    ats_analysis: dict
    resume_content: dict
    review_analysis: dict
    job_match: dict
    resume_text: str
    