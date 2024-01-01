from flask import Flask, request, jsonify
from transcription import transcribe_audio
from ayah_recognizer import recognize
import os
from dotenv import load_dotenv
from flask import abort

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
    audio_file = os.getenv("DATA_PATH") + audio_file
    print(audio_file)
    # Call your transcription function
    result = transcribe_audio(audio_file)
    return jsonify(result)


@app.route("/recognize", methods=["POST"])
def recognize_text():
    # Extract JSON data from the request
    data = request.get_json()
    print(data)

    # Get audio file path from request data
    audio_file = data.get("audio")
    if audio_file is None:
        # Correct way to return a 500 error with a JSON message
        response = jsonify({"error": "No audio file specified"})
        response.status_code = 500
        return response

    audio_file_path = os.getenv("DATA_PATH") + audio_file
    print(audio_file_path)

    # Call your transcription function
    try:
        result = transcribe_audio(audio_file_path)
        arabic_text = result["text"]
        output = recognize(arabic_text)
        print(output)

        if "error" in output:
            # Correct way to return a 500 error with a JSON message
            response = jsonify(output)
            response.status_code = 500
            return response

        # Return the successful result
        return jsonify({"transcription": result, "recognition": output})

    except Exception as e:
        # Handling any other exceptions
        response = jsonify({"error": str(e)})
        response.status_code = 500
        return response


@app.route("/health")
def health():
    return "OK"


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
