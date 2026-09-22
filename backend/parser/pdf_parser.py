from pathlib import Path
from pypdf import PdfReader


def extract_pdf(file_path):
    reader = PdfReader(file_path)
    pages = []

    for page_number, page in enumerate(reader.pages, start=1):
        text = page.extract_text() or ""

        pages.append({
            "page": page_number,
            "text": text.strip()
        })

    return pages


def chunk_by_sections(pages, document_name, version="unknown"):
    chunks = []

    for page in pages:
        sections = page["text"].split("\n\n")

        for section in sections:
            section = section.strip()

            if not section:
                continue

            chunks.append({
                "text": section,
                "metadata": {
                    "document": document_name,
                    "page": page["page"],
                    "version": version
                }
            })

    return chunks


def process_pdf(file_path, version="unknown"):
    file_path = Path(file_path)

    pages = extract_pdf(file_path)

    return chunk_by_sections(
        pages,
        document_name=file_path.name,
        version=version
    )