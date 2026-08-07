import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Stack,
  LinearProgress
} from "@mui/material";

import RateReviewIcon from "@mui/icons-material/RateReview";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import DescriptionIcon from "@mui/icons-material/Description";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";


function ReviewCard({ review }) {
  if (!review) return null;

  const clampScore = (value) =>
    Math.min(
      100,
      Math.max(
        0,
        Number(value ?? 0)
      )
    );

  const overallScore =
    clampScore(
      review.overall_score
    );

  const grammarScore =
    clampScore(
      review.grammar_score
    );

  const professionalismScore =
    clampScore(
      review.professionalism_score
    );

  const formattingScore =
    clampScore(
      review.formatting_score
    );

  const strengths =
    Array.isArray(review.strengths)
      ? review.strengths
      : [];

  const improvements =
    Array.isArray(
      review.improvements
    )
      ? review.improvements
      : [];

  const scoreItems = [
    {
      label: "Grammar",
      value: grammarScore,
      icon: (
        <SpellcheckIcon />
      )
    },
    {
      label: "Professionalism",
      value: professionalismScore,
      icon: (
        <BusinessCenterIcon />
      )
    },
    {
      label: "Formatting",
      value: formattingScore,
      icon: (
        <DescriptionIcon />
      )
    }
  ];

  return (
    <Card
      sx={{
        mt: 4,
        borderRadius: 5,
        background: "#1E1E1E",
        color: "#FFFFFF",
        border:
          "1px solid #333333",
        boxShadow:
          "0 16px 36px rgba(0,0,0,0.32)"
      }}
    >
      <CardContent
        sx={{
          p: {
            xs: 3,
            md: 4
          }
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          mb={3}
        >
          <RateReviewIcon
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
              Resume Review
            </Typography>

            <Typography
              sx={{
                mt: 0.4,
                color: "#AFAFAF"
              }}
            >
              AI quality review across writing, professionalism and formatting.
            </Typography>
          </Box>
        </Stack>

        <Divider
          sx={{
            mb: 4,
            borderColor: "#3A3A3A"
          }}
        />

        <Box
          sx={{
            p: 3,
            mb: 4,
            textAlign: "center",
            borderRadius: 4,
            background: "#252525",
            border:
              "1px solid #383838"
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 48,
                md: 58
              },
              fontWeight: 800,
              color: "#FF7A00"
            }}
          >
            {overallScore}%
          </Typography>

          <Typography
            color="#BDBDBD"
          >
            Overall Resume Score
          </Typography>

          <LinearProgress
            variant="determinate"
            value={overallScore}
            sx={{
              mt: 2.5,
              height: 10,
              borderRadius: 5,
              backgroundColor:
                "#333333",

              "& .MuiLinearProgress-bar":
                {
                  borderRadius: 5,
                  background:
                    "linear-gradient(90deg,#FF7A00,#FFB347)"
                }
            }}
          />
        </Box>

        <Stack
          spacing={2.5}
          mb={5}
        >
          {scoreItems.map(
            (score) => (
              <Box
                key={score.label}
                sx={{
                  p: 2.25,
                  borderRadius: 3,
                  background:
                    "#252525",
                  border:
                    "1px solid #383838"
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1.2}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >
                    <Box
                      sx={{
                        color:
                          "#FF7A00",
                        display:
                          "flex"
                      }}
                    >
                      {score.icon}
                    </Box>

                    <Typography
                      fontWeight={600}
                    >
                      {score.label}
                    </Typography>
                  </Stack>

                  <Typography
                    color="#FF9A3C"
                    fontWeight={700}
                  >
                    {score.value}%
                  </Typography>
                </Stack>

                <LinearProgress
                  variant="determinate"
                  value={score.value}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor:
                      "#353535",

                    "& .MuiLinearProgress-bar":
                      {
                        borderRadius: 4,
                        background:
                          "linear-gradient(90deg,#FF7A00,#FFB347)"
                      }
                  }}
                />
              </Box>
            )
          )}
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          mb={2}
        >
          <CheckCircleIcon
            sx={{
              color: "#22C55E"
            }}
          />

          <Typography
            variant="h6"
            fontWeight="bold"
          >
            Strengths
          </Typography>
        </Stack>

        {strengths.length > 0 ? (
          <Stack spacing={1.5}>
            {strengths.map(
              (item, index) => (
                <Box
                  key={`${item}-${index}`}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    background:
                      "rgba(34,197,94,0.07)",
                    border:
                      "1px solid rgba(34,197,94,0.22)"
                  }}
                >
                  <Typography
                    sx={{
                      color: "#DDDDDD",
                      lineHeight: 1.7
                    }}
                  >
                    • {item}
                  </Typography>
                </Box>
              )
            )}
          </Stack>
        ) : (
          <Typography color="#AFAFAF">
            No specific strengths were returned.
          </Typography>
        )}

        <Box mt={4} />

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          mb={2}
        >
          <TipsAndUpdatesIcon
            sx={{
              color: "#FF7A00"
            }}
          />

          <Typography
            variant="h6"
            fontWeight="bold"
          >
            Recommended Improvements
          </Typography>
        </Stack>

        {improvements.length > 0 ? (
          <Stack spacing={1.5}>
            {improvements.map(
              (item, index) => (
                <Box
                  key={`${item}-${index}`}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    background:
                      "#252525",
                    border:
                      "1px solid #383838"
                  }}
                >
                  <Typography
                    sx={{
                      color: "#DDDDDD",
                      lineHeight: 1.7
                    }}
                  >
                    • {item}
                  </Typography>
                </Box>
              )
            )}
          </Stack>
        ) : (
          <Typography color="#AFAFAF">
            No additional improvements were returned.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default ReviewCard;