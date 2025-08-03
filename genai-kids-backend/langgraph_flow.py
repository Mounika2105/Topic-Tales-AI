# langgraph_flow.py

from langgraph.graph import StateGraph, END
from typing import TypedDict
from llm_story_agent import generate_story
from quiz_agent import generate_quiz_from_story
from voice_gen import generate_voice
from schemas import StoryOutput, QuizItem

# === Define state shape ===
class StoryState(TypedDict):
    topic: str
    age: int
    language: str
    story: StoryOutput
    quiz: list[QuizItem]
    audio_url: str

# === Node 1: Story Generator ===
def story_node(state: StoryState) -> StoryState:
    story = generate_story(state["topic"], state["age"], state["language"])
    return {**state, "story": story}

# === Node 2: Quiz Generator ===
def quiz_node(state: StoryState) -> StoryState:
    quiz = generate_quiz_from_story(state["story"]["content"], state["age"], state["language"])
    return {**state, "quiz": quiz}

# === Node 3: Voice Generator ===
def voice_node(state: StoryState) -> StoryState:
    audio_path = generate_voice(state["story"]["content"])
    return {**state, "audio_url": audio_path}

# === Define LangGraph flow ===
def build_story_graph():
    builder = StateGraph(StoryState)

    builder.add_node("generate_story", story_node)
    builder.add_node("generate_quiz", quiz_node)
    builder.add_node("generate_voice", voice_node)

    # Flow: Story → Quiz → Voice → End
    builder.set_entry_point("generate_story")
    builder.add_edge("generate_story", "generate_quiz")
    builder.add_edge("generate_quiz", "generate_voice")
    builder.add_edge("generate_voice", END)

    return builder.compile()
