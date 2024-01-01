import { Ayah } from "@/types/quranapi";
import axios from "axios";

const QURAN_API_URL = "http://api.alquran.cloud/v1";
export const QuranApiService = {
	getAyah: async (surah: number, ayah: number, reciterId: string) => {
		try {
			const response = await axios.get<{
				code: number;
				data: Ayah;
			}>(`${QURAN_API_URL}/ayah/${surah}:${ayah}/${reciterId}`);
			if (response.data.code === 200) {
				return response.data.data;
			} else {
				return null;
			}
		} catch (err) {
			console.log(err);
			return null;
		}
	},
	getWholeQuran: async () => {
		try {
			const response = await axios.get<{
				code: number;
				data: Array<Ayah>;
			}>(`${QURAN_API_URL}/quran/quran-simple-clean`);
			if (response.data.code === 200) {
				return response.data.data;
			} else {
				return null;
			}
		} catch (err) {
			console.log(err);
			return null;
		}
	},
};
