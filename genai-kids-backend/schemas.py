# schemas.py

from pydantic import BaseModel, Field
from typing import List, Optional

# === Request ===

class StoryRequest(BaseModel):
    topic: str = Field(..., example="Photosynthesis")
    age: int = Field(..., example=5)
    language: str = Field(..., example="English")

# === Story Output ===

class StoryOutput(BaseModel):
    title: str
    content: str

# === Quiz Output ===

class QuizItem(BaseModel):
    question: str
    options: List[str]
    answer: str

# === Final Response ===

class StoryResponse(BaseModel):
    story: StoryOutput
    quiz: List[QuizItem]
    audio_url: str
