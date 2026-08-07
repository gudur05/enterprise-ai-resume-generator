import json
import time

from app.graph.state import ResumeState
from app.logging.logger import logger
from app.prompts.ats_prompt import ATS_PROMPT
from app.schemas.ats_analysis import ATSAnalysis
from app.services.llm_service import llm
from app.rag.retriever import search_knowledge


structured_llm = llm.with_structured_output(ATSAnalysis)


def ats_optimizer(state: ResumeState) -> ResumeState:

    request_id = state["request_id"]

    start_time = time.perf_counter()

    logger.info(f"[{request_id}] ATS Optimizer started")

    candidate = state["request"]

    knowledge = search_knowledge(
        "ATS resume optimization best practices"
    )

    logger.info(
        f"[{request_id}] Retrieved ATS knowledge from Vector Database"
    )

    prompt = ATS_PROMPT.format(
        candidate=json.dumps(candidate, indent=2),
        knowledge=knowledge
    )

    ats_analysis = structured_llm.invoke(prompt)

    execution_time = time.perf_counter() - start_time

    logger.info(
        f"[{request_id}] ATS Optimizer completed in {execution_time:.2f} seconds"
    )

    return {
        **state,
        "ats_analysis": ats_analysis.model_dump()
    }