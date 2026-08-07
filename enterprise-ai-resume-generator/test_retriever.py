from app.rag.retriever import search_knowledge

context = search_knowledge(
    "How should a resume be ATS friendly?"
)

print(context)