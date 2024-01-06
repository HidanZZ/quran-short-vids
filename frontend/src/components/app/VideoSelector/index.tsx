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

import { useFormWizardStore } from "@/store/formwizard";

const VideoSelector = () => {
	const { setState, incrementStep, decrementStep } = useFormWizardStore();

	const back = () => {
		decrementStep();
	};
	return (
		<Card>
			<CardHeader>
				<CardTitle>Background Video </CardTitle>
				<CardDescription>
					Select Background video or add your own
				</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-4 justify-center items-center'>
				<div className='flex flex-row'></div>
			</CardContent>
			<CardFooter className='flex justify-end'>
				<Button onClick={back}>Cancel</Button>
				{/* <Button onClick={onSubmit}>Next</Button> */}
			</CardFooter>
		</Card>
	);
};

export default VideoSelector;
