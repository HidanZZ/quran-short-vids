import multer, { StorageEngine, FileFilterCallback } from "multer";
import { Request, Response } from "express";
import path from "path";
import { uploadedAudios } from "./temp-dir";
const audiosStorage: StorageEngine = multer.diskStorage({
	destination: (
		req: Request,
		file: Express.Multer.File,
		cb: (error: Error | null, destination: string) => void
	) => {
		cb(null, uploadedAudios);
	},
	filename: (
		req: Request,
		file: Express.Multer.File,
		cb: (error: Error | null, filename: string) => void
	) => {
		const uniqueSuffix: string = `${Date.now()}-${Math.round(
			Math.random() * 1e9
		)}`;
		cb(null, uniqueSuffix + path.extname(file.originalname));
	},
});

// File filter function for multer
const audioFileFilter = (
	req: Request,
	file: Express.Multer.File,
	cb: FileFilterCallback
) => {
	if (file.mimetype.startsWith("audio/")) {
		cb(null, true);
	} else {
		cb(new Error("Not an audio file!"));
	}
};

export const audioUpload = multer({
	storage: audiosStorage,
	fileFilter: audioFileFilter,
});
