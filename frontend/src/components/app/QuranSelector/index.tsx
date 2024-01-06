"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import UploadAudio from "./UploadAudio";
import QuranForm from "./QuranForm";
import QuranPreview from "./QuranPreview";
import { useFormStore, useFormWizardStore } from "@/store/formwizard";
const Separator = () => (
	<div className='relative mx-4'>
		<div className='absolute inset-0 flex items-center justify-center'>
			<span className='h-[80%] border-l' />
		</div>
		<div className='relative flex justify-center text-xs uppercase h-full items-center'>
			<span className='bg-background px-2 text-muted-foreground'>Or</span>
		</div>
	</div>
);
const QuranSelector = () => {
	const { submitForm } = useFormStore();
	const { setState, incrementStep } = useFormWizardStore();
	const onSubmit = () => {
		if (submitForm)
			submitForm((data) => {
				setState(data);
				incrementStep();
			})();
	};
	return (
		<Card>
			<CardHeader>
				<CardTitle>Select Quran Verses</CardTitle>
				<CardDescription>Deploy your new project in one-click.</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-4 justify-center items-center'>
				<div className='flex flex-row'>
					<QuranForm />
					{/* <Separator />
					<UploadAudio /> */}
				</div>
				{/* <div className='w-[500px] p-4 select-none'>
					<QuranPreview />
				</div> */}
			</CardContent>
			<CardFooter className='flex justify-end'>
				{/* <Button variant='outline'>Cancel</Button> */}
				<Button onClick={onSubmit}>Next</Button>
			</CardFooter>
		</Card>
	);
};

export default QuranSelector;
