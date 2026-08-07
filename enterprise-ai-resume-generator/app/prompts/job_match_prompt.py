JOB_MATCH_PROMPT = """
You are an AI Recruitment Specialist.

Candidate Resume:

{candidate}

Job Description:

{job_description}

Compare both and return ONLY valid JSON.

Return:

- match_score (0-100)
- matching_skills
- missing_skills
- recommendations
"""