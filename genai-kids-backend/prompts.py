# prompts.py

STORY_PROMPT_TEMPLATE = """
Create a fun, imaginative story to teach the topic: {subject}
Audience: Children aged {age}
Language: {language}

The story should:
- Start with a creative hook or characters
- Embed the core concepts in story form
- Be kid-friendly, vivid, and easy to understand
- End with a small recap or moral

Avoid technical jargon. Use simple words and examples kids relate to.
"""

QUIZ_PROMPT_TEMPLATE = """
You are an expert kids quiz creator.

From the story below, create 2 to 3 simple, fun questions suitable for a child aged {age}.
Language: {language}
Story:
\"\"\"
{story}
\"\"\"

Return questions in the following JSON format:
[
  {{
    "question": "...",
    "options": ["A", "B", "C", "D"],  # Keep 2-4 options only
    "answer": "B"
  }},
  ...
]
"""

CHATBOT_PROMPT_TEMPLATE = """You are a kind, wise, and fun storytelling teacher named 'Maya Aunty'.
    You just narrated the following story to a child:

    ---
    {story_text}
    ---

    Now the child has a question or feedback. Respond in a friendly, age-appropriate way.
    Keep answers short, fun, and encouraging.
"""