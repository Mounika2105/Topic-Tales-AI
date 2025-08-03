# quiz_agent.py

#from openai import OpenAI
from langchain_huggingface import HuggingFaceEndpoint,ChatHuggingFace
from prompts import QUIZ_PROMPT_TEMPLATE
from dotenv import load_dotenv

load_dotenv()

# Load API key
# OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
# client = OpenAI(api_key=OPENAI_API_KEY)

llm = HuggingFaceEndpoint(
    repo_id="google/gemma-2-2b-it",
    task='text-generation'
)

model = ChatHuggingFace(llm=llm)

def get_quiz_prompt(story: str, age: int, language: str):
    """Fill the quiz prompt template with inputs."""
    return QUIZ_PROMPT_TEMPLATE.format(story=story, age=age, language=language)

def generate_quiz_from_story(story: str, age: int = 10, language: str = "English") -> list:
    """
    Generate 2-3 quiz questions from the story content using LLM.
    Returns a list of dicts: [{question: str, options: [...], answer: str}]
    """
    """Call LLM to generate the story."""
    prompt = get_quiz_prompt(story, age, language)
    
    # response = client.chat.completions.create(
    #     model="gpt-4",
    #     messages=[
    #         {"role": "system", "content": "You create educational content for kids."},
    #         {"role": "user", "content": prompt}
    #     ],
    #     temperature=0.7,
    #     max_tokens=600
    # )

    messages=[
            {"role": "system", "content": "You create educational content for kids."},
            {"role": "user", "content": prompt}
        ]
    
    # Manually join messages into a single prompt string:
    prompt_text = "\n".join([m["content"] for m in messages])

    #raw_output = response.choices[0].message.content.strip()

    response = model.invoke(prompt_text, temperature=0.7, max_tokens=600)

    raw_output = response.content

    # Attempt to safely parse JSON
    try:
        import json
        quiz = json.loads(raw_output)
    except json.JSONDecodeError:
        quiz = []

    return quiz
