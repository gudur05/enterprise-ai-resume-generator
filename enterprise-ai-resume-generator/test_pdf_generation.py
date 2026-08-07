from app.generators.pdf_generator import generate_resume_pdf
from app.orchestrator.resume_orchestrator import ResumeOrchestrator

sample = {
    "name": "Divya",
    "skills": ["Python", "FastAPI"],
    "experience": "8 Years",
    "projects": ["Enterprise AI Resume Generator"],
    "education": "B.Tech",
    "certifications": ["Google Analytics"],
    "job_description": "Looking for Python AI Engineer"
}

orchestrator = ResumeOrchestrator()

result = orchestrator.run(sample)

print(result.keys())

generate_resume_pdf(
    result,
    "generated_resume.pdf"
)

print("PDF Generated Successfully")