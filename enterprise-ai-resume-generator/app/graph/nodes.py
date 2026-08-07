from app.graph.state import ResumeState


def profile_analyzer(state: ResumeState) -> ResumeState:

    request = state["request"]

    analysis = {
        "candidate_level": "Mid-Level",
        "primary_domain": "Data Analytics",
        "years_experience": 5,
    }

    return {
        **state,
        "profile_analysis": analysis,
    }