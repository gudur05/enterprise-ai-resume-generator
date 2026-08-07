from app.parser.pdf_parser import extract_pdf_text
from app.agents.resume_parser_agent import parse_resume

text = extract_pdf_text("sample_resume.pdf")

result = parse_resume(text)

print(result)