from fastapi import APIRouter
from pydantic import BaseModel
from langchain_core.prompts import ChatPromptTemplate
from utils.rag import get_ncert_answer  # (we’ll implement this separately)
from langchain_huggingface import HuggingFaceEndpoint,ChatHuggingFace

router = APIRouter()

llm = HuggingFaceEndpoint(
    repo_id="TinyLlama/TinyLlama-1.1B-Chat-v1.0",
    task='text-generation'
)

model = ChatHuggingFace(llm=llm)

# === Schemas ===
class StoryChatRequest(BaseModel):
    question: str
    story: str

class NcertChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    answer: str

# === /chat/story endpoint ===
@router.post("/chat/story", response_model=ChatResponse)
def chat_about_story(data: StoryChatRequest):
    prompt = ChatPromptTemplate.from_template(
        "You are a fun and friendly teacher AI. A student just read this story:\n\n{story}\n\nNow they have a question:\n{question}\n\nPlease answer clearly and kindly."
    )
    chain = prompt | model
    answer = chain.invoke({"story": data.story, "question": data.question})
    return ChatResponse(answer=answer)

# === /chat/ncert endpoint ===
@router.post("/chat/ncert", response_model=ChatResponse)
def chat_with_ncert(data: NcertChatRequest):
    answer = get_ncert_answer(data.question)
    return ChatResponse(answer=answer)
