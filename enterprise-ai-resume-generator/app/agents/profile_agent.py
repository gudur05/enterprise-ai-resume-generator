import json
import time

from app.graph.state import ResumeState
from app.prompts.profile_prompt import PROFILE_ANALYZER_PROMPT
from app.schemas.profile_analysis import ProfileAnalysis
from app.services.llm_service import llm
from app.logging.logger import logger

structured_llm = llm.with_structured_output(ProfileAnalysis)


def profile_analyzer(state: ResumeState):

    request_id = state["request_id"]

    start_time = time.perf_counter()

    logger.info(f"[{request_id}] Profile Analyzer started")

    candidate = state["request"]

    prompt = PROFILE_ANALYZER_PROMPT.format(
        candidate=json.dumps(candidate, indent=2)
    )

    analysis = structured_llm.invoke(prompt)

    execution_time = time.perf_counter() - start_time

    logger.info(
        f"[{request_id}] Profile Analyzer completed in {execution_time:.2f} seconds"
    )

    return {
        **state,
        "profile_analysis": analysis.model_dump(),
    }
