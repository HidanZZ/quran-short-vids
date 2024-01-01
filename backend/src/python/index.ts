import axios from "axios";

const PYTHON_URL = process.env.PYTHON_URL || "http://localhost:5000";

export const PythonService = {
	recognizeQuranAudio: async (audioPath: string) => {
		const response = await axios.post(`${PYTHON_URL}/recognize`, {
			audio: audioPath,
		});
		return response.data;
	},
};
