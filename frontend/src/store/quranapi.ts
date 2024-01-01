import { Ayah, ReciterWithPreview, Surah } from "@/app/types/quranapi";
import { QuranApi } from "@/services/quranapi";
import toast from "react-hot-toast";
import { create } from "zustand";

interface SurahsState {
	surahs: Array<Surah>;
	getSurahs: () => Promise<void>;
}
interface RecitersState {
	reciters: Array<ReciterWithPreview>;
	getReciters: () => Promise<void>;
}

export const useSurahsStore = create<SurahsState>((set) => ({
	surahs: [],
	getSurahs: async () => {
		try {
			const response = await QuranApi.getSurahs();

			set({ surahs: response });
		} catch (err) {
			console.log(err);
		}
	},
}));

export const usePreviewAyahStore = create<{
	ayahs: Array<Ayah>;
	loading: boolean;
	getPreviewAyah: (
		surah: number,
		start_ayah: number,
		end_ayah: number
	) => Promise<void>;
}>((set) => ({
	ayahs: [],
	loading: false,
	getPreviewAyah: async (
		surah: number,
		start_ayah: number,
		end_ayah: number
	) => {
		try {
			set({ loading: true });
			const response = await QuranApi.getAyahRange(surah, start_ayah, end_ayah);

			set({ ayahs: response });
		} catch (err) {
			console.log(err);
		} finally {
			set({ loading: false });
		}
	},
}));

export const useRecitersStore = create<RecitersState>((set) => ({
	reciters: [],
	getReciters: async () => {
		try {
			const response = await QuranApi.getReciters();

			set({ reciters: response });
		} catch (err) {
			console.log(err);
		}
	},
}));

export const useRecognizeQuranAudioStore = create<{
	recognizeQuranAudio: (audio: File) => Promise<void>;
	loading: boolean;
}>((set) => ({
	ayahs: [],
	loading: false,
	recognizeQuranAudio: async (audio: File) => {
		try {
			set({ loading: true });
			const response = await QuranApi.recognizeQuranAudio(audio);
			if (response) {
				const { surah, start_ayah, end_ayah } = response;
				usePreviewAyahStore
					.getState()
					.getPreviewAyah(surah, start_ayah, end_ayah);
			}
		} catch (err: any) {
			//get message from error object
			const { message } = err.response.data;
			console.log(message);

			toast.error(message);
		} finally {
			set({ loading: false });
		}
	},
}));
