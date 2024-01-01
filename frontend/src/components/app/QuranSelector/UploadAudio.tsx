"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRecognizeQuranAudioStore } from "@/store/quranapi";

const UploadAudio = () => {
	const { recognizeQuranAudio, loading } = useRecognizeQuranAudioStore();
	const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		recognizeQuranAudio(file);
	};
	return (
		<div className='flex flex-col space-y-1.5 items-center justify-center'>
			<div className='grid w-full w-[400px] items-center gap-1.5'>
				<Label htmlFor='picture'>Upload your own verses</Label>
				<Input
					id='picture'
					type='file'
					accept='audio/*'
					onChange={onUpload}
					disabled={loading}
				/>
			</div>
		</div>
	);
};

export default UploadAudio;
