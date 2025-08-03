# backend/agents/chatbot_agent.py

#from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema import HumanMessage, SystemMessage
from langchain_huggingface import HuggingFaceEndpoint,ChatHuggingFace
from prompts import CHATBOT_PROMPT_TEMPLATE
from dotenv import load_dotenv

load_dotenv()

#llm = ChatOpenAI(model="gpt-4", temperature=0.7)

llm = HuggingFaceEndpoint(
    repo_id="google/gemma-2-2b-it",
    task='conversational'
)

model = ChatHuggingFace(llm=llm)

def get_chatbot_prompt(story_text: str, user_message: str):
    """Fill the chat prompt template with inputs."""
    return CHATBOT_PROMPT_TEMPLATE.format(story_text=story_text, user_message=user_message)

def chatbot_reply(story_text: str, user_message: str) -> str:
    
    system_prompt = get_chatbot_prompt(story_text,user_message)
    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=user_message)
    ]

    response = model.invoke(messages)
    return response.content
