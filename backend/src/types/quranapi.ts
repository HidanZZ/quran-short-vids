type Surah = {
	number: number;
	name: string;
	englishName: string;
	numberOfAyahs: number;
};

type Reciter = {
	identifier: string;
	name: string;
	englishName: string;
	language: string;
};

type ReciterWithPreview = Reciter & {
	preview: string;
};

type Ayah = {
	number: number;
	audio: string;
	text: string;
	numberInSurah: number;
};

export type { Surah, Reciter, ReciterWithPreview, Ayah };
