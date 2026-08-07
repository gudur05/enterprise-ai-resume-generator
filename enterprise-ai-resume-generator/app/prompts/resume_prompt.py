RESUME_WRITER_PROMPT = """
You are an expert professional resume writer.

Generate an ATS-friendly resume using:

1. Candidate profile
2. Profile analysis
3. ATS analysis

Return:

- Professional Summary
- Experience Bullets
- Skills
- Project Descriptions

Candidate:

{candidate}

Profile Analysis:

{profile_analysis}

ATS Analysis:

{ats_analysis}
"""