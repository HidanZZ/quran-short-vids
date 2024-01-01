import ffmpeg from "fluent-ffmpeg";
import dotenv from "dotenv";
import path from "path";
import { tempDir } from "@/utils/temp-dir";
dotenv.config();
const USE_GPU = process.env.USE_GPU === "true";
const GPU_TYPE = process.env.GPU_TYPE === "nvidia" ? "h264_nvenc" : "h264_amf";
export async function combineAudios(
	audioFiles: string[],
	limit?: number
): Promise<string> {
	return new Promise(async (resolve, reject) => {
		let processor = ffmpeg();
		const outputPath = path.join(tempDir, "combined.mp3");
		let audiosToProcess = [];
		if (limit) {
			//limit in seconds
			//check if sum of durations is more than limit
			let sum = 0;
			for (const audioFile of audioFiles) {
				const duration = await getDuration(audioFile);
				console.log("audio", audioFile, "duration", duration);

				if (duration) {
					sum += duration;
				}
				if (sum > limit) {
					break;
				}
				audiosToProcess.push(audioFile);
			}
		} else {
			audiosToProcess = audioFiles;
		}

		if (USE_GPU) {
			processor
				.videoCodec(GPU_TYPE) // Use Nvidia's hardware-accelerated H264 encoder
				.outputOptions("-rc:v", "vbr") // Variable bitrate
				.outputOptions("-cq", "18"); // Maximum quantizer scale
		} else {
			processor
				.videoCodec("libx264") // Use software (CPU) encoding
				.outputOptions("-preset", "slow")
				.outputOptions("-crf", "18");
		}
		console.log("use gpu: ", USE_GPU);

		for (const audioFile of audiosToProcess) {
			console.log("audioFile: ", audioFile);

			processor.input(audioFile);
		}
		let filter = "";
		for (let i = 0; i < audiosToProcess.length; i++) {
			filter += `[${i}:a]`;
		}
		filter += `concat=n=${audiosToProcess.length}:v=0:a=1[out]`;
		processor
			.outputOptions(["-filter_complex", filter, "-map", "[out]"])
			.save(outputPath)
			.on("end", () => {
				resolve(outputPath);
			})
			.on("error", reject)
			.on("progress", (progress) => {
				console.log(`Combining audios: ${progress.percent}%`);
			});
	});
}

async function getDuration(path: string): Promise<number | undefined> {
	return new Promise((resolve, reject) => {
		ffmpeg.ffprobe(path, (err, metadata) => {
			if (err) {
				reject(err);
			} else {
				resolve(metadata.format.duration);
			}
		});
	});
}
