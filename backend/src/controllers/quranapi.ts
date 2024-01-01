import { QuranApiService } from "@/services";
import { Ayah, Reciter, ReciterWithPreview } from "@/types/quranapi";
import axios from "axios";
import fs from "fs";
import path from "path";
import { publicDir } from "@/utils/temp-dir";
import e, { Request, Response } from "express";
import { basename } from "path";
import { PythonService } from "@/python";

const QURAN_API_URL = "http://api.alquran.cloud/v1";

export const QuranApiController = {
	getSurahs: async (_: any, res: any) => {
		try {
			const response = await axios.get(`${QURAN_API_URL}/meta`);
			if (response.data.code === 200) {
				res.status(200).json(response.data.data.surahs.references);
			} else {
				res.status(500).json({ message: "Error with Quran API" });
			}
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Error with Quran API" });
		}
	},
	getReciters: async (_: any, res: any) => {
		try {
			const response = await axios.get<{
				code: number;
				data: Array<Reciter>;
			}>(`${QURAN_API_URL}/edition?format=audio&language=ar`);
			if (response.data.code === 200) {
				const reciters = response.data.data;
				const recitersWithPreview = [] as Array<ReciterWithPreview>;
				for (const reciter of reciters) {
					const preview = await axios.get<{
						code: number;
						data: Ayah;
					}>(`${QURAN_API_URL}/ayah/262/${reciter.identifier}`);
					if (preview.data.code === 200) {
						recitersWithPreview.push({
							...reciter,
							preview: preview.data.data.audio,
						});
					}
				}
				res.status(200).json(recitersWithPreview);
			} else {
				res.status(500).json({ message: "Error with Quran API" });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "Error with Quran API" });
		}
	},
	recognizeUploadedAudio: async (req: Request, res: Response) => {
		try {
			if (!req.file) {
				return res.status(400).send("No file uploaded.");
			}
			console.log("file", req.file);
			//replace \\ with /
			const audioPath =
				req.file.destination.replace(/\\/g, "/").split("/").pop() +
				"/" +
				req.file.filename;
			console.log("audioPath", audioPath);

			const response = await PythonService.recognizeQuranAudio(audioPath);

			console.log("responseaaaaa", response);

			const { start_surah, start_ayah, end_ayah } = response.recognition;

			res.status(200).json({ surah: start_surah, start_ayah, end_ayah });
		} catch (error: any) {
			//get data from error object
			const { response } = error;

			res.status(500).json({ message: response.data.error });
		}
	},
	getAyahRange: async (req: Request, res: Response) => {
		try {
			const { surah, start_ayah, end_ayah } = req.params;
			if (!surah || !start_ayah || !end_ayah) {
				return res.status(400).json({ message: "Missing required fields" });
			}
			const ayahs = [];
			for (let i = parseInt(start_ayah); i <= parseInt(end_ayah); i++) {
				const ayah = await QuranApiService.getAyah(
					parseInt(surah),
					i,
					"ar.alafasy"
				);
				if (ayah) {
					ayahs.push(ayah);
				}
			}
			res.status(200).json(ayahs);
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	},
};
