import os
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

client = Anthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY")
)


def generate_answer(question, retrieved_chunks):

    context = "\n\n".join(
        [
            f"""
Document: {chunk['metadata']['document']}
Page: {chunk['metadata']['page']}
Version: {chunk['metadata']['version']}

Content:
{chunk['text']}
"""
            for chunk in retrieved_chunks
        ]
    )

    prompt = f"""
You are ClauseIQ, an assistant for property insurance adjusters.

Answer the user's question ONLY using the provided document context.

Rules:
1. Do not use outside knowledge.
2. Do not guess or hallucinate.
3. If the answer is not present in the context, say:
   "The available documents do not provide enough information to answer this."
4. Mention the relevant document and page when answering.
5. If the retrieved documents contain conflicting information, clearly state that there is a conflict and identify both sources.

DOCUMENT CONTEXT:
{context}

USER QUESTION:
{question}
"""

    response = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=500,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.content[0].text