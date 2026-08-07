import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from "@mui/material";

import FactCheckIcon from "@mui/icons-material/FactCheck";
import DescriptionIcon from "@mui/icons-material/Description";
import RateReviewIcon from "@mui/icons-material/RateReview";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

const features = [
  {
    title: "ATS Optimization",
    description:
      "Analyze resume compatibility, identify missing keywords and improve ATS readiness.",
    icon: <FactCheckIcon />
  },
  {
    title: "AI Resume Writing",
    description:
      "Generate professional summaries, experience bullets, skills and project descriptions.",
    icon: <DescriptionIcon />
  },
  {
    title: "Resume Review",
    description:
      "Evaluate grammar, professionalism, formatting quality and improvement opportunities.",
    icon: <RateReviewIcon />
  },
  {
    title: "Job Matching",
    description:
      "Compare resume skills with the target job description and calculate job-match compatibility.",
    icon: <TrackChangesIcon />
  },
  {
    title: "Resume Copilot",
    description:
      "Ask resume-aware questions and receive contextual guidance based on your generated analysis.",
    icon: <SmartToyIcon />
  },
  {
    title: "AI Recommendations",
    description:
      "Receive prioritized recommendations based on ATS, review and job-match results.",
    icon: <TipsAndUpdatesIcon />
  },
  {
    title: "PDF Export",
    description:
      "Download a recruiter-ready resume and a separate candidate-facing AI analysis report.",
    icon: <PictureAsPdfIcon />
  },
  {
    title: "Workflow Monitoring",
    description:
      "Track the real-time LangGraph multi-agent workflow and execution timeline.",
    icon: <AccountTreeIcon />
  }
];

function FeaturesSection() {
  return (
    <Box
      id="features"
      sx={{
        width: "100%",
        background: "#151515",
        borderTop: "1px solid #242424",
        borderBottom: "1px solid #242424"
      }}
    >
      <Box
        sx={{
          maxWidth: 1500,
          mx: "auto",
          px: {
            xs: 2,
            sm: 3,
            md: 5
          },
          py: {
            xs: 6,
            md: 8
          }
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
        >
          Why Choose{" "}
          <Box
            component="span"
            sx={{ color: "#FF7A00" }}
          >
            Enterprise AI
          </Box>
          ?
        </Typography>

        <Typography
          sx={{
            mt: 2,
            mb: 5,
            textAlign: "center",
            color: "#AFAFAF",
            maxWidth: 760,
            mx: "auto",
            lineHeight: 1.8
          }}
        >
          A complete resume intelligence workflow that combines
          AI generation, ATS optimization, job matching,
          review, recommendations and contextual guidance.
        </Typography>

        <Grid container spacing={3}>
          {features.map((feature) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={feature.title}
            >
              <Card
                sx={{
                  height: "100%",
                  minHeight: 220,
                  background: "#1E1E1E",
                  color: "#FFFFFF",
                  borderRadius: 4,
                  border: "1px solid #333333",
                  transition: "all 0.3s ease",

                  "&:hover": {
                    transform: "translateY(-6px)",
                    borderColor: "#FF7A00",
                    boxShadow:
                      "0 18px 35px rgba(255,122,0,0.16)"
                  }
                }}
              >
                <CardContent
                  sx={{
                    p: 3
                  }}
                >
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "rgba(255,122,0,0.14)",
                      color: "#FF7A00",
                      mb: 2
                    }}
                  >
                    {feature.icon}
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1.2,
                      color: "#BDBDBD",
                      lineHeight: 1.7,
                      fontSize: 14
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default FeaturesSection;