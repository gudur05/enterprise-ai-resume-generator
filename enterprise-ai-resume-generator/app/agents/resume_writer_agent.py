import json
import time

from app.graph.state import ResumeState
from app.prompts.resume_prompt import RESUME_WRITER_PROMPT
from app.schemas.resume_content import ResumeContent
from app.services.llm_service import llm
from app.logging.logger import logger

structured_llm = llm.with_structured_output(ResumeContent)


def resume_writer(state: ResumeState):

    request_id = state["request_id"]
    
    start_time = time.perf_counter()

    logger.info(f"[{request_id}] Resume Writer started")

    prompt = RESUME_WRITER_PROMPT.format(
        candidate=json.dumps(state["request"], indent=2),
        profile_analysis=json.dumps(state["profile_analysis"], indent=2),
        ats_analysis=json.dumps(state["ats_analysis"], indent=2)
    )

    resume = structured_llm.invoke(prompt)
    
    execution_time = time.perf_counter() - start_time
    
    logger.info(f"[{request_id}] Resume Writer completed in {execution_time:.2f} seconds")

    return {
        **state,
        "resume_content": resume.model_dump()
    }