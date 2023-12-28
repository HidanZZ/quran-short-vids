import whisper_timestamped as whisper


model_dir = "models/quran-whisper.pt"

model = whisper.load_model("./whisper-base.pt")


def transcribe_audio(audio_file):
    audio = whisper.load_audio(audio_file)
    transcription = whisper.transcribe(model, audio, language="ar")
    return transcription


if __name__ == "__main__":
    audio_file_path = sys.argv[1]
    result = transcribe_audio(audio_file_path)
    print(result)
