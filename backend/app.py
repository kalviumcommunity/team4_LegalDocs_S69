from fastapi import FastAPI

app = FastAPI(
    title="ClauseIQ API",
    description="RAG-based property insurance document assistant",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "ClauseIQ API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }
from schemas import QuestionRequest


@app.post("/ask")
def ask_question(request: QuestionRequest):
    try:
        return {
            "status": "success",
            "question": request.question,
            "answer": "RAG answer generation will be connected here.",
            "sources": []
        }
    except Exception:
        return {
            "status": "error",
            "question": request.question,
            "answer": "Unable to process the question.",
            "sources": []
        }
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "ClauseIQ API"
    }
@app.get("/")
def root():
    return {
        "message": "ClauseIQ API is running",
        "version": "1.0"
    }