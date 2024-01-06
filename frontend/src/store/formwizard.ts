import { ReciterWithPreview, Surah } from "@/app/types/quranapi";
import { UseFormHandleSubmit } from "react-hook-form";
import { create } from "zustand";

interface FormWizard {
	state: {
		surah: string;
		reciter: string;
		fromAyah: number;
		toAyah: number;
	} | null;
	step: number;
	setState: (state: {
		surah: string;
		reciter: string;
		fromAyah: number;
		toAyah: number;
	}) => void;
	incrementStep: () => void;
	decrementStep: () => void;
}

export const useFormWizardStore = create<FormWizard>((set) => ({
	state: null,
	step: 1,
	incrementStep: () => set((state) => ({ step: state.step + 1 })),
	decrementStep: () => set((state) => ({ step: state.step - 1 })),
	setState: (state) => set(() => ({ state })),
}));

export const useFormStore = create<{
	submitForm: null | UseFormHandleSubmit<
		{
			reciter: string;
			surah: string;
			fromAyah: number;
			toAyah: number;
		},
		undefined
	>;
	setSubmitForm: (
		submitHandler: UseFormHandleSubmit<
			{
				reciter: string;
				surah: string;
				fromAyah: number;
				toAyah: number;
			},
			undefined
		> | null
	) => void;
}>((set) => ({
	submitForm: null,
	setSubmitForm: (submitHandler) => set(() => ({ submitForm: submitHandler })),
}));
