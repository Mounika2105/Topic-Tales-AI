# config.py

import os

# === OpenAI / LLM keys ===
#OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "your-default-key")

# === Output Directories ===
AUDIO_DIR = "static/audio"
os.makedirs(AUDIO_DIR, exist_ok=True)

# === Voice model to use ===
VOICE_MODEL = "male"  # or "female" (based on tts system you're using)

# === Language defaults ===
DEFAULT_LANGUAGE = "English"

# === App constants ===
MAX_QUIZ_QUESTIONS = 3
