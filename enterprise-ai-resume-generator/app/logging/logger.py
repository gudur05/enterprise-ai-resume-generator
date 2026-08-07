from loguru import logger
import sys

logger.remove()

logger.add(
    sys.stdout,
    level="INFO",
    format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {message}"
)

logger.add(
    "logs/application.log",
    rotation="10 MB",
    retention="10 days",
    level="INFO"
)