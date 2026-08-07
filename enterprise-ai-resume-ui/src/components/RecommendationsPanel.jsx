import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  Divider,
  LinearProgress,
  Grid
} from "@mui/material";

import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";


function RecommendationsPanel({ result }) {
  if (!result) return null;

  const ats = result.ats_analysis ?? {};
  const match = result.job_match ?? {};
  const review = result.review_analysis ?? {};

  const missingKeywords =
    Array.isArray(ats.missing_keywords)
      ? ats.missing_keywords
      : [];

  const atsSuggestions =
    Array.isArray(ats.formatting_suggestions)
      ? ats.formatting_suggestions
      : [];

  const matchRecommendations =
    Array.isArray(match.recommendations)
      ? match.recommendations
      : [];

  const reviewImprovements =
    Array.isArray(review.improvements)
      ? review.improvements
      : [];

  const combinedRecommendations = [
    ...atsSuggestions,
    ...matchRecommendations,
    ...reviewImprovements
  ];

  const uniqueRecommendations = [
    ...new Set(
      combinedRecommendations
        .filter(Boolean)
        .map((item) =>
          String(item).trim()
        )
        .filter(Boolean)
    )
  ];

  const atsScore = Number(
    ats.ats_score ?? 0
  );

  const matchScore = Number(
    match.match_score ?? 0
  );

  const reviewScore = Number(
    review.overall_score ?? 0
  );

  const overallReadiness = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        (
          atsScore +
          matchScore +
          reviewScore
        ) / 3
      )
    )
  );

  const scoreCards = [
    {
      label: "ATS Score",
      value: atsScore
    },
    {
      label: "Job Match",
      value: matchScore
    },
    {
      label: "Overall Readiness",
      value: overallReadiness
    }
  ];

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
            "linear-gradient(135deg,#171717 0%,#242424 72%,#4A2608 125%)",
          borderBottom:
            "1px solid #333333"
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <TipsAndUpdatesIcon
            sx={{
              color: "#FF7A00",
              fontSize: 38
            }}
          />

          <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
            >
              AI Recommendations
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                color: "#BDBDBD",
                lineHeight: 1.6
              }}
            >
              Prioritized improvements generated from
              ATS analysis, job matching and resume review.
            </Typography>
          </Box>
        </Stack>
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
          sx={{
            mb: 4
          }}
        >
          {scoreCards.map((score) => (
            <Grid
              item
              xs={12}
              md={4}
              key={score.label}
            >
              <Box
                sx={{
                  height: "100%",
                  p: 3,
                  borderRadius: 4,
                  background: "#252525",
                  border:
                    "1px solid #383838"
                }}
              >
                <Typography
                  color="#BDBDBD"
                  fontWeight={600}
                >
                  {score.label}
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color="#FF7A00"
                  mt={1}
                >
                  {score.value}%
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={Math.min(
                    100,
                    Math.max(
                      0,
                      score.value
                    )
                  )}
                  sx={{
                    mt: 2,
                    height: 9,
                    borderRadius: 5,
                    backgroundColor:
                      "#3A3A3A",

                    "& .MuiLinearProgress-bar":
                      {
                        borderRadius: 5,
                        background:
                          "linear-gradient(90deg,#FF7A00,#FFB347)"
                      }
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider
          sx={{
            borderColor: "#3A3A3A",
            mb: 4
          }}
        />

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          mb={2}
        >
          <PriorityHighIcon
            sx={{
              color: "#FF7A00"
            }}
          />

          <Typography
            variant="h6"
            fontWeight="bold"
          >
            High-Priority Missing Keywords
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          flexWrap="wrap"
          mb={4}
        >
          {missingKeywords.length > 0 ? (
            missingKeywords.map(
              (keyword, index) => (
                <Chip
                  key={`${keyword}-${index}`}
                  label={keyword}
                  sx={{
                    background:
                      "rgba(255,122,0,0.14)",
                    color: "#FF9A3C",
                    border:
                      "1px solid rgba(255,122,0,0.38)",
                    fontWeight: 600
                  }}
                />
              )
            )
          ) : (
            <Chip
              icon={<CheckCircleIcon />}
              label="No major keywords missing"
              sx={{
                background:
                  "rgba(34,197,94,0.14)",
                color: "#4ADE80",
                border:
                  "1px solid rgba(34,197,94,0.35)"
              }}
            />
          )}
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          mb={2}
        >
          <TrackChangesIcon
            sx={{
              color: "#FF7A00"
            }}
          />

          <Typography
            variant="h6"
            fontWeight="bold"
          >
            Recommended Actions
          </Typography>
        </Stack>

        <Stack spacing={1.5}>
          {uniqueRecommendations.length > 0 ? (
            uniqueRecommendations.map(
              (recommendation, index) => (
                <Box
                  key={`${recommendation}-${index}`}
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems:
                      "flex-start",
                    p: 2.25,
                    borderRadius: 3,
                    background:
                      "#252525",
                    border:
                      "1px solid #383838"
                  }}
                >
                  <Box
                    sx={{
                      minWidth: 30,
                      width: 30,
                      height: 30,
                      borderRadius:
                        "50%",
                      display: "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      background:
                        "#FF7A00",
                      color:
                        "#FFFFFF",
                      fontWeight: 700
                    }}
                  >
                    {index + 1}
                  </Box>

                  <Typography
                    sx={{
                      color: "#DDDDDD",
                      lineHeight: 1.7
                    }}
                  >
                    {recommendation}
                  </Typography>
                </Box>
              )
            )
          ) : (
            <Typography
              color="#BDBDBD"
            >
              No additional recommendations were returned.
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default RecommendationsPanel;