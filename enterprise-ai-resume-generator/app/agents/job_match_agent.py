import json
import time

from app.graph.state import ResumeState
from app.logging.logger import logger
from app.prompts.job_match_prompt import JOB_MATCH_PROMPT
from app.schemas.job_match_schema import JobMatchAnalysis
from app.services.llm_service import llm


structured_llm = llm.with_structured_output(JobMatchAnalysis)


def job_matcher(state: ResumeState):

    request = state["request"]
    request_id = state["request_id"]

    logger.info(f"[{request_id}] Job Matcher started")

    start = time.perf_counter()

    prompt = JOB_MATCH_PROMPT.format(
        candidate=json.dumps(request, indent=2),
        job_description=request["job_description"]
    )

    result = structured_llm.invoke(prompt)

    logger.info(
        f"[{request_id}] Job Matcher completed in {time.perf_counter()-start:.2f} seconds"
    )

    return {
        **state,
        "job_match": result.model_dump()
    }