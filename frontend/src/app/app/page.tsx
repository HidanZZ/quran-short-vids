"use client";

import QuranSelector from "@/components/app/QuranSelector";
import VideoSelector from "@/components/app/VideoSelector";
import { useFormWizardStore } from "@/store/formwizard";
import React from "react";

const steps: Record<number, React.JSX.Element> = {
	1: <QuranSelector />,
	2: <VideoSelector />,
};

const AppPage = () => {
	const { step } = useFormWizardStore();
	return (
		<div className='container mx-auto flex h-screen justify-center items-center'>
			{steps[step]}
		</div>
	);
};

export default AppPage;
