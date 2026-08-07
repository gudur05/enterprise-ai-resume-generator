from app.parser.pdf_parser import extract_text_from_pdf

text = extract_text_from_pdf("sample_resume.pdf")

print(text)