from langgraph.graph import StateGraph, START, END

from app.graph.state import ResumeState

from app.agents.profile_agent import profile_analyzer
from app.agents.ats_agent import ats_optimizer
from app.agents.resume_writer_agent import resume_writer
from app.agents.reviewer_agent import reviewer
from app.agents.job_match_agent import job_matcher


builder = StateGraph(ResumeState)

# Register nodes
builder.add_node("profile_analyzer", profile_analyzer)
builder.add_node("ats_optimizer", ats_optimizer)
builder.add_node("resume_writer", resume_writer)
builder.add_node("reviewer", reviewer)
builder.add_node("job_match", job_matcher)

# Build workflow
builder.add_edge(START, "profile_analyzer")
builder.add_edge("profile_analyzer", "ats_optimizer")
builder.add_edge("ats_optimizer", "resume_writer")
builder.add_edge("resume_writer", "reviewer")
builder.add_edge("reviewer", "job_match")
builder.add_edge("job_match", END)

graph = builder.compile()