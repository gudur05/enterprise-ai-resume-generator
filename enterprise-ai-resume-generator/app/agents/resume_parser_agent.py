import json
import time

from app.graph.state import ResumeState
from app.logging.logger import logger
from app.services.llm_service import llm
from app.schemas.resume_request import ResumeRequest


structured_llm = llm.with_structured_output(ResumeRequest)


def resume_parser(state: ResumeState):

    request_id = state["request_id"]

    logger.info(f"[{request_id}] Resume Parser started")

    start = time.perf_counter()

    resume_text = state["resume_text"]

    prompt = f"""
You are an expert Resume Parser.

Extract the following information from the resume.

Return ONLY valid JSON.

Resume:

{resume_text}
"""

    parsed = structured_llm.invoke(prompt)

    logger.info(
        f"[{request_id}] Resume Parser completed in {time.perf_counter()-start:.2f} seconds"
    )

    return {
        **state,
        "request": parsed.model_dump()
    }