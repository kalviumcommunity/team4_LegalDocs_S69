import chromadb


client = chromadb.PersistentClient(path="chroma_db")

collection = client.get_or_create_collection(
    name="clauseiq_documents"
)


def add_documents(chunks, embeddings):
    documents = []
    metadatas = []
    ids = []

    for i, chunk in enumerate(chunks):
        documents.append(chunk["text"])
        metadatas.append(chunk["metadata"])
        ids.append(f"chunk_{i}")

    collection.add(
        documents=documents,
        embeddings=embeddings,
        metadatas=metadatas,
        ids=ids
    )


def search_documents(query_embedding, top_k=5):
    return collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )