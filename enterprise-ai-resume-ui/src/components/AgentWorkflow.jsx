import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Avatar,
  Grid,
  Chip
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import PersonIcon from "@mui/icons-material/Person";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import DescriptionIcon from "@mui/icons-material/Description";
import RateReviewIcon from "@mui/icons-material/RateReview";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const workflowSteps = [
  {
    title: "Resume Parser",
    description:
      "Extracts structured candidate information from the uploaded PDF or DOCX resume.",
    icon: <UploadFileIcon />,
    label: "Document Processing"
  },
  {
    title: "Profile Analyzer",
    description:
      "Identifies the candidate level, primary domain, and total years of experience.",
    icon: <PersonIcon />,
    label: "Profile Intelligence"
  },
  {
    title: "ATS Optimizer",
    description:
      "Analyzes ATS compatibility, missing keywords, and formatting improvement opportunities.",
    icon: <FactCheckIcon />,
    label: "ATS Intelligence"
  },
  {
    title: "Resume Writer",
    description:
      "Creates an optimized professional summary, skills, experience bullets, and project descriptions.",
    icon: <DescriptionIcon />,
    label: "Content Generation"
  },
  {
    title: "Resume Reviewer",
    description:
      "Reviews grammar, professionalism, formatting quality, strengths, and improvement areas.",
    icon: <RateReviewIcon />,
    label: "Quality Validation"
  },
  {
    title: "Job Matcher",
    description:
      "Compares the candidate profile with the target job description and calculates compatibility.",
    icon: <TrackChangesIcon />,
    label: "Job Compatibility"
  },
  {
    title: "Final Resume",
    description:
      "Displays the optimized resume and allows the user to download a recruiter-ready PDF.",
    icon: <DownloadIcon />,
    label: "Final Output"
  }
];

function AgentWorkflow() {
  return (
    <Card
      sx={{
        mt: 4,
        borderRadius: 5,
        background: "#1E1E1E",
        color: "#FFFFFF",
        border: "1px solid #333333",
        boxShadow:
          "0 16px 36px rgba(0,0,0,0.32)",
        overflow: "hidden"
      }}
    >
      <Box
        sx={{
          px: {
            xs: 3,
            md: 4
          },
          py: 3.5,
          background:
            "linear-gradient(135deg,#171717 0%,#242424 68%,#4A2608 125%)",
          borderBottom:
            "1px solid #333333"
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
        >
          AI Multi-Agent Workflow
        </Typography>

        <Typography
          sx={{
            mt: 1.2,
            color: "#BDBDBD",
            textAlign: "center",
            maxWidth: 800,
            mx: "auto",
            lineHeight: 1.7
          }}
        >
          LangGraph coordinates specialized AI agents
          that analyze, optimize, review, match, and
          prepare the final recruiter-ready resume.
        </Typography>
      </Box>

      <CardContent
        sx={{
          p: {
            xs: 3,
            md: 4
          }
        }}
      >
        <Grid
          container
          spacing={3}
          justifyContent="center"
        >
          {workflowSteps.map(
            (step, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                key={step.title}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: "100%",
                    minHeight: 235,
                    p: 3,
                    borderRadius: 4,
                    background: "#252525",
                    border:
                      "1px solid #383838",
                    transition:
                      "all 0.3s ease",

                    "&:hover": {
                      transform:
                        "translateY(-5px)",
                      borderColor:
                        "#FF7A00",
                      boxShadow:
                        "0 14px 30px rgba(255,122,0,0.15)"
                    }
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    mb={2.5}
                  >
                    <Avatar
                      sx={{
                        width: 54,
                        height: 54,
                        bgcolor:
                          "#FF7A00",
                        color:
                          "#FFFFFF",
                        boxShadow:
                          "0 8px 18px rgba(255,122,0,0.25)"
                      }}
                    >
                      {step.icon}
                    </Avatar>

                    <Typography
                      sx={{
                        color:
                          "#777777",
                        fontWeight: 700,
                        fontSize: 14
                      }}
                    >
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </Typography>
                  </Stack>

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                  >
                    {step.title}
                  </Typography>

                  <Chip
                    label={step.label}
                    size="small"
                    sx={{
                      mt: 1.3,
                      mb: 2,
                      background:
                        "rgba(255,122,0,0.12)",
                      color:
                        "#FF9A3C",
                      border:
                        "1px solid rgba(255,122,0,0.30)",
                      fontWeight: 600
                    }}
                  />

                  <Typography
                    sx={{
                      color:
                        "#C7C7C7",
                      lineHeight: 1.7,
                      fontSize: 14.5
                    }}
                  >
                    {step.description}
                  </Typography>

                  {index <
                    workflowSteps.length -
                      1 && (
                    <ArrowForwardIcon
                      sx={{
                        display: {
                          xs: "none",
                          lg: "block"
                        },
                        position:
                          "absolute",
                        right: -27,
                        top: "50%",
                        transform:
                          "translateY(-50%)",
                        color:
                          "#FF7A00",
                        fontSize: 30,
                        zIndex: 2
                      }}
                    />
                  )}
                </Box>
              </Grid>
            )
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default AgentWorkflow;