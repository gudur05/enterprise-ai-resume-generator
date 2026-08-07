import json
import time

from app.graph.state import ResumeState
from app.logging.logger import logger
from app.prompts.job_match_prompt import (
    JOB_MATCH_PROMPT,
)
from app.schemas.job_match_schema import (
    JobMatchAnalysis,
)
from app.services.llm_service import llm


structured_llm = llm.with_structured_output(
    JobMatchAnalysis,
    method="function_calling",
)


def job_matcher(
    state: ResumeState,
) -> ResumeState:
    request = state["request"]

    request_id = state["request_id"]

    resume_content = state.get(
        "resume_content",
        {},
    )

    logger.info(
        f"[{request_id}] Job Matcher started"
    )

    start_time = time.perf_counter()

    candidate_context = {
        "original_candidate_information":
            request,

        "current_resume_content":
            resume_content,
    }

    prompt = JOB_MATCH_PROMPT.format(
        candidate=json.dumps(
            candidate_context,
            indent=2,
        ),
        job_description=
            request["job_description"],
    )

    result = structured_llm.invoke(
        prompt
    )

    execution_time = (
        time.perf_counter()
        - start_time
    )

    logger.info(
        f"[{request_id}] Job Matcher completed "
        f"in {execution_time:.2f} seconds"
    )

    return {
        **state,
        "job_match":
            result.model_dump(),
    }