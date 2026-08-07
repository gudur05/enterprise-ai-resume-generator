# Enterprise AI Resume Generator

An AI-powered resume intelligence platform built with FastAPI, LangGraph, LangChain, OpenAI, React, and Material UI.

The application allows users to upload an existing resume or create one using AI. It analyzes the candidate profile against a job description, calculates ATS compatibility, identifies missing skills, rewrites resume content, reviews quality, compares original and optimized versions, and exports recruiter-ready PDF files.

---

## Project Overview

The Enterprise AI Resume Generator uses a multi-agent workflow to process candidate information.

Each AI agent has a dedicated responsibility:

1. Resume Parser
2. Profile Analyzer
3. ATS Optimizer
4. Resume Writer
5. Resume Reviewer
6. Job Matcher
7. Resume Copilot
8. PDF Generator
9. Analysis Report Generator

The LangGraph workflow coordinates the agents and maintains shared state throughout the resume-generation process.

---

## Key Features

### Resume Processing

- Upload PDF resumes
- Upload DOCX resumes
- Extract resume text
- Convert unstructured resume text into structured candidate data
- Validate uploaded files

### AI Resume Generation

- Generate a professional summary
- Rewrite experience using action-oriented bullet points
- Optimize technical skills
- Improve project descriptions
- Preserve candidate-provided facts
- Tailor content to a target job description

### ATS Analysis

- Calculate an ATS compatibility score
- Identify missing keywords
- Suggest formatting improvements
- Compare resume skills with job-description requirements
- Highlight missing job-related skills

### Resume Review

- Grammar score
- Professionalism score
- Formatting score
- Overall resume score
- Resume strengths
- Recommended improvements

### Job Match Analysis

- Job-match percentage
- Matching skills
- Missing skills
- Job-specific recommendations

### Resume Intelligence Dashboard

- ATS score indicator
- Job-match score indicator
- Resume-review score indicator
- Experience indicator
- Recommendations panel
- Original-versus-optimized resume comparison
- Resume preview
- Real-time AI workflow monitor
- Execution timeline

### Resume Copilot

The Resume Copilot supports two modes:

#### Create Resume

Users can generate a resume by entering:

- Name
- Education
- Skills
- Experience
- Projects
- Certifications
- Target job description

#### Resume Coach

After resume generation, users can ask questions such as:

- Why is my ATS score low?
- Which skills are missing?
- How can I improve my job match?
- Rewrite my professional summary
- Rewrite my experience bullets
- Suggest relevant projects

The Copilot answers using the generated resume, ATS analysis, review results, and job-match information.

### PDF Export

The application generates two separate PDF outputs.

#### Recruiter-Ready Resume

Contains:

- Candidate name
- Education
- Professional summary
- Professional experience
- Skills
- Projects
- Certifications

It does not include internal ATS scores, review metrics, missing keywords, or job-match percentages.

#### AI Resume Analysis Report

Contains:

- Candidate overview
- ATS score
- Missing keywords
- Formatting suggestions
- Resume-review scores
- Job-match score
- Matching skills
- Missing skills
- Strengths
- Recommendations

The analysis report is intended for the candidate's personal improvement process.

---

## Technology Stack

### Backend

- Python
- FastAPI
- Uvicorn
- LangChain
- LangGraph
- LangChain OpenAI
- OpenAI API
- Pydantic
- Pydantic Settings
- ReportLab
- PyPDF
- python-docx
- python-multipart

### Frontend

- React
- Vite
- Material UI
- Axios
- MUI Icons
- MUI X Charts

---

## System Architecture

```text
React Frontend
      |
      v
FastAPI Backend
      |
      v
Resume Upload / Copilot Input
      |
      v
Resume Parser
      |
      v
LangGraph Resume Workflow
      |
      +--> Profile Analyzer
      |
      +--> ATS Optimizer
      |
      +--> Resume Writer
      |
      +--> Resume Reviewer
      |
      +--> Job Matcher
      |
      v
Structured AI Result
      |
      +--> Dashboard
      |
      +--> Resume Comparison
      |
      +--> Resume Copilot
      |
      +--> Recruiter Resume PDF
      |
      +--> AI Analysis Report PDF