from parser.pdf_parser import process_pdf
from embeddings.embedder import generate_embeddings
from embeddings.vector_store import add_documents, search_documents


chunks = process_pdf(
    "data/property_policy.pdf",
    version="2026"
)

texts = [chunk["text"] for chunk in chunks]

embeddings = generate_embeddings(texts)

add_documents(chunks, embeddings)

print(f"Stored {len(chunks)} chunks in ChromaDB.")


query = "Is water damage covered by the policy?"

query_embedding = generate_embeddings([query])[0]

results = search_documents(query_embedding, top_k=3)

print("\nRelevant documents:\n")

for document in results["documents"][0]:
    print("---")
    print(document[:500])