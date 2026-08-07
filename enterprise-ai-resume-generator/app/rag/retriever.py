from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings

from app.config import settings

embeddings = OpenAIEmbeddings(
    api_key=settings.OPENAI_API_KEY
)

vector_db = Chroma(
    persist_directory="vector_db",
    embedding_function=embeddings
)

retriever = vector_db.as_retriever(
    search_kwargs={
        "k": 3
    }
)


def search_knowledge(query: str) -> str:
    """
    Search the vector database and return the most relevant documents.
    """

    docs = retriever.invoke(query)

    return "\n\n".join(
        doc.page_content
        for doc in docs
    )