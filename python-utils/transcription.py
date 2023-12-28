import whisper_timestamped as whisper


model_dir = "models/quran-whisper.pt"

model = whisper.load_model(model_dir)


def transcribe_audio(audio_file):
    audio = whisper.load_audio(audio_file)
    transcription = whisper.transcribe(model, audio, language="ar")
    return transcription
