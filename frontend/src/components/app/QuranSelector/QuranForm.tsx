"use client";
import ComboBox from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useFormWizardStore } from "@/store/formwizard";
import { useRecitersStore, useSurahsStore } from "@/store/quranapi";
import { useEffect } from "react";

const QuranForm = () => {
	const { surahs, getSurahs } = useSurahsStore();
	const { reciters, getReciters } = useRecitersStore();

	const {
		selectedReciter,
		selectedSurah,
		fromAyah,
		toAyah,
		setSelectedReciter,
		setSelectedSurah,
		setFromAyah,
		setToAyah,
	} = useFormWizardStore();
	useEffect(() => {
		if (!surahs.length) getSurahs();
	}, [surahs, getSurahs]);
	useEffect(() => {
		if (!reciters.length) getReciters();
	}, [reciters, getReciters]);

	const surahsOptions = surahs.map((surah) => ({
		value: `${surah.number}. ${surah.englishName} | ${surah.name}`,
		label: surah.englishName,
	}));
	const recitersOptions = reciters.map((reciter) => ({
		value: `${reciter.englishName} | ${reciter.name}`,
		label: reciter.englishName,
	}));
	const findSurah = (surahNumber: string) => {
		return surahs.find((surah) => surah.number.toString() === surahNumber);
	};
	const findReciter = (reciterName: string) => {
		return reciters.find(
			(reciter) => reciter.englishName.toLowerCase() === reciterName
		);
	};
	const selectSurah = (surahLabel: string) => {
		const surah = findSurah(surahLabel.split(".")[0]);
		setSelectedSurah(surah);
		if (surah) {
			setFromAyah(1);
			setToAyah(surah.numberOfAyahs);
		}
	};
	const selectReciter = (reciterLabel: string) => {
		const reciter = findReciter(reciterLabel.split(" | ")[0]);
		setSelectedReciter(reciter);
	};
	const handleSetToAyah = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!selectedSurah) return;
		const value = parseInt(e.target.value);
		if (value < (fromAyah ?? 1)) {
			setToAyah(fromAyah ?? 1);
		} else if (!value || value > selectedSurah.numberOfAyahs) {
			setToAyah(selectedSurah.numberOfAyahs);
		} else {
			setToAyah(value);
		}
	};

	const handleSetFromAyah = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!selectedSurah) return;
		const value = parseInt(e.target.value);
		if (value > (toAyah ?? selectedSurah.numberOfAyahs)) {
			setFromAyah(toAyah ?? selectedSurah.numberOfAyahs);
		} else if (!value || value < 1) {
			setFromAyah(1);
		} else {
			setFromAyah(value);
		}
	};
	return (
		<form className='mx-2'>
			<div className='grid w-full items-center gap-4'>
				<div className='flex flex-col space-y-1.5'>
					<Label htmlFor='framework'>Reciters</Label>
					<ComboBox
						options={recitersOptions}
						label='Reciter'
						onSelect={selectReciter}
						width={400}
					/>
				</div>
				{selectedReciter && (
					<div className='flex flex-col space-y-1.5'>
						<Label>Preview</Label>
						<audio src={selectedReciter.preview} controls />
					</div>
				)}
				<div className='flex flex-col space-y-1.5'>
					<Label htmlFor='name'>Surah</Label>
					<ComboBox
						options={surahsOptions}
						label='Surah'
						onSelect={selectSurah}
						width={400}
					/>
				</div>
				{selectedSurah && (
					<div className='flex flex-col space-y-1.5'>
						<Label htmlFor='name'>Ayats</Label>
						<div className='flex flex-row space-x-2 items-baseline mt-4'>
							<Label className='text-xs'>From</Label>
							<Input
								type='number'
								min={1}
								className='w-[70px]'
								value={fromAyah ?? 1}
								onChange={handleSetFromAyah}
							/>
							<Label className='text-xs'>To</Label>
							<Input
								type='number'
								max={selectedSurah.numberOfAyahs}
								className='w-[70px]'
								value={toAyah ?? selectedSurah.numberOfAyahs}
								onChange={handleSetToAyah}
							/>
						</div>
					</div>
				)}
			</div>
		</form>
	);
};

export default QuranForm;
