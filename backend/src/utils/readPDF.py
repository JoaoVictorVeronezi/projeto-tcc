import PyPDF2
import io


async def readPDF(file):
    content = await file.read()
    # If the ffile format is not a pdf, we need to throw an error
    if file.content_type != "application/pdf":
        return {"error": "File must be a pdf"}
    
    reader = PyPDF2.PdfFileReader(io.BytesIO(content))
    text = ""

    for page in range(reader.numPages):
        text += reader.getPage(page).extractText()
    
    return text
