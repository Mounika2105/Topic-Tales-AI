# llm_story_agent.py

from langchain_huggingface import HuggingFaceEndpoint,ChatHuggingFace
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnableLambda
#from openai import OpenAI
from prompts import STORY_PROMPT_TEMPLATE
from config import AUDIO_DIR, VOICE_MODEL
from dotenv import load_dotenv
import re

load_dotenv()

# Load your OpenAI key from config or env
# OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
# client = OpenAI(api_key=OPENAI_API_KEY)

llm = HuggingFaceEndpoint(
    repo_id="TinyLlama/TinyLlama-1.1B-Chat-v1.0",
    task='text-generation'
)

model = ChatHuggingFace(llm=llm)

def get_story_prompt(subject: str, age: int, language: str):
    """Fill the story prompt template with inputs."""
    return STORY_PROMPT_TEMPLATE.format(subject=subject, age=age, language=language)

def generate_story(subject: str, age: int, language: str) -> str:
    prompt = get_story_prompt(subject, age, language)
     # response = client.chat.completions.create(
    #     model="gpt-4",
    #     messages=[
    #         {"role": "system", "content": "You are a creative children's storyteller."},
    #         {"role": "user", "content": prompt}
    #     ],
    #     temperature=0.8,
    #     max_tokens=1000
    # )
    messages = [
        {"role": "system", "content": "You are a creative children's storyteller."},
        {"role": "user", "content": prompt}
    ]
    prompt_text = "\n".join([m["content"] for m in messages])
    response = model.invoke(prompt_text, temperature=0.8, max_tokens=1000)

    # story = response.choices[0].message.content.strip()
    # return story

    title_match = re.search(r"Title:\s*(.*)", response.content)
    title = title_match.group(1).strip() if title_match else "Untitled Story"

    # Remove title from content if included
    content = re.sub(r"(Title:\s*.*\n?)", "", response.content, count=1).strip()

    return {
        "title": title,
        "content": content
    }
    