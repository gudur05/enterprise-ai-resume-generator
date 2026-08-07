import { useState } from "react";

import {
  Box,
  Grid,
  Typography
} from "@mui/material";

import HeroBanner from "../components/HeroBanner";
import FeaturesSection from "../components/FeaturesSection";
import ResumeUpload from "../components/ResumeUpload";
import ResumePreview from "../components/ResumePreview";
import ResumeComparison from "../components/ResumeComparison";
import ATSCard from "../components/ATSCard";
import JobMatchCard from "../components/JobMatchCard";
import ReviewCard from "../components/ReviewCard";
import DashboardCard from "../components/DashboardCard";
import AgentWorkflow from "../components/AgentWorkflow";
import RecommendationsPanel from "../components/RecommendationsPanel";
import AnalysisReportDownload from "../components/AnalysisReportDownload";
import ResumeCopilot from "../components/ResumeCopilot";

function Home() {
  const [result, setResult] = useState(null);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%",
        background: "#121212",
        color: "#FFFFFF",
        overflowX: "hidden"
      }}
    >
      {/* HERO — ONLY BEFORE GENERATION */}

      {!result && (
        <HeroBanner />
      )}

      {/* RESUME UPLOAD */}

      <Box
        id="resume-upload"
        sx={{
          width: "100%",
          maxWidth: 1400,
          mx: "auto",

          px: {
            xs: 2,
            sm: 3,
            md: 5
          },

          pt: result
            ? {
                xs: 3,
                md: 4
              }
            : {
                xs: 4,
                md: 5
              },

          pb: {
            xs: 3,
            md: 4
          },

          boxSizing: "border-box"
        }}
      >
        {!result && (
          <>
            <Typography
              variant="h3"
              fontWeight="bold"
              textAlign="center"
            >
              Upload Your Resume
            </Typography>

            <Typography
              sx={{
                mt: 1.5,
                mb: 3,
                textAlign: "center",
                color: "#AFAFAF",
                maxWidth: 700,
                mx: "auto",
                lineHeight: 1.7
              }}
            >
              Upload your current resume and paste the target
              job description to start the AI optimization
              workflow.
            </Typography>
          </>
        )}

        <ResumeUpload
          setResult={setResult}
        />
      </Box>

      {/* FEATURES — ONLY BEFORE GENERATION */}

      {!result && (
        <FeaturesSection />
      )}

      {/* GENERATED RESULTS */}

      {result && (
        <Box
          sx={{
            width: "100%",
            maxWidth: 1400,
            mx: "auto",

            px: {
              xs: 2,
              sm: 3,
              md: 5
            },

            pb: 6,

            boxSizing: "border-box"
          }}
        >
          <Box
            sx={{
              mb: 4
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
            >
              AI Resume Dashboard
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "#AFAFAF"
              }}
            >
              Review your resume intelligence,
              optimization results and AI recommendations.
            </Typography>
          </Box>

          <Grid
            container
            spacing={3}
            sx={{
              mb: 4
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
            >
              <DashboardCard
                title="ATS Score"
                value={`${result.ats_analysis?.ats_score ?? 0}%`}
                color="#10B981"
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={3}
            >
              <DashboardCard
                title="Job Match"
                value={`${result.job_match?.match_score ?? 0}%`}
                color="#2563EB"
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={3}
            >
              <DashboardCard
                title="Review Score"
                value={`${result.review_analysis?.overall_score ?? 0}%`}
                color="#F59E0B"
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={3}
            >
              <DashboardCard
                title="Experience"
                value={`${result.profile_analysis?.years_experience ?? 0} yrs`}
                color="#8B5CF6"
              />
            </Grid>
          </Grid>

          <RecommendationsPanel
            result={result}
          />

          <AnalysisReportDownload
            result={result}
          />

          <ResumeComparison
            result={result}
          />

          <ResumePreview
            result={result}
          />

          <ATSCard
            ats={result.ats_analysis}
          />

          <JobMatchCard
            match={result.job_match}
          />

          <ReviewCard
            review={result.review_analysis}
          />

          <AgentWorkflow />
        </Box>
      )}

      <ResumeCopilot
        result={result}
        setResult={setResult}
      />
    </Box>
  );
}

export default Home;