import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Snackbar,
  TextField,
  Typography
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import api from "../api/api";
import ProcessingLoader from "./ProcessingLoader";


const initialWorkflowSteps = [
  {
    id: "resume_parser",
    label: "Resume Parser",
    status: "pending"
  },
  {
    id: "profile_analyzer",
    label: "Profile Analyzer",
    status: "pending"
  },
  {
    id: "ats_optimizer",
    label: "ATS Optimizer",
    status: "pending"
  },
  {
    id: "resume_writer",
    label: "Resume Writer",
    status: "pending"
  },
  {
    id: "reviewer",
    label: "Resume Reviewer",
    status: "pending"
  },
  {
    id: "job_match",
    label: "Job Matcher",
    status: "pending"
  }
];


function ResumeUpload({ setResult }) {
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [workflowSteps, setWorkflowSteps] =
    useState(initialWorkflowSteps);

  const [errorMessage, setErrorMessage] = useState("");
  const [timeline, setTimeline] = useState([]);

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info"
  });


  const showNotification = (
    message,
    severity = "info"
  ) => {
    setNotification({
      open: true,
      message,
      severity
    });
  };


  const closeNotification = (
    event,
    reason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setNotification((currentNotification) => ({
      ...currentNotification,
      open: false
    }));
  };


  const getCurrentTime = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });


  const addTimelineEvent = (
    message,
    type = "info"
  ) => {
    setTimeline((currentTimeline) => [
      ...currentTimeline,
      {
        time: getCurrentTime(),
        message,
        type
      }
    ]);
  };


  const calculateProgress = (steps) => {
    const completedCount = steps.filter(
      (step) => step.status === "completed"
    ).length;

    return Math.round(
      (completedCount / steps.length) * 100
    );
  };


  const updateWorkflowStep = (
    stepId,
    status
  ) => {
    setWorkflowSteps((currentSteps) =>
      currentSteps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              status
            }
          : step
      )
    );
  };


  const completeStepAndActivateNext = (
    completedStepId
  ) => {
    setWorkflowSteps((currentSteps) => {
      const completedIndex =
        currentSteps.findIndex(
          (step) =>
            step.id === completedStepId
        );

      return currentSteps.map(
        (step, index) => {
          if (
            step.id === completedStepId
          ) {
            return {
              ...step,
              status: "completed"
            };
          }

          if (
            index === completedIndex + 1 &&
            step.status !== "completed"
          ) {
            return {
              ...step,
              status: "active"
            };
          }

          return step;
        }
      );
    });
  };


  const processStreamingEvent = (
    payload,
    completionState
  ) => {
    if (
      payload.type === "step_started"
    ) {
      updateWorkflowStep(
        payload.step,
        "active"
      );

      addTimelineEvent(
        `${payload.label || payload.step} started`
      );

      return;
    }


    if (
      payload.type === "step_completed"
    ) {
      completeStepAndActivateNext(
        payload.step
      );

      addTimelineEvent(
        `${payload.label || payload.step} completed`,
        "completed"
      );

      return;
    }


    if (
      payload.type === "pipeline_started"
    ) {
      addTimelineEvent(
        "LangGraph multi-agent workflow started"
      );

      return;
    }


    if (
      payload.type === "completed"
    ) {
      setWorkflowSteps(
        currentSteps =>
          currentSteps.map((step) => ({
            ...step,
            status: "completed"
          }))
      );

      setResult(
        payload.result
      );

      addTimelineEvent(
        "AI resume generation completed",
        "completed"
      );

      showNotification(
        "Resume generated successfully!",
        "success"
      );

      completionState.completed = true;

      return;
    }


    if (
      payload.type === "error"
    ) {
      completionState.error =
        payload.message ||
        "The AI workflow failed.";

      addTimelineEvent(
        completionState.error,
        "error"
      );
    }
  };


  const generateResume = async () => {
    if (!file) {
      showNotification(
        "Please upload a resume before generating.",
        "warning"
      );

      return;
    }


    if (!jobDescription.trim()) {
      showNotification(
        "Please enter the Job Description.",
        "warning"
      );

      return;
    }


    setLoading(true);
    setResult(null);
    setErrorMessage("");
    setTimeline([]);


    setWorkflowSteps(
      initialWorkflowSteps.map(
        (step, index) => ({
          ...step,
          status:
            index === 0
              ? "active"
              : "pending"
        })
      )
    );


    addTimelineEvent(
      `Resume selected: ${file.name}`
    );


    const formData =
      new FormData();


    formData.append(
      "file",
      file
    );


    formData.append(
      "job_description",
      jobDescription.trim()
    );


    try {
      const isMobile =
        window.matchMedia(
          "(max-width: 768px)"
        ).matches;


      /*
       * MOBILE FLOW
       *
       * Use standard API request instead of
       * streamed response for better mobile
       * browser compatibility.
       */
      if (isMobile) {
        addTimelineEvent(
          "Mobile AI workflow started"
        );


        const response =
          await api.post(
            "/generate-ai-resume",
            formData
          );


        const result =
          response.data;


        if (!result) {
          throw new Error(
            "The server did not return a generated resume."
          );
        }


        setWorkflowSteps(
          initialWorkflowSteps.map(
            (step) => ({
              ...step,
              status: "completed"
            })
          )
        );


        setResult(
          result
        );


        addTimelineEvent(
          "AI resume generation completed",
          "completed"
        );


        showNotification(
          "Resume generated successfully!",
          "success"
        );


        return;
      }


      /*
       * DESKTOP FLOW
       *
       * Keep existing real-time streaming.
       */

      const baseUrl =
        api.defaults.baseURL ||
        "http://127.0.0.1:8000";


      const response =
        await fetch(
          `${baseUrl}/generate-ai-resume-stream`,
          {
            method: "POST",

            headers: {
              Accept:
                "text/event-stream",

              "X-API-Key":
                import.meta.env
                  .VITE_API_KEY ||
                "resume_app_local_2026_secure"
            },

            body: formData
          }
        );


      if (!response.ok) {
        let message =
          "Unable to start the AI workflow.";


        try {
          const responseData =
            await response.json();

          message =
            responseData.detail ||
            message;

        } catch {
          const responseText =
            await response.text();

          if (responseText) {
            message =
              responseText;
          }
        }


        throw new Error(
          message
        );
      }


      if (!response.body) {
        throw new Error(
          "The browser did not provide a streaming response."
        );
      }


      const reader =
        response.body.getReader();


      const decoder =
        new TextDecoder(
          "utf-8"
        );


      let buffer = "";


      const completionState = {
        completed: false,
        error: ""
      };


      while (true) {
        const {
          value,
          done
        } = await reader.read();


        if (done) {
          break;
        }


        buffer +=
          decoder.decode(
            value,
            {
              stream: true
            }
          );


        const eventBlocks =
          buffer.split(
            /\r?\n\r?\n/
          );


        buffer =
          eventBlocks.pop() ||
          "";


        for (
          const eventBlock
          of eventBlocks
        ) {
          const dataLines =
            eventBlock
              .split(
                /\r?\n/
              )
              .filter(
                (line) =>
                  line.startsWith(
                    "data:"
                  )
              )
              .map(
                (line) =>
                  line.replace(
                    /^data:\s?/,
                    ""
                  )
              );


          if (
            dataLines.length === 0
          ) {
            continue;
          }


          const rawData =
            dataLines.join(
              "\n"
            );


          try {
            const payload =
              JSON.parse(
                rawData
              );


            processStreamingEvent(
              payload,
              completionState
            );


            if (
              completionState.error
            ) {
              throw new Error(
                completionState.error
              );
            }

          } catch (error) {
            if (
              error instanceof
              SyntaxError
            ) {
              console.error(
                "Unable to parse streaming event:",
                rawData
              );

              continue;
            }


            throw error;
          }
        }
      }


      if (
        !completionState.completed
      ) {
        throw new Error(
          "The streaming connection closed before the workflow completed."
        );
      }

    } catch (error) {
      console.error(
        "Resume generation error:",
        error
      );


      const message =
        error.response?.data?.detail ||
        error.message ||
        "Something went wrong.";


      setErrorMessage(
        message
      );


      setWorkflowSteps(
        (currentSteps) =>
          currentSteps.map(
            (step) =>
              step.status === "active"
                ? {
                    ...step,
                    status: "failed"
                  }
                : step
          )
      );


      addTimelineEvent(
        message,
        "error"
      );


      showNotification(
        message,
        "error"
      );

    } finally {
      setLoading(false);
    }
  };


  const handleFileSelection = (
    event
  ) => {
    const selectedFile =
      event.target.files?.[0];


    if (!selectedFile) {
      setFile(null);

      return;
    }


    const allowedExtensions = [
      "pdf",
      "docx"
    ];


    const extension =
      selectedFile.name
        .split(".")
        .pop()
        ?.toLowerCase();


    if (
      !allowedExtensions.includes(
        extension
      )
    ) {
      setFile(null);


      showNotification(
        "Only PDF and DOCX files are supported.",
        "warning"
      );


      event.target.value = "";


      return;
    }


    setFile(
      selectedFile
    );


    showNotification(
      `${selectedFile.name} selected successfully.`,
      "success"
    );
  };


  const progress =
    calculateProgress(
      workflowSteps
    );


  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1000,
          mx: "auto",

          mt: {
            xs: 1,
            md: 3
          },

          boxSizing:
            "border-box"
        }}
      >
        <Card
          sx={{
            width: "100%",

            borderRadius: {
              xs: 3,
              sm: 4,
              md: 5
            },

            background:
              "#1E1E1E",

            border:
              "1px solid #333333",

            boxShadow:
              "0 15px 35px rgba(0,0,0,0.35)",

            overflow:
              "hidden"
          }}
        >
          <Box
            sx={{
              background:
                "linear-gradient(135deg,#171717,#232323,#FF7A00)",

              color:
                "#FFFFFF",

              p: {
                xs: 2,
                sm: 3,
                md: 4
              }
            }}
          >
            <Typography
              fontWeight="bold"

              sx={{
                fontSize: {
                  xs: 24,
                  sm: 28,
                  md: 34
                }
              }}
            >
              Upload Your Resume
            </Typography>


            <Typography
              sx={{
                mt: 1,

                color:
                  "#D0D0D0",

                fontSize: {
                  xs: 14,
                  md: 16
                },

                lineHeight:
                  1.6
              }}
            >
              Upload a PDF or DOCX resume
              and compare it with a job
              description using the AI
              workflow.
            </Typography>
          </Box>


          <CardContent
            sx={{
              p: {
                xs: 2,
                sm: 3,
                md: 4
              },

              "&:last-child": {
                pb: {
                  xs: 2,
                  sm: 3,
                  md: 4
                }
              }
            }}
          >
            <Box
              sx={{
                border:
                  "2px dashed #FF7A00",

                borderRadius:
                  4,

                p: {
                  xs: 2.5,
                  sm: 4,
                  md: 6
                },

                background:
                  "#252525",

                textAlign:
                  "center",

                transition:
                  "0.3s",

                "&:hover": {
                  background:
                    "#2F2F2F"
                }
              }}
            >
              <CloudUploadIcon
                sx={{
                  fontSize: {
                    xs: 48,
                    sm: 60,
                    md: 70
                  },

                  color:
                    "#FF7A00"
                }}
              />


              <Typography
                fontWeight="bold"
                color="#FFFFFF"

                sx={{
                  mt: 2,

                  fontSize: {
                    xs: 19,
                    sm: 22,
                    md: 24
                  }
                }}
              >
                Select Your Resume
              </Typography>


              <Typography
                sx={{
                  mt: 1,

                  color:
                    "#BDBDBD",

                  fontSize: {
                    xs: 13,
                    md: 15
                  }
                }}
              >
                Supported formats:
                PDF and DOCX
              </Typography>


              <Button
                variant="contained"
                component="label"
                disabled={loading}

                sx={{
                  mt: 3,

                  width: {
                    xs: "100%",
                    sm: "auto"
                  },

                  maxWidth: {
                    xs: 280,
                    sm: "none"
                  },

                  borderRadius:
                    3,

                  background:
                    "#FF7A00",

                  "&:hover": {
                    background:
                      "#FF9F43"
                  }
                }}
              >
                Browse Resume


                <input
                  hidden
                  type="file"
                  accept=".pdf,.docx"

                  onChange={
                    handleFileSelection
                  }
                />
              </Button>


              {file && (
                <Typography
                  sx={{
                    mt: 3,

                    color:
                      "#4ADE80",

                    fontWeight:
                      "bold",

                    fontSize: {
                      xs: 13,
                      md: 15
                    },

                    overflowWrap:
                      "anywhere"
                  }}
                >
                  Selected: {file.name}
                </Typography>
              )}
            </Box>


            <TextField
              fullWidth
              multiline

              minRows={5}
              maxRows={10}

              label={
                "Paste Job Description"
              }

              placeholder={
                "Paste the complete Job Description here..."
              }

              value={
                jobDescription
              }

              disabled={
                loading
              }

              onChange={(event) =>
                setJobDescription(
                  event.target.value
                )
              }

              sx={{
                mt: {
                  xs: 3,
                  md: 4
                },

                "& .MuiOutlinedInput-root":
                {
                  color:
                    "#FFFFFF",

                  fontSize: {
                    xs: 14,
                    md: 16
                  },

                  "& fieldset": {
                    borderColor:
                      "#555555"
                  },

                  "&:hover fieldset":
                  {
                    borderColor:
                      "#FF7A00"
                  },

                  "&.Mui-focused fieldset":
                  {
                    borderColor:
                      "#FF7A00"
                  }
                },

                "& .MuiInputLabel-root":
                {
                  color:
                    "#BBBBBB"
                },

                "& .MuiInputLabel-root.Mui-focused":
                {
                  color:
                    "#FF7A00"
                }
              }}
            />


            <Button
              fullWidth
              size="large"
              variant="contained"

              onClick={
                generateResume
              }

              disabled={
                loading
              }

              sx={{
                mt: {
                  xs: 3,
                  md: 4
                },

                minHeight: {
                  xs: 52,
                  md: 60
                },

                fontSize: {
                  xs: 15,
                  sm: 16,
                  md: 18
                },

                borderRadius:
                  3,

                background:
                  "linear-gradient(90deg,#FF7A00,#FF9F43)",

                "&:hover": {
                  background:
                    "linear-gradient(90deg,#FF9F43,#FFB866)"
                }
              }}
            >
              {loading
                ? "AI Workflow Running..."
                : "Generate AI Resume"}
            </Button>
          </CardContent>
        </Card>


        {(
          loading ||
          errorMessage ||
          timeline.length > 0
        ) && (
          <ProcessingLoader
            workflowSteps={
              workflowSteps
            }

            progress={
              progress
            }

            errorMessage={
              errorMessage
            }

            timeline={
              timeline
            }
          />
        )}
      </Box>


      <Snackbar
        open={
          notification.open
        }

        autoHideDuration={
          notification.severity ===
          "error"
            ? 6000
            : 4000
        }

        onClose={
          closeNotification
        }

        anchorOrigin={{
          vertical:
            "bottom",

          horizontal:
            "center"
        }}

        sx={{
          left: {
            xs: 8,
            sm: "auto"
          },

          right: {
            xs: 8,
            sm: 24
          },

          bottom: {
            xs: 10,
            sm: 24
          }
        }}
      >
        <Alert
          onClose={
            closeNotification
          }

          severity={
            notification.severity
          }

          variant="filled"

          sx={{
            width:
              "100%",

            maxWidth:
              420,

            borderRadius:
              3,

            fontWeight:
              600,

            boxShadow:
              "0 12px 30px rgba(0,0,0,0.35)",

            "&.MuiAlert-filledSuccess":
            {
              backgroundColor:
                "#16803B"
            },

            "&.MuiAlert-filledWarning":
            {
              backgroundColor:
                "#E96F00"
            },

            "&.MuiAlert-filledError":
            {
              backgroundColor:
                "#C62828"
            }
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}


export default ResumeUpload;