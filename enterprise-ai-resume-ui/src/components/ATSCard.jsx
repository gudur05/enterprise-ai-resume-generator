import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Stack,
  LinearProgress
} from "@mui/material";

import FactCheckIcon from "@mui/icons-material/FactCheck";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";


function ATSCard({ ats }) {
  if (!ats) return null;

  const score = Math.min(
    100,
    Math.max(
      0,
      Number(ats.ats_score ?? 0)
    )
  );

  const missingKeywords =
    Array.isArray(ats.missing_keywords)
      ? ats.missing_keywords
      : [];

  const suggestions =
    Array.isArray(
      ats.formatting_suggestions
    )
      ? ats.formatting_suggestions
      : [];

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
          <FactCheckIcon
            sx={{
              fontSize: 38,
              color: "#FF7A00"
            }}
          />

          <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
            >
              ATS Analysis
            </Typography>

            <Typography
              sx={{
                mt: 0.4,
                color: "#AFAFAF"
              }}
            >
              Resume compatibility and keyword analysis.
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
            {score}%
          </Typography>

          <Typography
            color="#BDBDBD"
          >
            ATS Compatibility Score
          </Typography>

          <LinearProgress
            variant="determinate"
            value={score}
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
          direction="row"
          spacing={1}
          alignItems="center"
          mb={2}
        >
          <WarningAmberIcon
            sx={{
              color: "#FF7A00"
            }}
          />

          <Typography
            variant="h6"
            fontWeight="bold"
          >
            Missing Keywords
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
              (item, index) => (
                <Chip
                  key={`${item}-${index}`}
                  label={item}
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
                color: "#4ADE80"
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
          <TipsAndUpdatesIcon
            sx={{
              color: "#FF7A00"
            }}
          />

          <Typography
            variant="h6"
            fontWeight="bold"
          >
            ATS Suggestions
          </Typography>
        </Stack>

        {suggestions.length > 0 ? (
          <Stack spacing={1.5}>
            {suggestions.map(
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
            No additional ATS suggestions were returned.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default ATSCard;