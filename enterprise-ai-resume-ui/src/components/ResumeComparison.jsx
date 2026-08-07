import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  Divider,
  Grid
} from "@mui/material";

import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DescriptionIcon from "@mui/icons-material/Description";
import BuildIcon from "@mui/icons-material/Build";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function ResumeComparison({ result }) {
  if (!result) return null;

  const original = result.request ?? {};
  const optimized = result.resume_content ?? {};

  const originalSkills = Array.isArray(original.skills)
    ? original.skills
    : [];

  const optimizedSkills = Array.isArray(optimized.skills)
    ? optimized.skills
    : [];

  const originalProjects = Array.isArray(original.projects)
    ? original.projects
    : [];

  const optimizedProjects = Array.isArray(
    optimized.project_descriptions
  )
    ? optimized.project_descriptions
    : [];

  const optimizedExperience = Array.isArray(
    optimized.experience_bullets
  )
    ? optimized.experience_bullets
    : [];

  const normalizedOriginalSkills = originalSkills.map((skill) =>
    skill.toLowerCase().trim()
  );

  const addedSkills = optimizedSkills.filter(
    (skill) =>
      !normalizedOriginalSkills.includes(
        skill.toLowerCase().trim()
      )
  );

  const existingSkills = optimizedSkills.filter((skill) =>
    normalizedOriginalSkills.includes(
      skill.toLowerCase().trim()
    )
  );

  return (
    <Card
      sx={{
        mt: 5,
        borderRadius: 5,
        background: "#1E1E1E",
        color: "#FFFFFF",
        border: "1px solid #333333",
        boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
        overflow: "hidden"
      }}
    >
      <Box
        sx={{
          px: {
            xs: 3,
            md: 5
          },
          py: 4,
          background:
            "linear-gradient(135deg,#171717 0%,#242424 70%,#5A2B00 125%)",
          borderBottom: "1px solid #333333"
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <CompareArrowsIcon
            sx={{
              color: "#FF7A00",
              fontSize: 44
            }}
          />

          <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
            >
              Resume Comparison
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                color: "#BDBDBD"
              }}
            >
              Compare the original resume information with
              the AI-optimized resume.
            </Typography>
          </Box>
        </Stack>
      </Box>

      <CardContent
        sx={{
          p: {
            xs: 3,
            md: 5
          }
        }}
      >
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <Box
              sx={{
                height: "100%",
                p: 3,
                borderRadius: 4,
                background: "#252525",
                border: "1px solid #3A3A3A"
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                mb={1}
              >
                Original Resume
              </Typography>

              <Typography
                color="#AFAFAF"
                mb={3}
              >
                Information extracted from the uploaded file.
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                mb={2}
              >
                <DescriptionIcon
                  sx={{ color: "#FF7A00" }}
                />

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  Candidate Profile
                </Typography>
              </Stack>

              <Typography
                sx={{
                  color: "#DDDDDD",
                  mb: 1.2
                }}
              >
                <strong>Name:</strong>{" "}
                {original.name || "Not available"}
              </Typography>

              <Typography
                sx={{
                  color: "#DDDDDD",
                  mb: 1.2
                }}
              >
                <strong>Education:</strong>{" "}
                {original.education || "Not available"}
              </Typography>

              <Typography
                sx={{
                  color: "#DDDDDD",
                  mb: 3,
                  lineHeight: 1.7
                }}
              >
                <strong>Experience:</strong>{" "}
                {original.experience || "Not available"}
              </Typography>

              <Divider
                sx={{
                  borderColor: "#3A3A3A",
                  my: 3
                }}
              />

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                mb={2}
              >
                <BuildIcon sx={{ color: "#FF7A00" }} />

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  Original Skills
                </Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                flexWrap="wrap"
              >
                {originalSkills.length > 0 ? (
                  originalSkills.map((skill, index) => (
                    <Chip
                      key={`${skill}-${index}`}
                      label={skill}
                      sx={{
                        background: "#353535",
                        color: "#FFFFFF",
                        border: "1px solid #4A4A4A"
                      }}
                    />
                  ))
                ) : (
                  <Typography color="#AFAFAF">
                    No skills were extracted.
                  </Typography>
                )}
              </Stack>

              <Divider
                sx={{
                  borderColor: "#3A3A3A",
                  my: 3
                }}
              />

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                mb={2}
              >
                <BusinessCenterIcon
                  sx={{ color: "#FF7A00" }}
                />

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  Original Projects
                </Typography>
              </Stack>

              {originalProjects.length > 0 ? (
                originalProjects.map((project, index) => (
                  <Typography
                    key={`${project}-${index}`}
                    sx={{
                      color: "#DDDDDD",
                      mb: 1.2,
                      lineHeight: 1.7
                    }}
                  >
                    • {project}
                  </Typography>
                ))
              ) : (
                <Typography color="#AFAFAF">
                  No projects were extracted.
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
          >
            <Box
              sx={{
                height: "100%",
                p: 3,
                borderRadius: 4,
                background:
                  "linear-gradient(145deg,#252525,#2B2118)",
                border: "1px solid rgba(255,122,0,0.5)"
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                mb={1}
                color="#FF9A3C"
              >
                AI-Optimized Resume
              </Typography>

              <Typography
                color="#AFAFAF"
                mb={3}
              >
                Content rewritten and optimized using the AI
                agent workflow.
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                mb={2}
              >
                <DescriptionIcon
                  sx={{ color: "#FF7A00" }}
                />

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  Improved Summary
                </Typography>
              </Stack>

              <Typography
                sx={{
                  color: "#DDDDDD",
                  lineHeight: 1.8
                }}
              >
                {optimized.professional_summary ||
                  "No optimized summary available."}
              </Typography>

              <Divider
                sx={{
                  borderColor: "#4A3524",
                  my: 3
                }}
              />

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                mb={2}
              >
                <BuildIcon sx={{ color: "#FF7A00" }} />

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  Optimized Skills
                </Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                flexWrap="wrap"
                mb={3}
              >
                {existingSkills.map((skill, index) => (
                  <Chip
                    key={`existing-${skill}-${index}`}
                    label={skill}
                    icon={<CheckCircleIcon />}
                    sx={{
                      background: "rgba(34,197,94,0.16)",
                      color: "#4ADE80",
                      border:
                        "1px solid rgba(34,197,94,0.4)"
                    }}
                  />
                ))}

                {addedSkills.map((skill, index) => (
                  <Chip
                    key={`added-${skill}-${index}`}
                    label={`Added: ${skill}`}
                    sx={{
                      background:
                        "rgba(255,122,0,0.16)",
                      color: "#FF9A3C",
                      border:
                        "1px solid rgba(255,122,0,0.45)",
                      fontWeight: 600
                    }}
                  />
                ))}
              </Stack>

              {addedSkills.length > 0 && (
                <Typography
                  sx={{
                    color: "#FF9A3C",
                    fontSize: 14,
                    mb: 3
                  }}
                >
                  {addedSkills.length} new ATS-related skill
                  {addedSkills.length !== 1 ? "s were" : " was"}{" "}
                  included in the optimized output.
                </Typography>
              )}

              <Divider
                sx={{
                  borderColor: "#4A3524",
                  my: 3
                }}
              />

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                mb={2}
              >
                <BusinessCenterIcon
                  sx={{ color: "#FF7A00" }}
                />

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  Rewritten Experience
                </Typography>
              </Stack>

              {optimizedExperience.length > 0 ? (
                optimizedExperience.map((item, index) => (
                  <Typography
                    key={`${item}-${index}`}
                    sx={{
                      color: "#DDDDDD",
                      mb: 1.3,
                      lineHeight: 1.7
                    }}
                  >
                    • {item}
                  </Typography>
                ))
              ) : (
                <Typography color="#AFAFAF">
                  No optimized experience was returned.
                </Typography>
              )}

              <Divider
                sx={{
                  borderColor: "#4A3524",
                  my: 3
                }}
              />

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                mb={2}
              >
                <BusinessCenterIcon
                  sx={{ color: "#FF7A00" }}
                />

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  Improved Projects
                </Typography>
              </Stack>

              {optimizedProjects.length > 0 ? (
                optimizedProjects.map((project, index) => (
                  <Typography
                    key={`${project}-${index}`}
                    sx={{
                      color: "#DDDDDD",
                      mb: 1.3,
                      lineHeight: 1.7
                    }}
                  >
                    • {project}
                  </Typography>
                ))
              ) : (
                <Typography color="#AFAFAF">
                  No optimized project descriptions were
                  returned.
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ResumeComparison;