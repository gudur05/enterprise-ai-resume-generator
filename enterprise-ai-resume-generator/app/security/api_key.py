from fastapi import Security, HTTPException
from fastapi.security import APIKeyHeader

from app.config import settings

api_key_scheme = APIKeyHeader(
    name="x-api-key"
)


def verify_api_key(api_key: str = Security(api_key_scheme)):

    if api_key != settings.API_KEY:
        raise HTTPException(
            status_code=401,
            detail="Invalid API Key"
        )

    return api_key