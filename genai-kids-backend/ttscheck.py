from TTS.api import TTS
#TTS_MODEL = "tts_models/multilingual/multi-dataset/your_tts"
tts = TTS(model_name="tts_models/en/ljspeech/glow-tts", gpu=False)

#tts.tts_to_file(text="Hello, children how are you all today im going to tell you all a story!", file_path="output.wav")
#tts = TTS(TTS_MODEL)

print(tts.speakers)