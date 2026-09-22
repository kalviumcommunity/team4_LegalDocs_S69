from parser.pdf_parser import process_pdf
from embeddings.embedder import generate_embeddings
from embeddings.vector_store import collection
from retrieval.answer_generator import generate_answer


question = "Is water damage covered by the policy?"

query_embedding = generate_embeddings([question])[0]

results = collection.query(
    query_embeddings=[query_embedding],
    n_results=5
)

retrieved_chunks = []

for i in range(len(results["documents"][0])):
    retrieved_chunks.append({
        "text": results["documents"][0][i],
        "metadata": results["metadatas"][0][i]
    })


answer = generate_answer(
    question,
    retrieved_chunks
)

print("\nQUESTION:")
print(question)

print("\nANSWER:")
print(answer)

print("\nSOURCES:")

for chunk in retrieved_chunks:
    print(
        f"- {chunk['metadata']['document']}, "
        f"Page {chunk['metadata']['page']}, "
        f"Version {chunk['metadata']['version']}"
    )