from parser.pdf_parser import process_pdf


chunks = process_pdf(
    "data/property_policy.pdf",
    version="2026"
)

print(f"Total chunks: {len(chunks)}")

for chunk in chunks[:3]:
    print("\n--- CHUNK ---")
    print(chunk["text"][:300])
    print(chunk["metadata"])