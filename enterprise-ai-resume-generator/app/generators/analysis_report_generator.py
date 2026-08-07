from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)
from xml.sax.saxutils import escape


ORANGE = colors.HexColor("#FF7A00")
DARK = colors.HexColor("#1E1E1E")
GRAY = colors.HexColor("#666666")
LIGHT_GRAY = colors.HexColor("#F4F4F4")
GREEN = colors.HexColor("#15803D")
RED = colors.HexColor("#B91C1C")
BLUE = colors.HexColor("#1D4ED8")


def safe_text(value) -> str:
    """Return ReportLab-safe text."""
    if value is None:
        return ""

    return escape(str(value))


def add_page_number(canvas, document) -> None:
    canvas.saveState()

    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(GRAY)

    page_text = f"Page {document.page}"

    canvas.drawRightString(
        A4[0] - 18 * mm,
        12 * mm,
        page_text,
    )

    canvas.drawString(
        18 * mm,
        12 * mm,
        "Enterprise AI Resume Generator",
    )

    canvas.restoreState()


def create_score_table(
    title: str,
    rows: list[tuple[str, object]],
    styles: dict,
):
    table_data = [
        [
            Paragraph(
                f"<b>{safe_text(title)}</b>",
                styles["table_header"],
            ),
            "",
        ]
    ]

    for label, value in rows:
        table_data.append(
            [
                Paragraph(
                    safe_text(label),
                    styles["table_label"],
                ),
                Paragraph(
                    safe_text(value),
                    styles["table_value"],
                ),
            ]
        )

    table = Table(
        table_data,
        colWidths=[120 * mm, 42 * mm],
        repeatRows=1,
    )

    table.setStyle(
        TableStyle(
            [
                (
                    "SPAN",
                    (0, 0),
                    (1, 0),
                ),
                (
                    "BACKGROUND",
                    (0, 0),
                    (1, 0),
                    DARK,
                ),
                (
                    "TEXTCOLOR",
                    (0, 0),
                    (1, 0),
                    colors.white,
                ),
                (
                    "BACKGROUND",
                    (0, 1),
                    (1, -1),
                    colors.white,
                ),
                (
                    "GRID",
                    (0, 0),
                    (1, -1),
                    0.5,
                    colors.HexColor("#D4D4D4"),
                ),
                (
                    "VALIGN",
                    (0, 0),
                    (1, -1),
                    "TOP",
                ),
                (
                    "LEFTPADDING",
                    (0, 0),
                    (1, -1),
                    10,
                ),
                (
                    "RIGHTPADDING",
                    (0, 0),
                    (1, -1),
                    10,
                ),
                (
                    "TOPPADDING",
                    (0, 0),
                    (1, -1),
                    8,
                ),
                (
                    "BOTTOMPADDING",
                    (0, 0),
                    (1, -1),
                    8,
                ),
            ]
        )
    )

    return table


def add_list_section(
    story: list,
    heading: str,
    items: list,
    styles: dict,
    empty_message: str = "No information available.",
) -> None:
    story.append(
        Paragraph(
            safe_text(heading),
            styles["section_heading"],
        )
    )

    story.append(Spacer(1, 6))

    if items:
        for item in items:
            story.append(
                Paragraph(
                    f"• {safe_text(item)}",
                    styles["bullet"],
                )
            )
    else:
        story.append(
            Paragraph(
                safe_text(empty_message),
                styles["muted"],
            )
        )

    story.append(Spacer(1, 14))


def generate_analysis_report_pdf(
    data: dict,
    output_path: str,
) -> None:
    request = data.get("request", {})
    profile = data.get("profile_analysis", {})
    ats = data.get("ats_analysis", {})
    review = data.get("review_analysis", {})
    job_match = data.get("job_match", {})

    base_styles = getSampleStyleSheet()

    styles = {
        "title": ParagraphStyle(
            "AnalysisTitle",
            parent=base_styles["Heading1"],
            alignment=TA_CENTER,
            textColor=DARK,
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=28,
            spaceAfter=8,
        ),
        "subtitle": ParagraphStyle(
            "AnalysisSubtitle",
            parent=base_styles["Normal"],
            alignment=TA_CENTER,
            textColor=GRAY,
            fontSize=10,
            leading=15,
            spaceAfter=18,
        ),
        "candidate_name": ParagraphStyle(
            "CandidateName",
            parent=base_styles["Heading2"],
            alignment=TA_CENTER,
            textColor=ORANGE,
            fontName="Helvetica-Bold",
            fontSize=16,
            leading=21,
        ),
        "section_heading": ParagraphStyle(
            "SectionHeading",
            parent=base_styles["Heading2"],
            textColor=ORANGE,
            fontName="Helvetica-Bold",
            fontSize=14,
            leading=18,
            spaceBefore=5,
        ),
        "bullet": ParagraphStyle(
            "ReportBullet",
            parent=base_styles["BodyText"],
            textColor=DARK,
            fontSize=10,
            leading=16,
            leftIndent=10,
            firstLineIndent=-7,
            spaceAfter=5,
        ),
        "muted": ParagraphStyle(
            "Muted",
            parent=base_styles["BodyText"],
            textColor=GRAY,
            fontSize=10,
            leading=15,
        ),
        "table_header": ParagraphStyle(
            "TableHeader",
            parent=base_styles["Normal"],
            textColor=colors.white,
            fontName="Helvetica-Bold",
            fontSize=11,
        ),
        "table_label": ParagraphStyle(
            "TableLabel",
            parent=base_styles["Normal"],
            textColor=DARK,
            fontSize=10,
            leading=14,
        ),
        "table_value": ParagraphStyle(
            "TableValue",
            parent=base_styles["Normal"],
            textColor=ORANGE,
            fontName="Helvetica-Bold",
            fontSize=11,
            alignment=TA_CENTER,
        ),
    }

    document = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        topMargin=18 * mm,
        bottomMargin=20 * mm,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        title="AI Resume Analysis Report",
        author="Enterprise AI Resume Generator",
    )

    story = []

    story.append(
        Paragraph(
            "AI Resume Analysis Report",
            styles["title"],
        )
    )

    story.append(
        Paragraph(
            (
                "Candidate-facing analysis generated from ATS optimization, "
                "resume review, and job-description matching."
            ),
            styles["subtitle"],
        )
    )

    candidate_name = request.get("name") or "Candidate"

    story.append(
        Paragraph(
            safe_text(candidate_name),
            styles["candidate_name"],
        )
    )

    story.append(Spacer(1, 16))

    candidate_rows = [
        (
            "Candidate Level",
            profile.get("candidate_level", "Not available"),
        ),
        (
            "Primary Domain",
            profile.get("primary_domain", "Not available"),
        ),
        (
            "Years of Experience",
            profile.get("years_experience", "Not available"),
        ),
        (
            "Education",
            request.get("education", "Not available"),
        ),
    ]

    story.append(
        create_score_table(
            "Candidate Overview",
            candidate_rows,
            styles,
        )
    )

    story.append(Spacer(1, 18))

    score_rows = [
        (
            "ATS Compatibility Score",
            f"{ats.get('ats_score', 0)}/100",
        ),
        (
            "Job Match Score",
            f"{job_match.get('match_score', 0)}%",
        ),
        (
            "Overall Resume Score",
            f"{review.get('overall_score', 0)}/100",
        ),
        (
            "Grammar Score",
            f"{review.get('grammar_score', 0)}/100",
        ),
        (
            "Professionalism Score",
            f"{review.get('professionalism_score', 0)}/100",
        ),
        (
            "Formatting Score",
            f"{review.get('formatting_score', 0)}/100",
        ),
    ]

    story.append(
        create_score_table(
            "Resume Intelligence Scores",
            score_rows,
            styles,
        )
    )

    story.append(Spacer(1, 18))

    add_list_section(
        story,
        "Missing ATS Keywords",
        ats.get("missing_keywords", []),
        styles,
        "No important ATS keywords were reported as missing.",
    )

    add_list_section(
        story,
        "ATS Formatting Suggestions",
        ats.get("formatting_suggestions", []),
        styles,
        "No ATS formatting suggestions were returned.",
    )

    add_list_section(
        story,
        "Matching Skills",
        job_match.get("matching_skills", []),
        styles,
        "No matching skills were identified.",
    )

    add_list_section(
        story,
        "Missing Skills",
        job_match.get("missing_skills", []),
        styles,
        "No missing job-related skills were identified.",
    )

    add_list_section(
        story,
        "Job-Match Recommendations",
        job_match.get("recommendations", []),
        styles,
        "No job-match recommendations were returned.",
    )

    story.append(PageBreak())

    add_list_section(
        story,
        "Resume Strengths",
        review.get("strengths", []),
        styles,
        "No specific strengths were returned.",
    )

    add_list_section(
        story,
        "Recommended Improvements",
        review.get("improvements", []),
        styles,
        "No additional improvements were returned.",
    )

    certifications = request.get("certifications", [])

    add_list_section(
        story,
        "Candidate Certifications",
        certifications,
        styles,
        "No certifications were extracted from the resume.",
    )

    story.append(Spacer(1, 16))

    story.append(
        KeepTogether(
            [
                Paragraph(
                    "Important Note",
                    styles["section_heading"],
                ),
                Spacer(1, 6),
                Paragraph(
                    (
                        "This report is intended for the candidate's personal "
                        "resume-improvement process. It should not normally be "
                        "shared as part of a job application. Download the "
                        "separate recruiter-ready resume PDF when applying."
                    ),
                    styles["muted"],
                ),
            ]
        )
    )

    document.build(
        story,
        onFirstPage=add_page_number,
        onLaterPages=add_page_number,
    )