import { QuranApiController } from "@/controllers";
import { audioUpload } from "@/utils/multer";
import { Router } from "express";
import { Request, Response } from "express";

export const quranapi = (router: Router): void => {
	router.get("/quran/surahs", QuranApiController.getSurahs);
	router.get("/quran/reciters", QuranApiController.getReciters);
	router.post(
		"/quran/upload",
		audioUpload.single("audioFile"),
		QuranApiController.recognizeUploadedAudio
	);
	router.get(
		"/quran/preview/:surah/:start_ayah/:end_ayah",
		QuranApiController.getAyahRange
	);
};
