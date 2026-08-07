from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings

from app.config import settings
from app.rag.loader import load_documents


def build_vector_store():

    documents = load_documents()

    embeddings = OpenAIEmbeddings(
        api_key=settings.OPENAI_API_KEY
    )

    vector_db = Chroma.from_documents(
        documents=documents,
        embedding=embeddings,
        persist_directory="vector_db"
    )

    return vector_db