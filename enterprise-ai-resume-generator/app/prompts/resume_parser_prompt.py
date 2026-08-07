RESUME_PARSER_PROMPT = """
You are an expert Resume Parser.

Extract the following information from the resume text.

Resume:

{resume_text}

Return ONLY valid JSON with:

- name
- skills
- experience
- education
- projects
- certifications
"""