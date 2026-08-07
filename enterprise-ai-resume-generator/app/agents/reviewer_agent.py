import json
import time

from app.graph.state import ResumeState
from app.prompts.reviewer_prompt import REVIEWER_PROMPT
from app.schemas.review_analysis import ReviewAnalysis
from app.services.llm_service import llm
from app.logging.logger import logger


structured_llm = llm.with_structured_output(ReviewAnalysis)


def reviewer(state: ResumeState):

    request_id = state["request_id"]
        
    start_time = time.perf_counter()
    
    logger.info(f"[{request_id}] Reviewer started")
     
    prompt = REVIEWER_PROMPT.format(
        candidate=json.dumps(state["request"], indent=2),
        resume=json.dumps(state["resume_content"], indent=2)
    )

    review = structured_llm.invoke(prompt)

    execution_time = time.perf_counter() - start_time
        
    logger.info(f"[{request_id}] Reviewer completed in {execution_time:.2f} seconds")

    return {
        **state,
        "review_analysis": review.model_dump()
    }