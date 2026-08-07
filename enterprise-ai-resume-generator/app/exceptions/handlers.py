from fastapi import Request
from fastapi.responses import JSONResponse

from app.exceptions.custom_exceptions import ResumeGenerationException
from app.logging.logger import logger


async def resume_generation_exception_handler(
    request: Request,
    exc: ResumeGenerationException
):
    logger.error(exc.message)

    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "message": "Resume generation failed.",
            "error": exc.message
        }
    )