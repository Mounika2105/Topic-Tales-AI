# main.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from langgraph_flow import build_story_graph
from schemas import StoryRequest, StoryResponse
import chat,upload,rag

# === Init FastAPI app ===
app = FastAPI()

# === Serve audio files from static/audio ===
app.mount("/static", StaticFiles(directory="static"), name="static")

# === CORS for frontend (localhost:3000 for React) ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # You can restrict this later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Build LangGraph flow once ===
graph = build_story_graph()

# === API endpoint ===
@app.post("/generate", response_model=StoryResponse)
def generate_content(request: StoryRequest):
    try:
        result = graph.invoke({
            "topic": request.topic,
            "age": request.age,
            "language": request.language
        })

        return StoryResponse(
            story=result["story"],
            quiz=result["quiz"],
            audio_url=f"/{result['audio_url']}"
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

app.include_router(chat.router)
app.include_router(upload.router)
app.include_router(rag.router)