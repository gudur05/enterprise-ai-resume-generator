import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Stack,
  Box,
  Divider
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";


function JobMatchCard({ match }) {
  if (!match) return null;

  const score = Math.min(
    100,
    Math.max(
      0,
      Number(match.match_score ?? 0)
    )
  );

  const matchingSkills =
    Array.isArray(
      match.matching_skills
    )
      ? match.matching_skills
      : [];

  const missingSkills =
    Array.isArray(
      match.missing_skills
    )
      ? match.missing_skills
      : [];

  const recommendations =
    Array.isArray(
      match.recommendations
    )
      ? match.recommendations
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
          <WorkIcon
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
              Job Match Analysis
            </Typography>

            <Typography
              sx={{
                mt: 0.4,
                color: "#AFAFAF"
              }}
            >
              Skill compatibility with the target job description.
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
            Overall Job Compatibility
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
          <CheckCircleIcon
            sx={{
              color: "#22C55E"
            }}
          />

          <Typography
            variant="h6"
            fontWeight="bold"
          >
            Matching Skills
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
          mb={4}
        >
          {matchingSkills.length > 0 ? (
            matchingSkills.map(
              (skill, index) => (
                <Chip
                  key={`${skill}-${index}`}
                  label={skill}
                  sx={{
                    background:
                      "rgba(34,197,94,0.14)",
                    color: "#4ADE80",
                    border:
                      "1px solid rgba(34,197,94,0.34)",
                    fontWeight: 600
                  }}
                />
              )
            )
          ) : (
            <Typography color="#AFAFAF">
              No matching skills were returned.
            </Typography>
          )}
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          mb={2}
        >
          <CancelIcon
            sx={{
              color: "#F87171"
            }}
          />

          <Typography
            variant="h6"
            fontWeight="bold"
          >
            Missing Skills
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
          mb={4}
        >
          {missingSkills.length > 0 ? (
            missingSkills.map(
              (skill, index) => (
                <Chip
                  key={`${skill}-${index}`}
                  label={skill}
                  sx={{
                    background:
                      "rgba(239,68,68,0.14)",
                    color: "#F87171",
                    border:
                      "1px solid rgba(239,68,68,0.34)",
                    fontWeight: 600
                  }}
                />
              )
            )
          ) : (
            <Chip
              icon={<CheckCircleIcon />}
              label="No major skills missing"
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
            Job Match Recommendations
          </Typography>
        </Stack>

        {recommendations.length > 0 ? (
          <Stack spacing={1.5}>
            {recommendations.map(
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
            No additional job-match recommendations were returned.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default JobMatchCard;