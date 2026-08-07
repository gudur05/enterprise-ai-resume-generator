import uuid
import time

from app.graph.graph import graph
from app.logging.logger import logger
from app.exceptions.custom_exceptions import ResumeGenerationException

class ResumeOrchestrator:

   def run(self, request: dict):

    request_id = str(uuid.uuid4())

    start_time = time.perf_counter()

    logger.info(f"[{request_id}] Resume generation started")

    try:

        result = graph.invoke(
            {
                "request": request,
                "request_id": request_id
            }
        )

        total_time = time.perf_counter() - start_time

        logger.info(
            f"[{request_id}] Resume generation completed in {total_time:.2f} seconds"
        )

        return result

    except Exception as e:

        logger.exception(f"[{request_id}] Resume generation failed")

        raise ResumeGenerationException(str(e))