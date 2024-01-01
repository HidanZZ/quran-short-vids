import { ReciterWithPreview, Surah } from "@/app/types/quranapi";
import { create } from "zustand";

interface Form {
	selectedSurah: Surah | undefined | null;
	selectedReciter: ReciterWithPreview | undefined | null;
	fromAyah: number | undefined | null;
	toAyah: number | undefined | null;
	setSelectedSurah: (surah: Surah | undefined | null) => void;
	setSelectedReciter: (reciter: ReciterWithPreview | undefined | null) => void;
	setFromAyah: (fromAyah: number | undefined | null) => void;
	setToAyah: (toAyah: number | undefined | null) => void;
}

export const useFormWizardStore = create<Form>((set) => ({
	selectedSurah: null,
	selectedReciter: null,
	fromAyah: null,
	toAyah: null,
	setSelectedSurah: (surah: Surah | undefined | null) =>
		set({ selectedSurah: surah }),
	setSelectedReciter: (reciter: ReciterWithPreview | undefined | null) =>
		set({ selectedReciter: reciter }),
	setFromAyah: (fromAyah: number | undefined | null) =>
		set({ fromAyah: fromAyah }),
	setToAyah: (toAyah: number | undefined | null) => set({ toAyah: toAyah }),
}));
