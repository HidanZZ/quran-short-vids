import json
from pyarabic.araby import strip_diacritics
import arabic_reshaper
import unicodedata


def load_quran_data(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)


def remove_diacritics(text):
    text = text.replace("ٱ", "ا")
    text = text.replace("ي", "ى")
    # remove spaces
    text = text.replace(" ", "")
    return strip_diacritics(text)


def reshape_and_normalize(text):
    return unicodedata.normalize("NFKD", remove_diacritics(text))


def concatenate_quran_verses(quran_data):
    concatenated_text = ""
    ayah_boundaries = []
    current_index = 0

    for surah in quran_data["surahs"]:
        # if surah["number"] == 2:
        #     break
        for ayah in surah["ayahs"]:
            normalised_text = reshape_and_normalize(ayah["text"])
            start_index = current_index
            concatenated_text += normalised_text
            end_index = current_index + (len(normalised_text) - 1)
            ayah_boundaries.append(
                {
                    "start": start_index,
                    "end": end_index,
                    "surah": surah["number"],
                    "ayah": ayah["numberInSurah"],
                }
            )
            current_index = end_index + 1  # +1 for the space separator

    return concatenated_text, ayah_boundaries


def find_text_in_quran(input_text, concatenated_text):
    # concatenated_text = concatenated_text[-102:]
    # print("Concatenated Text Sample:", concatenated_text)  # Print last 500 characters

    # # After preprocessing the input text
    # print("Processed Input Text:", input_text)
    # codepoints_concatenated, codepoints_input = compare_strings_by_codepoints(
    #     concatenated_text, input_text
    # )
    # print("Concatenated Text Codepoints:", codepoints_concatenated)
    # print("Input Text Codepoints:", codepoints_input)
    # print(concatenated_text)
    start_pos = concatenated_text.find(input_text)
    if start_pos == -1:
        return None, None
    end_pos = start_pos + (len(input_text) - 1)
    return start_pos, end_pos


def compare_strings_by_codepoints(str1, str2):
    codepoints1 = [f"U+{ord(c):04x}" for c in str1]
    codepoints2 = [f"U+{ord(c):04x}" for c in str2]
    return codepoints1, codepoints2


# This will print the Unicode code points of each character in both strings


def map_positions_to_verses(start_pos, end_pos, ayah_boundaries):
    # Initialize variables to store Surah and Ayah numbers
    start_surah, start_ayah, end_surah, end_ayah = None, None, None, None

    # Iterate over the Ayah boundaries to find where the positions fall
    for boundary in ayah_boundaries:
        if start_pos >= boundary["start"] and start_pos <= boundary["end"]:
            start_surah = boundary["surah"]
            start_ayah = boundary["ayah"]
        if end_pos >= boundary["start"] and end_pos <= boundary["end"]:
            end_surah = boundary["surah"]
            end_ayah = boundary["ayah"]
        if start_surah is not None and end_surah is not None:
            break

    print("found", start_surah, start_ayah, end_surah, end_ayah)

    return start_surah, start_ayah, end_surah, end_ayah


def format_output(start_surah, start_ayah, end_surah, end_ayah):
    if start_surah is not None:
        return f"Found in Surah {start_surah}, Ayah {start_ayah} to Surah {end_surah}, Ayah {end_ayah}"
    else:
        return "Text not found in the Quran."


# Main function
def recognize(text):
    quran_data = load_quran_data("quran.json")
    reshaped_quran, ayah_boundaries = concatenate_quran_verses(quran_data)
    reshaped_input = reshape_and_normalize(text)
    print("input", reshaped_input)
    # data = {
    #     "reshaped_input": reshaped_input,
    #     "original_input": text,
    #     "reshaped_quran": reshaped_quran[347244 : 347244 + 176],
    # }
    # save_json(data, "data.json")
    start_pos, end_pos = find_text_in_quran(reshaped_input, reshaped_quran)
    if start_pos == None:
        return {"error": "Text not found in the Quran."}
    print(start_pos, end_pos)
    print("full", len(reshaped_quran))
    start_surah, start_ayah, end_surah, end_ayah = map_positions_to_verses(
        start_pos, end_pos, ayah_boundaries
    )

    if start_surah is None:
        return {"error": "Text not found in the Quran."}

    return {
        "start_surah": start_surah,
        "start_ayah": start_ayah,
        "end_surah": end_surah,
        "end_ayah": end_ayah,
        "output": format_output(start_surah, start_ayah, end_surah, end_ayah),
    }


def save_json(data, file_path):
    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    recognize("وَالضُّحَى وَاللَّيْلِ")
