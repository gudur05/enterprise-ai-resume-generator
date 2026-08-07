import { useEffect, useRef, useState } from "react";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";

import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";

import api from "../api/api";


const suggestedQuestions = [
  "Why is my ATS score low?",
  "Which skills are missing?",
  "Improve my professional summary",
  "How can I improve my job match?",
  "Rewrite my experience bullets",
  "Suggest relevant projects"
];


const initialResumeForm = {
  name: "",
  skills: "",
  experience: "",
  projects: "",
  education: "",
  certifications: "",
  jobDescription: ""
};


function ResumeCopilot({
  result,
  setResult
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(0);

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const [resumeForm, setResumeForm] =
    useState(initialResumeForm);

  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const messagesEndRef = useRef(null);

  const hasResumeResult = Boolean(result);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, loading]);


  useEffect(() => {
    if (hasResumeResult) {
      setMode(1);
    }
  }, [hasResumeResult]);


  const splitCommaSeparatedValues = (value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);


  const buildHistory = () =>
    messages
      .filter(
        (message) =>
          message.role === "user" ||
          message.role === "assistant"
      )
      .slice(-20)
      .map((message) => ({
        role: message.role,
        content: message.content
      }));


  const updateResumeForm = (
    field,
    value
  ) => {
    setResumeForm((currentForm) => ({
      ...currentForm,
      [field]: value
    }));
  };


  const validateResumeForm = () => {
    if (!resumeForm.name.trim()) {
      return "Please enter your name.";
    }

    if (!resumeForm.education.trim()) {
      return "Please enter your education.";
    }

    if (
      resumeForm.experience.trim().length < 10
    ) {
      return (
        "Please provide more details about " +
        "your experience."
      );
    }

    if (
      resumeForm.jobDescription.trim().length < 10
    ) {
      return (
        "Please enter the complete job description."
      );
    }

    return "";
  };


  const generateResumeFromCopilot = async () => {
    if (generating) {
      return;
    }

    const validationError =
      validateResumeForm();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setGenerating(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await api.post(
        "/resume-copilot/generate",
        {
          name: resumeForm.name.trim(),

          skills: splitCommaSeparatedValues(
            resumeForm.skills
          ),

          experience:
            resumeForm.experience.trim(),

          projects: splitCommaSeparatedValues(
            resumeForm.projects
          ),

          education:
            resumeForm.education.trim(),

          certifications:
            splitCommaSeparatedValues(
              resumeForm.certifications
            ),

          job_description:
            resumeForm.jobDescription.trim()
        }
      );

      const generatedResult =
        response.data?.result;

      if (!generatedResult) {
        throw new Error(
          "The server did not return a generated resume."
        );
      }

      setResult(generatedResult);

      setSuccessMessage(
        "Your AI resume was generated successfully."
      );

      setMessages([
        {
          role: "assistant",
          content:
            "Your resume has been generated. " +
            "You can now ask me about your ATS score, " +
            "missing skills, job match, summary, " +
            "experience, and recommendations."
        }
      ]);

      setMode(1);

    } catch (error) {
      console.error(error);

      setErrorMessage(
        error.response?.data?.detail ||
        error.message ||
        "Unable to generate the resume."
      );

    } finally {
      setGenerating(false);
    }
  };


  const sendQuestion = async (
    selectedQuestion
  ) => {
    const finalQuestion =
      typeof selectedQuestion === "string"
        ? selectedQuestion.trim()
        : question.trim();

    if (!finalQuestion || loading) {
      return;
    }

    if (!hasResumeResult) {
      setErrorMessage(
        "Create or upload a resume first so the Copilot has resume context."
      );
      setMode(0);
      return;
    }

    const previousHistory =
      buildHistory();

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        role: "user",
        content: finalQuestion
      }
    ]);

    setQuestion("");
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await api.post(
        "/resume-copilot/chat",
        {
          question: finalQuestion,
          resume_result: result,
          history: previousHistory
        }
      );

      const answer =
        response.data?.answer ||
        "The Resume Copilot did not return an answer.";

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: answer
        }
      ]);

    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.detail ||
        "Resume Copilot is currently unavailable.";

      setErrorMessage(message);

    } finally {
      setLoading(false);
    }
  };


  const clearConversation = () => {
    setMessages([]);
    setQuestion("");
    setErrorMessage("");
    setSuccessMessage("");
  };


  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      sendQuestion();
    }
  };


  return (
    <>
      {!open && (
        <Tooltip title="Open Resume Copilot">
          <Button
            variant="contained"
            startIcon={<ChatIcon />}
            onClick={() => setOpen(true)}
            sx={{
              position: "fixed",
              right: {
                xs: 18,
                md: 30
              },
              bottom: {
                xs: 18,
                md: 30
              },
              zIndex: 1300,
              minHeight: 56,
              px: 3,
              borderRadius: 4,
              background:
                "linear-gradient(90deg,#FF7A00,#FF9F43)",
              color: "#FFFFFF",
              fontWeight: 700,
              boxShadow:
                "0 14px 35px rgba(255,122,0,0.35)",

              "&:hover": {
                background:
                  "linear-gradient(90deg,#FF9F43,#FFB866)",
                transform: "translateY(-2px)"
              }
            }}
          >
            Resume Copilot
          </Button>
        </Tooltip>
      )}

      {open && (
        <Card
          sx={{
            position: "fixed",
            right: {
              xs: 10,
              sm: 20,
              md: 30
            },
            bottom: {
              xs: 10,
              sm: 20,
              md: 30
            },
            width: {
              xs: "calc(100vw - 20px)",
              sm: 470
            },
            height: {
              xs: "calc(100vh - 20px)",
              sm: 700
            },
            maxHeight: {
              xs: "calc(100vh - 20px)",
              sm: "88vh"
            },
            zIndex: 1400,
            display: "flex",
            flexDirection: "column",
            borderRadius: 5,
            background: "#1E1E1E",
            color: "#FFFFFF",
            border:
              "1px solid rgba(255,122,0,0.5)",
            boxShadow:
              "0 24px 60px rgba(0,0,0,0.55)",
            overflow: "hidden"
          }}
        >
          <Box
            sx={{
              p: 2.5,
              background:
                "linear-gradient(135deg,#171717,#2A211A,#FF7A00)"
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
              >
                <Avatar
                  sx={{
                    bgcolor: "#FF7A00"
                  }}
                >
                  <SmartToyIcon />
                </Avatar>

                <Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                  >
                    Resume Copilot
                  </Typography>

                  <Typography
                    sx={{
                      color: "#E0E0E0",
                      fontSize: 13
                    }}
                  >
                    Create and improve your resume
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row">
                <Tooltip title="Clear">
                  <IconButton
                    onClick={clearConversation}
                    sx={{ color: "#FFFFFF" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Close">
                  <IconButton
                    onClick={() => setOpen(false)}
                    sx={{ color: "#FFFFFF" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          </Box>

          <Tabs
            value={mode}
            onChange={(_, newValue) =>
              setMode(newValue)
            }
            variant="fullWidth"
            sx={{
              background: "#1E1E1E",
              borderBottom: "1px solid #333333",

              "& .MuiTab-root": {
                color: "#AFAFAF",
                fontWeight: 700
              },

              "& .Mui-selected": {
                color: "#FF7A00 !important"
              },

              "& .MuiTabs-indicator": {
                backgroundColor: "#FF7A00"
              }
            }}
          >
            <Tab
              icon={<DescriptionIcon />}
              iconPosition="start"
              label="Create Resume"
            />

            <Tab
              icon={<ChatIcon />}
              iconPosition="start"
              label="Resume Coach"
            />
          </Tabs>

          {(errorMessage || successMessage) && (
            <Box
              sx={{
                px: 2.5,
                pt: 2
              }}
            >
              {errorMessage && (
                <Alert
                  severity="error"
                  onClose={() =>
                    setErrorMessage("")
                  }
                >
                  {errorMessage}
                </Alert>
              )}

              {successMessage && (
                <Alert
                  severity="success"
                  onClose={() =>
                    setSuccessMessage("")
                  }
                >
                  {successMessage}
                </Alert>
              )}
            </Box>
          )}

          {mode === 0 && (
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                p: 2.5,
                background: "#171717"
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
              >
                Create Resume with AI
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  mb: 3,
                  color: "#BDBDBD",
                  lineHeight: 1.6
                }}
              >
                Enter your genuine career details. The AI
                will optimize the wording for the target
                job without inventing experience.
              </Typography>

              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={resumeForm.name}
                  onChange={(event) =>
                    updateResumeForm(
                      "name",
                      event.target.value
                    )
                  }
                  disabled={generating}
                />

                <TextField
                  fullWidth
                  label="Education"
                  placeholder="Example: B.Tech in Computer Science"
                  value={resumeForm.education}
                  onChange={(event) =>
                    updateResumeForm(
                      "education",
                      event.target.value
                    )
                  }
                  disabled={generating}
                />

                <TextField
                  fullWidth
                  label="Skills"
                  placeholder="Python, FastAPI, React, AWS"
                  value={resumeForm.skills}
                  onChange={(event) =>
                    updateResumeForm(
                      "skills",
                      event.target.value
                    )
                  }
                  disabled={generating}
                />

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Experience"
                  placeholder={
                    "Describe your roles, responsibilities, " +
                    "tools, and genuine achievements."
                  }
                  value={resumeForm.experience}
                  onChange={(event) =>
                    updateResumeForm(
                      "experience",
                      event.target.value
                    )
                  }
                  disabled={generating}
                />

                <TextField
                  fullWidth
                  label="Projects"
                  placeholder={
                    "Enterprise AI Resume Generator, " +
                    "Campaign Automation"
                  }
                  value={resumeForm.projects}
                  onChange={(event) =>
                    updateResumeForm(
                      "projects",
                      event.target.value
                    )
                  }
                  disabled={generating}
                />

                <TextField
                  fullWidth
                  label="Certifications"
                  placeholder={
                    "Google Data Analytics, AWS Practitioner"
                  }
                  value={resumeForm.certifications}
                  onChange={(event) =>
                    updateResumeForm(
                      "certifications",
                      event.target.value
                    )
                  }
                  disabled={generating}
                />

                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  label="Target Job Description"
                  value={resumeForm.jobDescription}
                  onChange={(event) =>
                    updateResumeForm(
                      "jobDescription",
                      event.target.value
                    )
                  }
                  disabled={generating}
                />

                <Button
                  fullWidth
                  variant="contained"
                  onClick={generateResumeFromCopilot}
                  disabled={generating}
                  sx={{
                    minHeight: 52,
                    borderRadius: 3,
                    background:
                      "linear-gradient(90deg,#FF7A00,#FF9F43)",
                    fontWeight: 700
                  }}
                >
                  {generating
                    ? (
                      <>
                        <CircularProgress
                          size={20}
                          sx={{
                            mr: 1.5,
                            color: "#FFFFFF"
                          }}
                        />
                        Generating Resume...
                      </>
                    )
                    : "Generate My Resume"}
                </Button>
              </Stack>
            </Box>
          )}

          {mode === 1 && (
            <>
              <Box
                sx={{
                  flexGrow: 1,
                  overflowY: "auto",
                  p: 2.5,
                  background: "#171717"
                }}
              >
                {!hasResumeResult && (
                  <Alert
                    severity="info"
                    sx={{ mb: 3 }}
                  >
                    Create a resume using the first tab or
                    upload one through the main page to
                    activate the Resume Coach.
                  </Alert>
                )}

                {messages.length === 0 && (
                  <Box>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2.5,
                        mb: 3,
                        borderRadius: 4,
                        background:
                          "rgba(255,122,0,0.09)",
                        border:
                          "1px solid rgba(255,122,0,0.32)"
                      }}
                    >
                      <Typography
                        color="#FFFFFF"
                        fontWeight={700}
                      >
                        Ask me about your generated resume.
                      </Typography>

                      <Typography
                        sx={{
                          mt: 1,
                          color: "#CFCFCF",
                          lineHeight: 1.65
                        }}
                      >
                        I can explain your ATS score,
                        missing skills, job match, summary,
                        experience, and recommendations.
                      </Typography>
                    </Paper>

                    <Stack spacing={1.2}>
                      {suggestedQuestions.map(
                        (suggestion) => (
                          <Button
                            key={suggestion}
                            variant="outlined"
                            disabled={
                              loading ||
                              !hasResumeResult
                            }
                            onClick={() =>
                              sendQuestion(suggestion)
                            }
                            sx={{
                              justifyContent:
                                "flex-start",
                              borderColor: "#444444",
                              color: "#E5E5E5"
                            }}
                          >
                            {suggestion}
                          </Button>
                        )
                      )}
                    </Stack>
                  </Box>
                )}

                <Stack spacing={2}>
                  {messages.map(
                    (message, index) => {
                      const isUser =
                        message.role === "user";

                      return (
                        <Stack
                          key={`${message.role}-${index}`}
                          direction="row"
                          spacing={1.2}
                          justifyContent={
                            isUser
                              ? "flex-end"
                              : "flex-start"
                          }
                        >
                          {!isUser && (
                            <Avatar
                              sx={{
                                width: 34,
                                height: 34,
                                bgcolor: "#FF7A00"
                              }}
                            >
                              <SmartToyIcon
                                sx={{
                                  fontSize: 20
                                }}
                              />
                            </Avatar>
                          )}

                          <Paper
                            elevation={0}
                            sx={{
                              maxWidth: "80%",
                              px: 2,
                              py: 1.5,
                              borderRadius: 3,
                              background: isUser
                                ? "#FF7A00"
                                : "#282828",
                              color: "#FFFFFF"
                            }}
                          >
                            <Typography
                              sx={{
                                whiteSpace: "pre-wrap",
                                overflowWrap:
                                  "anywhere",
                                lineHeight: 1.7
                              }}
                            >
                              {message.content}
                            </Typography>
                          </Paper>

                          {isUser && (
                            <Avatar
                              sx={{
                                width: 34,
                                height: 34,
                                bgcolor: "#444444"
                              }}
                            >
                              <PersonIcon />
                            </Avatar>
                          )}
                        </Stack>
                      );
                    }
                  )}

                  {loading && (
                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                    >
                      <CircularProgress
                        size={20}
                        sx={{
                          color: "#FF7A00"
                        }}
                      />

                      <Typography
                        color="#BDBDBD"
                      >
                        Resume Copilot is thinking...
                      </Typography>
                    </Stack>
                  )}
                </Stack>

                <div ref={messagesEndRef} />
              </Box>

              <Divider
                sx={{
                  borderColor: "#333333"
                }}
              />

              <Box
                sx={{
                  p: 2,
                  background: "#1E1E1E"
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.2}
                  alignItems="flex-end"
                >
                  <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    value={question}
                    disabled={
                      loading ||
                      !hasResumeResult
                    }
                    placeholder={
                      hasResumeResult
                        ? "Ask about your resume..."
                        : "Generate a resume first"
                    }
                    onChange={(event) =>
                      setQuestion(
                        event.target.value
                      )
                    }
                    onKeyDown={handleKeyDown}
                  />

                  <IconButton
                    onClick={() =>
                      sendQuestion()
                    }
                    disabled={
                      loading ||
                      !question.trim() ||
                      !hasResumeResult
                    }
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: "#FF7A00",
                      color: "#FFFFFF"
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </Stack>
              </Box>
            </>
          )}
        </Card>
      )}
    </>
  );
}

export default ResumeCopilot;