import os

import requests
import streamlit as st
from dotenv import load_dotenv


# =========================================================
# ENVIRONMENT
# =========================================================

load_dotenv()

API_URL = os.getenv(
    "API_URL",
    "https://enterprise-ai-resume-generator.onrender.com"
)

API_KEY = os.getenv(
    "API_KEY",
    ""
)


# =========================================================
# PAGE CONFIG
# =========================================================

st.set_page_config(
    page_title="Enterprise AI Resume Generator",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="auto"
)


# =========================================================
# BLUE + BLACK ENTERPRISE THEME
# =========================================================

st.markdown(
    """
<style>

/* =====================================================
   STREAMLIT HEADER
===================================================== */

header[data-testid="stHeader"] {
    background: transparent !important;
}

div[data-testid="stToolbar"] {
    display: none !important;
}

div[data-testid="stDecoration"] {
    display: none !important;
}

div[data-testid="stStatusWidget"] {
    display: none !important;
}


/* =====================================================
   GLOBAL
===================================================== */

html,
body {
    background: #030712 !important;
}


/* =====================================================
   PAGE FIT / REMOVE HORIZONTAL SCROLL
===================================================== */

html,
body {
    overflow-x: hidden !important;
    max-width: 100% !important;
}

.stApp {
    overflow-x: hidden !important;
    max-width: 100% !important;
}

[data-testid="stAppViewContainer"] {
    overflow-x: hidden !important;
}

[data-testid="stMain"] {
    overflow-x: hidden !important;
}

[data-testid="stMainBlockContainer"] {
    width: 100% !important;
    max-width: 1400px !important;
    box-sizing: border-box !important;
}

.block-container {
    width: 100% !important;
    max-width: 1400px !important;
    box-sizing: border-box !important;
    overflow-x: hidden !important;
}

.hero {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
}

[data-testid="stHorizontalBlock"] {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
}

[data-testid="column"] {
    min-width: 0 !important;
    box-sizing: border-box !important;
}

section[data-testid="stSidebar"] {
    box-sizing: border-box !important;
}

.stButton,
.stDownloadButton,
div[data-testid="stTextArea"],
div[data-testid="stFileUploader"] {
    max-width: 100% !important;
    box-sizing: border-box !important;
}

.stApp {
    background:
        linear-gradient(
            135deg,
            #030712 0%,
            #06111f 50%,
            #07182c 100%
        ) !important;

    color: #F8FAFC;
}

html,
body,
[class*="css"] {
    font-family:
        Inter,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;

    font-size: 17px;
}


/* =====================================================
   MAIN CONTENT
===================================================== */

.block-container {
    max-width: 1400px;

    padding-top:
        1.5rem !important;

    padding-bottom:
        4rem;

    padding-left:
        2rem;

    padding-right:
        2rem;
}


/* =====================================================
   GENERAL TEXT
===================================================== */

p {
    color:
        #E6EEF8 !important;

    font-size:
        18px !important;

    line-height:
        1.75 !important;
}

label {
    color:
        #F1F5F9 !important;

    font-size:
        17px !important;

    font-weight:
        650 !important;
}


/* =====================================================
   HEADINGS
===================================================== */

h1 {
    color:
        #FFFFFF !important;

    font-size:
        38px !important;

    font-weight:
        800 !important;
}

h2 {
    color:
        #FFFFFF !important;

    font-size:
        30px !important;

    font-weight:
        750 !important;
}

h3 {
    color:
        #F8FAFC !important;

    font-size:
        24px !important;

    font-weight:
        700 !important;
}

h4 {
    color:
        #F8FAFC !important;

    font-size:
        20px !important;
}


/* =====================================================
   SIDEBAR
===================================================== */

section[data-testid="stSidebar"] {
    background:
        linear-gradient(
            180deg,
            #020711,
            #06101E
        ) !important;

    border-right:
        1px solid
        rgba(
            32,
            148,
            255,
            0.25
        );
}

section[data-testid="stSidebar"] h2 {
    font-size:
        21px !important;

    font-weight:
        800 !important;

    color:
        #FFFFFF !important;
}

section[data-testid="stSidebar"] p {
    font-size:
        16px !important;

    color:
        #D8E3F0 !important;
}

section[data-testid="stSidebar"]
div[role="radiogroup"] label {

    font-size:
        17px !important;

    font-weight:
        650 !important;

    color:
        #F8FAFC !important;

    padding-top:
        7px;

    padding-bottom:
        7px;
}

section[data-testid="stSidebar"]
[data-testid="stCaptionContainer"] {

    color:
        #9FB1C5 !important;

    font-size:
        15px !important;
}


/* =====================================================
   HERO
===================================================== */

.hero {
    padding:
        2.8rem 3rem;

    border-radius:
        24px;

    background:
        linear-gradient(
            135deg,
            #08172B,
            #092746
        );

    border:
        1px solid
        rgba(
            32,
            148,
            255,
            0.45
        );

    box-shadow:
        0 22px 60px
        rgba(
            0,
            0,
            0,
            0.40
        );

    margin-bottom:
        2.3rem;
}

.hero-badge {
    display:
        inline-block;

    padding:
        0.5rem 1rem;

    border-radius:
        999px;

    background:
        rgba(
            30,
            144,
            255,
            0.15
        );

    border:
        1px solid
        rgba(
            40,
            160,
            255,
            0.55
        );

    color:
        #69C0FF;

    font-size:
        13px;

    font-weight:
        800;

    letter-spacing:
        0.7px;

    margin-bottom:
        1.3rem;
}

.hero-title {
    color:
        #FFFFFF;

    font-size:
        44px;

    font-weight:
        850;

    line-height:
        1.18;

    max-width:
        900px;
}

.hero-highlight {
    color:
        #2997FF;
}

.hero-text {
    color:
        #C4D3E5;

    font-size:
        18px;

    line-height:
        1.8;

    max-width:
        920px;

    margin-top:
        1.4rem;
}


/* =====================================================
   FILE UPLOADER
===================================================== */

section[data-testid="stFileUploaderDropzone"] {

    background:
        linear-gradient(
            145deg,
            #09192B,
            #0A2037
        ) !important;

    border:
        2px dashed
        #278EFF !important;

    border-radius:
        16px;

    min-height:
        110px;
}

section[data-testid="stFileUploaderDropzone"] span,
section[data-testid="stFileUploaderDropzone"] small,
section[data-testid="stFileUploaderDropzone"] p {

    color:
        #E1EBF7 !important;

    font-size:
        16px !important;
}

section[data-testid="stFileUploaderDropzone"] button {

    color:
        #FFFFFF !important;

    background:
        #1268C4 !important;

    border:
        1px solid
        #319CFF !important;

    font-size:
        16px !important;

    font-weight:
        700 !important;
}


/* =====================================================
   INPUTS
===================================================== */

div[data-baseweb="input"] > div {

    background:
        #091827 !important;

    border:
        1px solid
        #2E5E8D !important;

    border-radius:
        12px !important;
}

input {

    color:
        #FFFFFF !important;

    -webkit-text-fill-color:
        #FFFFFF !important;

    font-size:
        17px !important;
}

input::placeholder {

    color:
        #92A7BD !important;

    -webkit-text-fill-color:
        #92A7BD !important;

    opacity:
        1 !important;
}


/* =====================================================
   JOB DESCRIPTION / TEXTAREA
===================================================== */

div[data-testid="stTextArea"] textarea {

    background:
        #091827 !important;

    color:
        #FFFFFF !important;

    -webkit-text-fill-color:
        #FFFFFF !important;

    caret-color:
        #4DA6FF !important;

    font-size:
        18px !important;

    font-weight:
        500 !important;

    line-height:
        1.75 !important;
}

div[data-testid="stTextArea"] textarea::placeholder {

    color:
        #92A7BD !important;

    -webkit-text-fill-color:
        #92A7BD !important;

    opacity:
        1 !important;
}

div[data-testid="stTextArea"]
div[data-baseweb="textarea"] {

    background:
        #091827 !important;
}

div[data-testid="stTextArea"]
div[data-baseweb="textarea"] > div {

    background:
        #091827 !important;

    border:
        1px solid
        #3477B7 !important;

    border-radius:
        12px !important;
}

div[data-testid="stTextArea"]
div[data-baseweb="textarea"] > div:focus-within {

    border:
        1px solid
        #2997FF !important;

    box-shadow:
        0 0 0 1px
        rgba(
            41,
            151,
            255,
            0.35
        ) !important;
}


/* =====================================================
   BUTTONS
===================================================== */

.stButton > button {

    width:
        100%;

    min-height:
        56px;

    border:
        none !important;

    border-radius:
        12px;

    color:
        #FFFFFF !important;

    font-size:
        17px !important;

    font-weight:
        750 !important;

    background:
        linear-gradient(
            90deg,
            #0867F2,
            #09A9EF
        ) !important;

    box-shadow:
        0 12px 32px
        rgba(
            0,
            119,
            255,
            0.28
        );
}

.stButton > button:hover {

    color:
        #FFFFFF !important;

    transform:
        translateY(-1px);

    background:
        linear-gradient(
            90deg,
            #147AFF,
            #22B7F6
        ) !important;
}


/* =====================================================
   DOWNLOAD BUTTON
===================================================== */

.stDownloadButton > button {

    width:
        100%;

    min-height:
        56px;

    border-radius:
        12px;

    color:
        #FFFFFF !important;

    font-size:
        17px !important;

    font-weight:
        700 !important;

    border:
        1px solid
        #2997FF !important;

    background:
        linear-gradient(
            90deg,
            #064FBD,
            #008FD4
        ) !important;
}


/* =====================================================
   METRICS
===================================================== */

div[data-testid="stMetric"] {

    background:
        linear-gradient(
            145deg,
            #091626,
            #0A213A
        );

    border:
        1px solid
        rgba(
            51,
            153,
            255,
            0.30
        );

    border-radius:
        18px;

    padding:
        1.4rem;

    box-shadow:
        0 12px 30px
        rgba(
            0,
            0,
            0,
            0.30
        );
}

div[data-testid="stMetricLabel"] {

    color:
        #D1DCE9 !important;

    font-size:
        17px !important;

    font-weight:
        650 !important;
}

div[data-testid="stMetricValue"] {

    color:
        #3BA5FF !important;

    font-size:
        36px !important;

    font-weight:
        800 !important;
}


/* =====================================================
   RESULT CARDS
===================================================== */

div[data-testid="stVerticalBlockBorderWrapper"] {

    background:
        rgba(
            9,
            21,
            38,
            0.78
        );

    border-radius:
        18px;

    border-color:
        rgba(
            51,
            153,
            255,
            0.22
        ) !important;
}


/* =====================================================
   EXPANDER
===================================================== */

div[data-testid="stExpander"] {

    background:
        #091524;

    border:
        1px solid
        rgba(
            51,
            153,
            255,
            0.22
        );

    border-radius:
        14px;
}


/* =====================================================
   CHAT
===================================================== */

div[data-testid="stChatMessage"] {

    background:
        rgba(
            9,
            22,
            39,
            0.94
        );

    border:
        1px solid
        rgba(
            51,
            153,
            255,
            0.20
        );

    border-radius:
        16px;

    padding:
        1rem;

    margin-bottom:
        0.8rem;
}

div[data-testid="stChatMessage"] p {

    color:
        #F1F5F9 !important;

    font-size:
        17px !important;

    line-height:
        1.75 !important;
}


/* =====================================================
   STATUS
===================================================== */

.status-good {

    color:
        #42E695;

    font-size:
        16px;

    font-weight:
        700;
}

.status-empty {

    color:
        #B1C1D4;

    font-size:
        16px;

    font-weight:
        600;
}

.muted {

    color:
        #9FB1C5;
}






/* =====================================================
   SCORE GAUGES
===================================================== */

.score-card {
    background:
        linear-gradient(
            145deg,
            #091626,
            #0A213A
        );

    border:
        1px solid
        rgba(
            51,
            153,
            255,
            0.32
        );

    border-radius:
        18px;

    padding:
        1.4rem;

    min-height:
        220px;

    display:
        flex;

    flex-direction:
        column;

    align-items:
        center;

    justify-content:
        center;

    text-align:
        center;

    box-shadow:
        0 12px 30px
        rgba(
            0,
            0,
            0,
            0.30
        );
}

.score-ring {
    width:
        126px;

    height:
        126px;

    border-radius:
        50%;

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    margin-bottom:
        1rem;

    position:
        relative;
}

.score-ring::before {
    content:
        "";

    position:
        absolute;

    width:
        94px;

    height:
        94px;

    border-radius:
        50%;

    background:
        #081525;

    box-shadow:
        inset 0 0 18px
        rgba(
            0,
            0,
            0,
            0.35
        );
}

.score-number {
    position:
        relative;

    z-index:
        2;

    color:
        #FFFFFF;

    font-size:
        30px;

    font-weight:
        800;
}

.score-label {
    color:
        #E7F0FA;

    font-size:
        17px;

    font-weight:
        700;

    margin-top:
        0.15rem;
}

.score-subtext {
    color:
        #8FB5D9;

    font-size:
        13px;

    margin-top:
        0.35rem;
}

.experience-card {
    background:
        linear-gradient(
            145deg,
            #091626,
            #0A213A
        );

    border:
        1px solid
        rgba(
            51,
            153,
            255,
            0.32
        );

    border-radius:
        18px;

    padding:
        1.4rem;

    min-height:
        220px;

    display:
        flex;

    flex-direction:
        column;

    align-items:
        center;

    justify-content:
        center;

    text-align:
        center;

    box-shadow:
        0 12px 30px
        rgba(
            0,
            0,
            0,
            0.30
        );
}

.experience-icon {
    font-size:
        42px;

    margin-bottom:
        0.8rem;
}

.experience-number {
    color:
        #3BA5FF;

    font-size:
        34px;

    font-weight:
        800;
}

.experience-label {
    color:
        #E7F0FA;

    font-size:
        17px;

    font-weight:
        700;

    margin-top:
        0.3rem;
}


/* =====================================================
   AI WORKFLOW
===================================================== */

.workflow-card {
    background: linear-gradient(145deg,#091626,#0A213A);
    border: 1px solid rgba(51,153,255,0.35);
    border-radius: 16px;
    padding: 1rem;
    min-height: 125px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-shadow: 0 10px 25px rgba(0,0,0,0.25);
}

.workflow-icon {
    color: #42E695;
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 8px;
}

.workflow-title {
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.4;
}

.workflow-status {
    color: #8FB5D9;
    font-size: 13px;
    margin-top: 7px;
}





/* =====================================================
   DESKTOP INITIAL PAGE - COMPACT ONE-SCREEN LAYOUT
===================================================== */

@media (min-width: 769px) {

    .block-container {
        padding-top: 0.65rem !important;
        padding-bottom: 1.25rem !important;
    }

    .hero {
        padding: 1.65rem 2.35rem !important;
        border-radius: 20px !important;
        margin-bottom: 1.05rem !important;
    }

    .hero-badge {
        padding: 0.35rem 0.8rem !important;
        font-size: 11px !important;
        margin-bottom: 0.75rem !important;
    }

    .hero-title {
        font-size: 34px !important;
        line-height: 1.12 !important;
    }

    .hero-text {
        font-size: 15px !important;
        line-height: 1.55 !important;
        margin-top: 0.8rem !important;
    }

    [data-testid="stMainBlockContainer"] > div > [data-testid="stVerticalBlock"] {
        gap: 0.75rem !important;
    }

    h3 {
        font-size: 20px !important;
        margin-top: 0.15rem !important;
        margin-bottom: 0.35rem !important;
    }

    label {
        font-size: 15px !important;
    }

    section[data-testid="stFileUploaderDropzone"] {
        min-height: 88px !important;
        padding-top: 0.45rem !important;
        padding-bottom: 0.45rem !important;
    }

    section[data-testid="stFileUploaderDropzone"] span,
    section[data-testid="stFileUploaderDropzone"] small,
    section[data-testid="stFileUploaderDropzone"] p {
        font-size: 14px !important;
        line-height: 1.35 !important;
    }

    section[data-testid="stFileUploaderDropzone"] button {
        font-size: 14px !important;
    }

    div[data-testid="stTextArea"] textarea {
        font-size: 15px !important;
        line-height: 1.5 !important;
    }

    .stButton > button {
        min-height: 46px !important;
        font-size: 15px !important;
    }
}

@media (min-width: 769px) and (max-height: 850px) {

    .block-container {
        padding-top: 0.35rem !important;
        padding-bottom: 0.75rem !important;
    }

    .hero {
        padding: 1.25rem 2rem !important;
        margin-bottom: 0.65rem !important;
    }

    .hero-badge {
        margin-bottom: 0.5rem !important;
    }

    .hero-title {
        font-size: 30px !important;
    }

    .hero-text {
        font-size: 14px !important;
        line-height: 1.45 !important;
        margin-top: 0.55rem !important;
    }

    [data-testid="stMainBlockContainer"] > div > [data-testid="stVerticalBlock"] {
        gap: 0.45rem !important;
    }

    section[data-testid="stFileUploaderDropzone"] {
        min-height: 76px !important;
    }

    .stButton > button {
        min-height: 42px !important;
    }
}


/* =====================================================
   TABLET / SMALL DESKTOP FIT
===================================================== */

@media (max-width: 1200px) {

    .block-container {
        padding-left: 1.25rem !important;
        padding-right: 1.25rem !important;
    }

    .hero {
        padding: 2.2rem 2.2rem;
    }

    .hero-title {
        font-size: 34px;
    }
}



/* =====================================================
   MOBILE NAVIGATION
   Uses app-owned links instead of Streamlit's internal
   sidebar-toggle DOM, which can change between releases.
===================================================== */

.mobile-nav {
    display: none;
}

@media (max-width: 768px) {

    /* We do not depend on Streamlit's sidebar opener on mobile. */
    [data-testid="stSidebarCollapsedControl"],
    div[data-testid="collapsedControl"] {
        display: none !important;
    }

    .mobile-nav {
        display: grid !important;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 0.45rem;
        width: 100%;
        margin: 0 0 0.9rem 0;
        padding: 0.45rem;
        box-sizing: border-box;
        border-radius: 14px;
        background: rgba(7, 17, 31, 0.96);
        border: 1px solid rgba(51, 153, 255, 0.25);
        position: sticky;
        top: 0.35rem;
        z-index: 9999;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
    }

    .mobile-nav a {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 0;
        min-height: 42px;
        padding: 0.45rem 0.3rem;
        border-radius: 10px;
        text-decoration: none !important;
        color: #DCE9F7 !important;
        background: #0A1B2F;
        border: 1px solid rgba(51, 153, 255, 0.15);
        font-size: 12px;
        font-weight: 700;
        line-height: 1.2;
        text-align: center;
    }

    .mobile-nav a.active {
        color: #FFFFFF !important;
        background: linear-gradient(90deg,#0867F2,#09A9EF);
        border-color: rgba(80, 181, 255, 0.65);
        box-shadow: 0 7px 18px rgba(0, 119, 255, 0.22);
    }

    .mobile-nav a:active {
        transform: scale(0.98);
    }

    /* Keep the desktop/sidebar panel out of the way on phones. */
    section[data-testid="stSidebar"] {
        z-index: 9998 !important;
    }
}

/* =====================================================
   FOOTER
===================================================== */

.app-footer {
    margin-top: 1.5rem;
    padding: 0.8rem 0 0.5rem 0;
    text-align: center;
    color: #8FA6BF;
    font-size: 12px;
    border-top: 1px solid rgba(51, 153, 255, 0.12);
}

.app-footer strong {
    color: #BFD7EE;
    font-weight: 600;
}

@media (max-width: 768px) {
    .app-footer {
        margin-top: 1.5rem;
        font-size: 12px;
        padding-bottom: 0.8rem;
    }
}



/* =====================================================
   MOBILE
===================================================== */

@media (
    max-width: 768px
) {

    .block-container {

        padding-left:
            1rem !important;

        padding-right:
            1rem !important;

        padding-top:
            1rem !important;
    }

    .hero {

        padding:
            1.6rem;

        border-radius:
            18px;
    }

    .hero-title {

        font-size:
            31px;

        line-height:
            1.2;
    }

    .hero-text {

        font-size:
            16px;

        line-height:
            1.7;
    }

    .hero-badge {

        font-size:
            11px;
    }

    h2 {

        font-size:
            25px !important;
    }

    h3 {

        font-size:
            21px !important;
    }

    p {

        font-size:
            16px !important;
    }

    label {

        font-size:
            16px !important;
    }

    div[data-testid="stTextArea"] textarea {

        font-size:
            16px !important;
    }

    .stButton > button,
    .stDownloadButton > button {

        font-size:
            16px !important;

        min-height:
            52px;
    }
}

</style>
""",
    unsafe_allow_html=True
)


# =========================================================
# SESSION STATE
# =========================================================

if "resume_result" not in st.session_state:

    st.session_state.resume_result = None


if "copilot_messages" not in st.session_state:

    st.session_state.copilot_messages = []


if "resume_pdf" not in st.session_state:

    st.session_state.resume_pdf = None


if "resume_pdf_name" not in st.session_state:

    st.session_state.resume_pdf_name = (
        "AI_Generated_Resume.pdf"
    )


# =========================================================
# HELPERS
# =========================================================

def get_headers():

    headers = {}

    if API_KEY:

        headers[
            "X-API-Key"
        ] = API_KEY

    return headers


def display_list(items):

    if not items:

        st.write(
            "No information available."
        )

        return

    for item in items:

        st.markdown(
            f"- {item}"
        )


def get_error_message(response):

    try:

        response_data = (
            response.json()
        )

        return (
            response_data.get(
                "detail",
                response.text
            )
        )

    except Exception:

        return response.text


def normalize_score(value):

    try:

        score = float(value)

    except (
        TypeError,
        ValueError
    ):

        return 0

    score = max(
        0,
        min(
            100,
            score
        )
    )

    return int(
        round(
            score
        )
    )


def score_ring_background(score):

    return (
        "conic-gradient("
        f"#2997FF 0% {score}%, "
        f"#132A43 {score}% 100%"
        ")"
    )


# =========================================================
# RESPONSIVE NAVIGATION STATE
# =========================================================

PAGE_KEYS = {
    "resume": "🏠 Resume Generator",
    "copilot": "🤖 Resume Copilot",
    "system": "⚙️ System"
}

PAGE_TO_KEY = {
    value: key
    for key, value in PAGE_KEYS.items()
}

requested_page = (
    st.query_params.get(
        "page",
        "resume"
    )
)

if requested_page not in PAGE_KEYS:

    requested_page = "resume"

default_page = PAGE_KEYS[
    requested_page
]


# =========================================================
# SIDEBAR
# =========================================================

with st.sidebar:

    st.markdown(
        "## 🤖 Enterprise AI"
    )

    st.markdown(
        """
<span class="muted">
Resume Intelligence Platform
</span>
""",
        unsafe_allow_html=True
    )

    st.markdown(
        "---"
    )


    sidebar_pages = [
        "🏠 Resume Generator",
        "🤖 Resume Copilot",
        "⚙️ System"
    ]

    page = st.radio(
        "Navigation",
        sidebar_pages,
        index=sidebar_pages.index(
            default_page
        ),
        label_visibility=
            "collapsed"
    )


    st.markdown(
        "---"
    )


    if (
        st.session_state
        .resume_result
    ):

        st.markdown(
            """
<span class="status-good">
● Resume Loaded
</span>
""",
            unsafe_allow_html=True
        )

    else:

        st.markdown(
            """
<span class="status-empty">
○ No Resume Generated
</span>
""",
            unsafe_allow_html=True
        )


    st.markdown(
        "---"
    )


    st.caption(
        "FastAPI + LangGraph + OpenAI"
    )


# =========================================================
# MOBILE NAVIGATION
# =========================================================

active_key = PAGE_TO_KEY.get(
    page,
    "resume"
)

mobile_nav_html = f"""
<div class="mobile-nav">
<a class="{'active' if active_key == 'resume' else ''}" href="?page=resume">🏠<br>Resume</a>
<a class="{'active' if active_key == 'copilot' else ''}" href="?page=copilot">🤖<br>Copilot</a>
<a class="{'active' if active_key == 'system' else ''}" href="?page=system">⚙️<br>System</a>
</div>
"""

st.markdown(
    mobile_nav_html,
    unsafe_allow_html=True
)


# =========================================================
# RESUME GENERATOR PAGE
# =========================================================

if page == "🏠 Resume Generator":

    st.markdown(
        """
<div class="hero">

<div class="hero-badge">
ENTERPRISE AI POWERED
</div>

<div class="hero-title">
Build ATS Optimized<br>
<span class="hero-highlight">
Professional Resumes
</span><br>
with AI
</div>

<div class="hero-text">
Upload your resume and target job description.
Specialized AI agents analyze your profile,
optimize ATS compatibility, review resume quality
and calculate job-match alignment.
</div>

</div>
""",
        unsafe_allow_html=True
    )


    left, right = st.columns(
        [1, 1],
        gap="large"
    )


    with left:

        st.markdown(
            "### 📄 Resume Input"
        )


        uploaded_file = (
            st.file_uploader(
                "Upload Resume",
                type=[
                    "pdf",
                    "docx"
                ],
                help=(
                    "Supported formats: "
                    "PDF and DOCX"
                )
            )
        )


        if uploaded_file:

            st.success(
                f"✓ {uploaded_file.name}"
            )


    with right:

        st.markdown(
            "### 🎯 Target Job"
        )


        job_description = (
            st.text_area(
                "Job Description",
                height=190,
                placeholder=(
                    "Paste the complete "
                    "job description here..."
                )
            )
        )


    st.markdown("")


    generate_clicked = st.button(
        "🚀 Generate AI Resume",
        type="primary",
        use_container_width=True
    )


    if generate_clicked:

        if not uploaded_file:

            st.warning(
                "Please upload your resume."
            )


        elif not job_description.strip():

            st.warning(
                "Please paste the job description."
            )


        else:

            with st.spinner(
                "AI agents are analyzing your resume..."
            ):

                files = {

                    "file": (

                        uploaded_file.name,

                        uploaded_file
                        .getvalue(),

                        uploaded_file.type
                    )
                }


                data = {

                    "job_description":
                        job_description
                        .strip()
                }


                try:

                    response = (
                        requests.post(

                            f"{API_URL}/generate-ai-resume",

                            files=files,

                            data=data,

                            headers=
                                get_headers(),

                            timeout=180
                        )
                    )


                    if response.ok:

                        st.session_state.resume_result = (
                            response.json()
                        )


                        st.session_state.resume_pdf = None


                        st.session_state.copilot_messages = []


                        st.success(
                            "Resume generated successfully!"
                        )


                    else:

                        error_message = (
                            get_error_message(
                                response
                            )
                        )


                        st.error(
                            "Generation failed: "
                            f"{error_message}"
                        )


                except (
                    requests.exceptions
                    .RequestException
                ) as exc:

                    st.error(
                        "Unable to connect "
                        f"to backend: {exc}"
                    )


    result = (
        st.session_state
        .resume_result
    )


    if result:

        st.markdown(
            "---"
        )


        st.markdown(
            "## 📊 AI Resume Intelligence"
        )


        # =================================================
        # AI AGENT WORKFLOW
        # =================================================

        st.markdown(
            "### 🧠 AI Agent Workflow"
        )

        st.write(
            "The resume has passed through the complete "
            "multi-agent pipeline."
        )

        workflow_steps = [
            "Resume Parser",
            "Profile Analyzer",
            "ATS Optimizer",
            "Resume Writer",
            "Reviewer",
            "Job Matcher"
        ]

        workflow_columns = st.columns(
            len(workflow_steps)
        )

        for index, step in enumerate(
            workflow_steps
        ):

            with workflow_columns[index]:

                st.markdown(
                    f"""
<div class="workflow-card">
<div class="workflow-icon">✓</div>
<div class="workflow-title">{step}</div>
<div class="workflow-status">Completed</div>
</div>
""",
                    unsafe_allow_html=True
                )

        st.markdown("")


        ats = result.get(
            "ats_analysis",
            {}
        )


        job_match = result.get(
            "job_match",
            {}
        )


        review = result.get(
            "review_analysis",
            {}
        )


        profile = result.get(
            "profile_analysis",
            {}
        )


        resume_content = result.get(
            "resume_content",
            {}
        )


        # =================================================
        # VISUAL SCORE DASHBOARD
        # =================================================

        ats_score = normalize_score(
            ats.get(
                "ats_score",
                0
            )
        )

        job_match_score = normalize_score(
            job_match.get(
                "match_score",
                0
            )
        )

        review_score = normalize_score(
            review.get(
                "overall_score",
                0
            )
        )

        years = profile.get(
            "years_experience",
            "N/A"
        )

        if years == "N/A":

            experience_text = "N/A"

        else:

            experience_text = (
                f"{years} Years"
            )

        (
            score_col1,
            score_col2,
            score_col3,
            score_col4
        ) = st.columns(4)

        with score_col1:

            st.markdown(
                f"""
<div class="score-card">
<div class="score-ring" style="background:{score_ring_background(ats_score)};">
<div class="score-number">{ats_score}%</div>
</div>
<div class="score-label">ATS Score</div>
<div class="score-subtext">Resume compatibility</div>
</div>
""",
                unsafe_allow_html=True
            )

        with score_col2:

            st.markdown(
                f"""
<div class="score-card">
<div class="score-ring" style="background:{score_ring_background(job_match_score)};">
<div class="score-number">{job_match_score}%</div>
</div>
<div class="score-label">Job Match</div>
<div class="score-subtext">Role alignment</div>
</div>
""",
                unsafe_allow_html=True
            )

        with score_col3:

            st.markdown(
                f"""
<div class="score-card">
<div class="score-ring" style="background:{score_ring_background(review_score)};">
<div class="score-number">{review_score}%</div>
</div>
<div class="score-label">Review Score</div>
<div class="score-subtext">Resume quality</div>
</div>
""",
                unsafe_allow_html=True
            )

        with score_col4:

            st.markdown(
                f"""
<div class="experience-card">
<div class="experience-icon">💼</div>
<div class="experience-number">{experience_text}</div>
<div class="experience-label">Experience</div>
<div class="score-subtext">Detected profile level</div>
</div>
""",
                unsafe_allow_html=True
            )

        st.markdown("")


        with st.container(
            border=True
        ):

            st.markdown(
                "### 👤 Professional Summary"
            )


            st.write(
                resume_content.get(
                    "professional_summary",
                    (
                        "No professional "
                        "summary returned."
                    )
                )
            )


        with st.container(
            border=True
        ):

            st.markdown(
                "### 🧠 Skills"
            )


            skills = (
                resume_content.get(
                    "skills",
                    []
                )
            )


            if skills:

                st.write(
                    "  •  ".join(
                        skills
                    )
                )

            else:

                st.write(
                    "No skills returned."
                )


        col_a, col_b = st.columns(
            2,
            gap="large"
        )


        with col_a:

            with st.container(
                border=True
            ):

                st.markdown(
                    "### 💼 Experience"
                )


                display_list(
                    resume_content.get(
                        "experience_bullets",
                        []
                    )
                )


        with col_b:

            with st.container(
                border=True
            ):

                st.markdown(
                    "### 🚀 Projects"
                )


                display_list(
                    resume_content.get(
                        "project_descriptions",
                        []
                    )
                )


        col_c, col_d = st.columns(
            2,
            gap="large"
        )


        with col_c:

            with st.container(
                border=True
            ):

                st.markdown(
                    "### 🔍 Missing ATS Keywords"
                )


                display_list(
                    ats.get(
                        "missing_keywords",
                        []
                    )
                )


        with col_d:

            with st.container(
                border=True
            ):

                st.markdown(
                    "### 🎯 Job Match Recommendations"
                )


                display_list(
                    job_match.get(
                        "recommendations",
                        []
                    )
                )


        with st.container(
            border=True
        ):

            st.markdown(
                "### ✅ Resume Review"
            )


            (
                review_col1,
                review_col2
            ) = st.columns(2)


            with review_col1:

                st.markdown(
                    "**Strengths**"
                )


                display_list(
                    review.get(
                        "strengths",
                        []
                    )
                )


            with review_col2:

                st.markdown(
                    "**Improvements**"
                )


                display_list(
                    review.get(
                        "improvements",
                        []
                    )
                )


        st.markdown(
            "---"
        )


        st.markdown(
            "## 📥 Download Resume"
        )


        st.write(
            "Generate a professional PDF "
            "using the optimized AI resume."
        )


        if st.button(
            "📄 Prepare Resume PDF",
            use_container_width=True,
            key="prepare_pdf"
        ):

            with st.spinner(
                "Generating your resume PDF..."
            ):

                try:

                    pdf_response = (
                        requests.post(

                            f"{API_URL}/download-resume",

                            json=result,

                            headers=
                                get_headers(),

                            timeout=120
                        )
                    )


                    if pdf_response.ok:

                        content_type = (
                            pdf_response.headers
                            .get(
                                "content-type",
                                ""
                            )
                        )


                        if (
                            "application/pdf"
                            not in content_type
                        ):

                            st.error(
                                "The backend did not "
                                "return a valid PDF."
                            )

                        else:

                            st.session_state.resume_pdf = (
                                pdf_response.content
                            )


                            st.success(
                                "Resume PDF is ready."
                            )


                    else:

                        error_message = (
                            get_error_message(
                                pdf_response
                            )
                        )


                        st.error(
                            "Unable to create PDF: "
                            f"{error_message}"
                        )


                except (
                    requests.exceptions
                    .RequestException
                ) as exc:

                    st.error(
                        "Unable to connect to "
                        "PDF service: "
                        f"{exc}"
                    )


        if (
            st.session_state
            .resume_pdf
        ):

            st.download_button(
                label=(
                    "⬇️ Download "
                    "AI Generated Resume PDF"
                ),

                data=(
                    st.session_state
                    .resume_pdf
                ),

                file_name=(
                    st.session_state
                    .resume_pdf_name
                ),

                mime=
                    "application/pdf",

                use_container_width=True
            )


        st.markdown("")


        with st.expander(
            "🔧 View Complete API Result"
        ):

            st.json(
                result
            )


# =========================================================
# RESUME COPILOT PAGE
# =========================================================

elif page == "🤖 Resume Copilot":

    st.markdown(
        """
<div class="hero">

<div class="hero-badge">
AI CAREER ASSISTANT
</div>

<div class="hero-title">
Resume
<span class="hero-highlight">
Copilot
</span>
</div>

<div class="hero-text">
Ask questions about your ATS score,
missing skills, job match,
professional summary and resume improvements.
</div>

</div>
""",
        unsafe_allow_html=True
    )


    result = (
        st.session_state
        .resume_result
    )


    if not result:

        st.info(
            "Generate a resume first "
            "from the Resume Generator page."
        )


    else:

        st.markdown(
            "### ⚡ Quick Questions"
        )


        (
            quick1,
            quick2,
            quick3
        ) = st.columns(3)


        if quick1.button(
            "📊 Why is my ATS score low?"
        ):

            st.session_state.quick_question = (
                "Why is my ATS score low?"
            )


        if quick2.button(
            "🧠 Which skills are missing?"
        ):

            st.session_state.quick_question = (
                "Which skills are missing?"
            )


        if quick3.button(
            "✨ Improve my summary"
        ):

            st.session_state.quick_question = (
                "Improve my professional summary"
            )


        st.markdown(
            "---"
        )


        for message in (
            st.session_state
            .copilot_messages
        ):

            with st.chat_message(
                message["role"]
            ):

                st.write(
                    message["content"]
                )


        quick_question = (
            st.session_state.pop(
                "quick_question",
                None
            )
        )


        question = (
            st.chat_input(
                "Ask Resume Copilot..."
            )
        )


        final_question = (
            quick_question
            or
            question
        )


        if final_question:

            st.session_state.copilot_messages.append(
                {
                    "role":
                        "user",

                    "content":
                        final_question
                }
            )


            with st.chat_message(
                "user"
            ):

                st.write(
                    final_question
                )


            history = (
                st.session_state
                .copilot_messages[:-1]
            )


            payload = {

                "question":
                    final_question,

                "resume_result":
                    result,

                "history":
                    history
            }


            with st.chat_message(
                "assistant"
            ):

                with st.spinner(
                    "Resume Copilot "
                    "is thinking..."
                ):

                    try:

                        response = (
                            requests.post(

                                f"{API_URL}/resume-copilot/chat",

                                json=payload,

                                headers=
                                    get_headers(),

                                timeout=120
                            )
                        )


                        if response.ok:

                            answer = (
                                response
                                .json()
                                .get(
                                    "answer",
                                    (
                                        "No answer "
                                        "returned."
                                    )
                                )
                            )


                            st.write(
                                answer
                            )


                            st.session_state.copilot_messages.append(
                                {
                                    "role":
                                        "assistant",

                                    "content":
                                        answer
                                }
                            )


                        else:

                            error_message = (
                                get_error_message(
                                    response
                                )
                            )


                            st.error(
                                error_message
                            )


                    except (
                        requests.exceptions
                        .RequestException
                    ) as exc:

                        st.error(
                            "Unable to connect "
                            "to Resume Copilot: "
                            f"{exc}"
                        )


        st.markdown("")


        if st.button(
            "🗑️ Clear Conversation",
            use_container_width=True
        ):

            st.session_state.copilot_messages = []

            st.rerun()


# =========================================================
# SYSTEM PAGE
# =========================================================

elif page == "⚙️ System":

    st.markdown(
        """
<div class="hero">

<div class="hero-badge">
PLATFORM STATUS
</div>

<div class="hero-title">
AI Platform
<span class="hero-highlight">
System
</span>
</div>

<div class="hero-text">
View the backend connection and verify
the health of the Enterprise AI Resume
Generator services.
</div>

</div>
""",
        unsafe_allow_html=True
    )


    col1, col2 = st.columns(
        2,
        gap="large"
    )


    with col1:

        with st.container(
            border=True
        ):

            st.markdown(
                "### 🌐 Backend API"
            )


            st.code(
                API_URL
            )


    with col2:

        with st.container(
            border=True
        ):

            st.markdown(
                "### 🧠 Architecture"
            )


            st.write(
                "Streamlit → FastAPI → "
                "LangGraph → AI Agents → OpenAI"
            )


    st.markdown("")


    if st.button(
        "🩺 Check Backend Health",
        use_container_width=True
    ):

        try:

            response = (
                requests.get(

                    f"{API_URL}/health",

                    timeout=30
                )
            )


            if response.ok:

                st.success(
                    "Backend is healthy."
                )


                st.json(
                    response.json()
                )


            else:

                st.error(
                    "Backend health check failed."
                )


        except (
            requests.exceptions
            .RequestException
        ) as exc:

            st.error(
                "Unable to reach backend: "
                f"{exc}"
            )

# =========================================================
# FOOTER
# =========================================================

st.markdown(
    """
<div class="app-footer">
Created by <strong>Divya Gudur</strong>
</div>
""",
    unsafe_allow_html=True
)