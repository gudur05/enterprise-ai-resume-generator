from app.schemas.resume_request import ResumeRequest
from app.services.llm_service import llm

structured_llm = llm.with_structured_output(ResumeRequest)


def parse_resume(resume_text: str):

    prompt = f"""
Extract the following fields from the resume.

Return ONLY valid JSON.

Resume:

{resume_text}
"""

    result = structured_llm.invoke(prompt)

    return result.model_dump()