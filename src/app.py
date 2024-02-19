from fastapi import FastAPI, File, UploadFile, HTTPException
import PyPDF2
import io
import re
from langdetect import detect
import string


# Possible sections in a scientific paper
section_patterns = {
    "abstract": r"\bAbstract\b",
    "keywords": r"\b(Keywords|Palavras-chave)\b",
    "introduction": r"\b(Introduction|Introdução|Theoretical background)\b",
    "methodology": r"\b(Development|Methodology|Methods|Desenvolvimento|Discussion|Results|Resultados)\b",
    "conclusion": r"\b(Conclusion|Conclusions|Acknowledgments)\b",
    "references": r"\b(References|Referências)\b"
}



# Function that will put paragraphs in categories
def categorize_paragraphs(text: str):
    return "categorize_paragraphs"
    


# Function that will put phrases in categories
def categorize_phrases(text: str):
    phrases = text.split(".")
    punctuation_marks = string.punctuation

    categories = {
        "less_than_3_words": 0,
        "between_3_and_5_words": 0,
        "between_5_and_10_words": 0,
        "more_than_10_words": 0,
        "less_than_25_words": 0,
        "between_25_and_74_words": 0,
        "between_75_and_160_words": 0,
        "more_than_160_words": 0,
        "punctuation_marks": 0
    }

    for phrase in phrases:
        word_count = len(phrase.split())

        if word_count < 3:
            categories["less_than_3_words"] += 1
        elif 3 <= word_count < 5:
            categories["between_3_and_5_words"] += 1
        elif 5 <= word_count < 10:
            categories["between_5_and_10_words"] += 1
        else:
            categories["more_than_10_words"] += 1

        if word_count < 25:
            categories["less_than_25_words"] += 1
        elif 25 <= word_count < 75:
            categories["between_25_and_74_words"] += 1
        elif 75 <= word_count < 160:
            categories["between_75_and_160_words"] += 1
        else:
            categories["more_than_160_words"] += 1

        for char in phrase:
            if char in punctuation_marks:
                categories["punctuation_marks"] += 1

    return categories


# Function to get the reading time of the pdf
def get_reading_time(text: str):
    # Total words / 200 = number of minutes
    print("Number of words", len(text.split(" ")))
    return round(len(text.split(" ")) / 200)

# Function to get the percentage of a section
def get_section_percentage(section_text: str, complete_text: str):    
    return round((len(section_text) / len(complete_text) * 100));


# Function to extract the sections of the pdf
def extract_sections(text: str, patterns):
    sections = {}
    for section, pattern in patterns.items():
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            sections[section] = match.start()
            print("Thats a match", match.end())

    # sort a dictionary by value
    # dictionaries are this way: {key: value}
    sorted_sections = {k: v for k, v in sorted(sections.items(), key=lambda item: item[1])}

    # Because of text is a string, we can divide it like an array. 
    # So basically what we're doing here is getting the position from the start of the section to the start of the next section
    # and then we're getting the text from the start of the section to the start of the next section

    # e.g. sections = { "abstract": 0, "introduction": 10, "development": 20, "results": 30, "conclusion": 40 }
    print(sorted_sections)
    

    extracted_text = {}
    prev_section = None
    for section, end_index in sorted_sections.items():
        if prev_section is not None:
            extracted_text[prev_section] = text[sections[prev_section]:end_index].strip()
            print("tst", sections[prev_section])
        print("Section", section)
        print("start index", end_index)
        prev_section = section
        
    if prev_section is not None:
        extracted_text[prev_section] = text[sections[prev_section]:].strip()
    
    return extracted_text


# Now I need to create a function that will say what is the language used in the pdf.
def detect_language(text):
    try:
        return detect(text)
    except:
        return "Lang detection Failed"


# Function to read the pdf at the first time.
async def read_pdf(file):
    content = await file.read()
    
    reader = PyPDF2.PdfFileReader(io.BytesIO(content))
    text = ""

    for page in range(reader.numPages):
        text += reader.getPage(page).extractText().replace("\n", "")

    return {
        "complete_text": text,
        "language": detect_language(text)
    }

app = FastAPI()

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    # if the file format is not a pdf
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="File must be a pdf")

    # here we extract the text from the pdf
    text_data = await read_pdf(file)
    
    # here we extract the sections from the pdf
    sections = extract_sections(text_data["complete_text"], section_patterns)
    
    # Example where we can get the percentage of an section
    # abstract_percentage = get_section_percentage(sections["abstract"], text_data["complete_text"])

    percentage = {}
    for section, text in sections.items():
        percentage[section] = get_section_percentage(text, text_data["complete_text"])


    reading_time = get_reading_time(text_data["complete_text"])


    categorized_phrases = categorize_phrases(text_data["complete_text"])

    # Here we are returning all the data we got from the pdf
    return {
        "filename": file.filename,
        "content": text_data["complete_text"],
        "language": text_data["language"],
        "sections": sections,
        "percentage": percentage,
        "reading_time": reading_time,
        "categorized_phrases": categorized_phrases
    }


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/list")
def getList():
    return {"list": "list"}