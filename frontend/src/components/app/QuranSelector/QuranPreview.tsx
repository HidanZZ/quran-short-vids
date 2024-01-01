"use client";
import Loader from "@/components/Loader";
import { usePreviewAyahStore } from "@/store/quranapi";
import { createElement } from "react";

const QuranPreview = () => {
	const { ayahs, loading } = usePreviewAyahStore();
	const replaceDigits = (number: number) => {
		var map = [
			"&#1776;",
			"&#1777;",
			"&#1778;",
			"&#1779;",
			"&#1780;",
			"&#1781;",
			"&#1782;",
			"&#1783;",
			"&#1784;",
			"&#1785;",
		];
		return number.toString().replace(/\d/g, (d) => map[+d]);
	};
	const renderHTML = (rawHTML: string) =>
		createElement("span", {
			dangerouslySetInnerHTML: { __html: rawHTML },
			className: "text-2xl",
		});

	return (
		<div dir='rtl' className='font-quran1 w-full text-center'>
			{loading ? (
				<Loader />
			) : (
				ayahs && (
					<>
						{ayahs.map((ayah, index) => {
							return (
								<>
									<span key={index} className='text-3xl'>
										{ayah.text}
									</span>
									<span>
										{"  "}
										&#xFD3F;{renderHTML(replaceDigits(ayah.numberInSurah))}
										&#xFD3E;{"  "}
									</span>
								</>
							);
						})}
					</>
				)
			)}
		</div>
	);
};

export default QuranPreview;
