from pathlib import Path

from langchain_community.document_loaders import DirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter


def load_documents():

    knowledge_path = Path(__file__).resolve().parents[1] / "knowledge"

    loader = DirectoryLoader(
        str(knowledge_path),
        glob="*.txt"
    )

    documents = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )

    return splitter.split_documents(documents)