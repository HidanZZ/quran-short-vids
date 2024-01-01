import { Ayah, ReciterWithPreview, Surah } from "@/app/types/quranapi";
import api from "@/lib/api";

export class QuranApi {
	static async getSurahs() {
		const response = await api.get<Array<Surah>>("/quran/surahs");
		const data = await response.data;
		return data;
	}
	static async getReciters() {
		const response = await api.get<Array<ReciterWithPreview>>(
			"/quran/reciters"
		);
		const data = await response.data;
		return data;
	}

	static async recognizeQuranAudio(audio: File) {
		const formData = new FormData();
		formData.append("audioFile", audio);
		const response = await api.post<{
			surah: number;
			start_ayah: number;
			end_ayah: number;
		}>("/quran/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	}

	static async getAyahRange(
		surah: number,
		start_ayah: number,
		end_ayah: number
	) {
		const response = await api.get<Array<Ayah>>(
			`/quran/preview/${surah}/${start_ayah}/${end_ayah}`
		);

		return response.data;
	}
}
