from langchain_openai import ChatOpenAI

from app.config import settings


llm = ChatOpenAI(
    model=settings.MODEL_NAME,
    api_key=settings.OPENAI_API_KEY,
    temperature=0
)