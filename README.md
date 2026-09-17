# ClauseIQ

ClauseIQ is a Retrieval-Augmented Generation (RAG) based property insurance document assistant.

## Problem Statement

A property insurance provider holds policy documents, claim guidelines, and underwriting manuals, but adjusters frequently misquote coverage terms because the answers are buried across hundreds of overlapping documents.

## Tech Stack

- Python
- FastAPI
- pypdf
- Sentence Transformers
- ChromaDB
- Claude API
- React

## Backend Structure

- `app.py` — FastAPI application
- `data/` — Insurance documents
- `parser/` — PDF parsing and chunking
- `embeddings/` — Document embeddings
- `retrieval/` — Semantic retrieval

## Sprint 2 — Day 1

- Initialized backend structure
- Configured FastAPI
- Added health check endpoint
- Added RAG-related dependencies
- Created directories for future document processing