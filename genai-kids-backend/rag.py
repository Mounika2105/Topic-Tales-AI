from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from utils.rag import answer_question_from_ncert

router = APIRouter()

class RagQuery(BaseModel):
    question: str

@router.post("/ncert-chat")
async def ncert_chat(query: RagQuery):
    try:
        response = answer_question_from_ncert(query.question)
        return {"answer": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
