from flask import Flask, request, jsonify
from transcription import transcribe_audio
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv(".env")


app = Flask(__name__)


@app.route("/transcribe", methods=["GET"])
def transcribe():
    audio_file = request.args.get("audio")
    if audio_file == None:
        return jsonify({"error": "No audio file specified"})
    # Extract data from the request
    # data = request.json
    audio_file = os.getenv("DATA_PATH") + "audio/" + audio_file
    print(audio_file)
    # Call your transcription function
    result = transcribe_audio(audio_file)

    # Return the result
    return jsonify(result)


@app.route("/health")
def health():
    return "OK"


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
