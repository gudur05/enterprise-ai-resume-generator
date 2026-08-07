from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str
    DEBUG: bool

    OPENAI_API_KEY: str
    MODEL_NAME: str
    API_KEY: str

    class Config:
        env_file = ".env"


settings = Settings()