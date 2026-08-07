# 🚀 Enterprise AI Resume Generator

An Agentic AI-powered resume optimization platform that analyzes resumes, evaluates ATS compatibility, compares candidate skills with job descriptions, generates optimized resume content, and provides AI-driven recommendations.

The application uses a multi-agent workflow powered by LangGraph, FastAPI, React, RAG, and Large Language Models.

---

## ✨ Key Features

- 📄 PDF and DOCX resume upload
- 🧠 AI-powered resume parsing
- 👤 Candidate profile analysis
- 🎯 ATS compatibility scoring
- 🔍 Missing keyword identification
- 💼 Job description matching
- ✍️ AI resume content generation
- 📊 Resume quality review
- 🔄 Original vs optimized resume comparison
- 💡 Personalized AI recommendations
- 🤖 Interactive Resume Copilot
- 📥 Optimized resume PDF download
- 📑 AI analysis report generation
- ⚡ Multi-agent workflow orchestration
- 📚 RAG-based ATS knowledge retrieval

---

## 🖥️ Application Screenshots

### Landing Page

![Enterprise AI Resume Generator Landing Page](screenshots/01-landing-page.png)

---

### Resume Upload & Job Description

Upload a PDF/DOCX resume and provide the target job description to start the AI-powered optimization workflow.

![Resume Upload](screenshots/02-upload-resume.png)

---

### AI Resume Dashboard

The dashboard provides a quick overview of ATS compatibility, job match, resume quality, and candidate experience.

![AI Resume Dashboard](screenshots/03-dashboard.png)

---

### AI Recommendations

AI-generated recommendations highlight missing skills, ATS improvements, and actions that can improve the candidate's resume.

![AI Recommendations](screenshots/04-ai-recommendations.png)

---

### Resume Comparison

Compare the original resume with the AI-optimized version before downloading the final resume.

![Resume Comparison](screenshots/05-resume-comparison.png)

---

### AI Resume Copilot

The Resume Copilot allows users to interact with AI and request additional resume improvements.

![Resume Copilot](screenshots/06-resume-copilot.png)

---

### Multi-Agent Workflow

The application uses specialized AI agents coordinated through LangGraph for resume parsing, profile analysis, ATS optimization, resume generation, review, and job matching.

![AI Multi-Agent Workflow](screenshots/07-agent-workflow.png)

---

## 🧠 Multi-Agent Architecture

The application uses specialized AI agents coordinated through LangGraph.

```text
Resume Upload
      │
      ▼
Resume Parser
      │
      ▼
Profile Analyzer
      │
      ▼
ATS Optimizer
      │
      ▼
Resume Writer
      │
      ▼
Resume Reviewer
      │
      ▼
Job Matcher
      │
      ▼
Optimized Resume

## 🏗️ System Architecture

```mermaid
flowchart LR
    U[User] --> FE[React + Vite Frontend]

    FE -->|Resume + Job Description| API[FastAPI Backend]

    API --> LG[LangGraph Orchestrator]

    LG --> RP[Resume Parser]
    LG --> PA[Profile Analyzer]
    LG --> ATS[ATS Optimizer]
    LG --> RW[Resume Writer]
    LG --> RR[Resume Reviewer]
    LG --> JM[Job Matcher]

    ATS --> RAG[RAG Pipeline]
    RAG --> KB[ATS Knowledge Base]
    RAG --> VS[Vector Store]

    PA --> LLM[OpenAI LLM]
    ATS --> LLM
    RW --> LLM
    RR --> LLM
    JM --> LLM

    LG --> RESULT[Optimized Resume Results]

    RESULT --> DASH[AI Dashboard]
    RESULT --> PDF[Resume PDF]
    RESULT --> REPORT[Analysis Report]
    RESULT --> COPILOT[Resume Copilot]
```

### Architecture Overview

The platform follows a full-stack Agentic AI architecture:

**React Frontend → FastAPI API → LangGraph Orchestration → Specialized AI Agents → RAG + LLM → Resume Analysis & Generation**

Each AI agent is responsible for a specific stage of resume processing, while LangGraph coordinates the overall workflow.