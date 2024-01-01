import path from "path";
import os from "os";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const temp = path.join(os.tmpdir(), "quran-short-vids");

export const publicDir = path.join(__dirname, "..", "..", "public");
export const uploadedAudios = path.join(
	publicDir,
	"..",
	process.env.DATA_PATH || "../data",
	"uploaded-audios"
);

//check if folder exists
if (!fs.existsSync(temp)) {
	fs.mkdirSync(temp);
}
if (!fs.existsSync(uploadedAudios)) {
	fs.mkdirSync(uploadedAudios);
}

export const tempDir = temp;
