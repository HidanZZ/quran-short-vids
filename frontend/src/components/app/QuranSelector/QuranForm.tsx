"use client";
import ComboBox from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useFormStore, useFormWizardStore } from "@/store/formwizard";
import { useRecitersStore, useSurahsStore } from "@/store/quranapi";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

// Step 2: Define Zod schema
const quranSelectSchema = z.object({
	reciter: z.string(),
	surah: z.string(),
	fromAyah: z.number(),
	toAyah: z.number(),
});

type QuranSelectForm = z.infer<typeof quranSelectSchema>;

const QuranForm = () => {
	const { surahs, getSurahs } = useSurahsStore();
	const { reciters, getReciters } = useRecitersStore();
	const { state } = useFormWizardStore();
	const setSubmitForm = useFormStore((state) => state.setSubmitForm);
	const [comboReciter, setComboReciter] = useState("");
	const [comboSurah, setComboSurah] = useState("");

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		control,
		formState: { errors },
	} = useForm<QuranSelectForm>({
		resolver: zodResolver(quranSelectSchema),
		defaultValues: {
			reciter: "",
			surah: "",
			fromAyah: 1,
			toAyah: 2,
		},
	});

	const selectedSurah = watch("surah");
	const fromAyah = watch("fromAyah");
	const toAyah = watch("toAyah");

	useEffect(() => {
		// Set the handleSubmit function in the store when the component mounts
		setSubmitForm(handleSubmit);
		// Optionally clean up when the component unmounts
		return () => setSubmitForm(null);
	}, [setSubmitForm, handleSubmit]);

	useEffect(() => {
		if (errors) console.log(errors);
	}, [errors]);

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
	const findSurah = useCallback(
		(surahNumber: string) => {
			return surahs.find((surah) => surah.number.toString() === surahNumber);
		},
		[surahs]
	);
	const findReciterByName = (reciterName: string) => {
		return reciters.find(
			(reciter) => reciter.englishName.toLowerCase() === reciterName
		);
	};
	const findReciter = useCallback(
		(reciterIdentifier: string) => {
			return reciters.find(
				(reciter) => reciter.identifier === reciterIdentifier
			);
		},
		[reciters]
	);
	const selectSurah = (surahLabel: string) => {
		const surah = findSurah(surahLabel.split(".")[0]);
		setValue("surah", surah?.number.toString() ?? "");
	};
	const selectReciter = (reciterLabel: string) => {
		const reciter = findReciterByName(reciterLabel.split(" | ")[0]);
		setValue("reciter", reciter?.identifier ?? "");
	};
	const handleSetToAyah = (value: any, onChange: any) => {
		if (!selectedSurah) return;
		const surah = findSurah(selectedSurah);
		const numberOfAyahs = surah?.numberOfAyahs ?? 1;
		if (value < (fromAyah ?? 1)) {
			onChange(fromAyah ?? 1);
		} else if (!value || value > numberOfAyahs) {
			onChange(numberOfAyahs);
		} else {
			onChange(value);
		}
	};

	const handleSetFromAyah = (value: any, onChange: any) => {
		if (!selectedSurah) return;
		const surah = findSurah(selectedSurah);
		const numberOfAyahs = surah?.numberOfAyahs ?? 1;
		if (value > (toAyah ?? numberOfAyahs)) {
			onChange(toAyah ?? numberOfAyahs);
		} else if (!value || value < 1) {
			onChange(1);
		} else {
			onChange(value);
		}
	};
	useEffect(() => {
		if (state) {
			setValue("reciter", state.reciter);
			const reciter = findReciter(state.reciter);
			setComboReciter(
				`${reciter?.englishName} | ${reciter?.name}`.toLowerCase() ?? ""
			);
			setValue("surah", state.surah);
			const surah = findSurah(state.surah);

			setComboSurah(
				`${surah?.number}. ${surah?.englishName} | ${surah?.name}`.toLowerCase() ??
					""
			);
			setValue("fromAyah", state.fromAyah);
			setValue("toAyah", state.toAyah);
		}
	}, [state, setValue, findReciter, findSurah]);
	return (
		<form className='mx-2'>
			<div className='grid w-full items-center gap-4'>
				<div className='flex flex-col space-y-1.5'>
					<Label htmlFor='framework'>Reciters</Label>

					<Controller
						name='reciter'
						control={control}
						render={({ field }) => (
							<ComboBox
								options={recitersOptions}
								label='Reciter'
								onSelect={selectReciter}
								width={400}
								value={comboReciter}
								setValue={setComboReciter}
							/>
						)}
					/>
					{errors.reciter && (
						<p className='text-red-500 text-xs italic font-semibold'>
							{errors.reciter.message}
						</p>
					)}
				</div>
				{/* {selectedReciter && (
					<div className='flex flex-col space-y-1.5'>
						<Label>Preview</Label>
						<audio src={selectedReciter.preview} controls />
					</div>
				)} */}
				<div className='flex flex-col space-y-1.5'>
					<Label htmlFor='name'>Surah</Label>
					<Controller
						name='surah'
						control={control}
						render={({ field }) => (
							<ComboBox
								options={surahsOptions}
								label='Surah'
								onSelect={selectSurah}
								width={400}
								value={comboSurah}
								setValue={setComboSurah}
							/>
						)}
					/>
					{errors.surah && (
						<p className='text-red-500 text-xs italic font-semibold'>
							{errors.surah.message}
						</p>
					)}
				</div>
				{selectedSurah && (
					<div className='flex flex-col space-y-1.5'>
						<Label htmlFor='name'>Ayats</Label>
						<div className='flex flex-row space-x-2 items-baseline mt-4'>
							<Label className='text-xs'>From</Label>
							<Controller
								name='fromAyah'
								control={control}
								render={({ field: { value, onChange } }) => (
									<Input
										value={value}
										min={1}
										max={toAyah}
										onChange={(e) =>
											handleSetFromAyah(Number(e.target.value), onChange)
										}
										type='number'
										className='w-[70px]'
									/>
								)}
							/>
							<Label className='text-xs'>To</Label>
							<Controller
								name='toAyah'
								control={control}
								render={({ field: { value, onChange } }) => (
									<Input
										value={value}
										min={fromAyah}
										max={
											selectedSurah
												? findSurah(selectedSurah)?.numberOfAyahs ?? 1
												: 1
										}
										onChange={(e) =>
											handleSetToAyah(Number(e.target.value), onChange)
										}
										type='number'
										className='w-[70px]'
									/>
								)}
							/>
						</div>
					</div>
				)}
			</div>
		</form>
	);
};

export default QuranForm;
