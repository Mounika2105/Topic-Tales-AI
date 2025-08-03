# voice_gen.py

from TTS.api import TTS
import os
import uuid
from config import AUDIO_DIR, VOICE_MODEL

# Load a multilingual expressive model
TTS_MODEL = "tts_models/en/ljspeech/glow-tts"

tts = TTS(model_name=TTS_MODEL, progress_bar=False, gpu=False)

OUTPUT_DIR = "static/audio"
os.makedirs(OUTPUT_DIR, exist_ok=True)

#def generate_voice(story_text: str, speaker: str = "female-en-5\n", output_format: str = "mp3") -> str:
def generate_voice(story_text: str, output_format: str = "mp3") -> str:
    """
    Convert story text to speech and save it to a file.
    Returns the path to the generated audio file.
    """
    file_name = f"story_{uuid.uuid4().hex[:8]}.{output_format}"
    file_path = os.path.join(OUTPUT_DIR, file_name)
    url_path = file_path.replace("\\", "/")

    # Generate and save audio
    tts.tts_to_file(
        text=story_text,
        #speaker=speaker,
        file_path=file_path,
        #language = "en"
    )
    url_path = file_path.replace("\\", "/")
    return url_path
