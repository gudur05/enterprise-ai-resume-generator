import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  Stack,
  Chip,
  Button,
  Paper
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import PersonIcon from "@mui/icons-material/Person";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import BuildIcon from "@mui/icons-material/Build";
import FolderIcon from "@mui/icons-material/Folder";
import SchoolIcon from "@mui/icons-material/School";

import api from "../api/api";

function ResumePreview({ result }) {

  if (!result) return null;

  const resume = result.resume_content;
  const request = result.request;

  const downloadResume = async () => {

    try {

      const response = await api.post(
        "/download-resume",
        result,
        {
          responseType: "blob"
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = "AI_Generated_Resume.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.detail ||
        "Unable to download resume."
      );

    }

  };

  return (

    <Card
      sx={{
        mt: 5,
        borderRadius: 5,
        background: "#1B1B1B",
        border: "1px solid #333",
        boxShadow: "0 18px 40px rgba(0,0,0,.35)"
      }}
    >

      <CardContent sx={{ p: 4 }}>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >

            <DescriptionIcon
              sx={{
                fontSize: 42,
                color: "#FF7A00"
              }}
            />

            <Box>

              <Typography
                variant="h4"
                fontWeight="bold"
                color="white"
              >
                Resume Preview
              </Typography>

              <Typography
                color="#BDBDBD"
              >
                Recruiter Ready Resume
              </Typography>

            </Box>

          </Stack>

          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={downloadResume}
            sx={{
              background:
                "linear-gradient(90deg,#FF7A00,#FF9A3C)",
              fontWeight: "bold",
              px: 3,
              py: 1.3,
              borderRadius: 3,

              "&:hover": {
                background:
                  "linear-gradient(90deg,#FF9A3C,#FF7A00)"
              }
            }}
          >
            Download PDF
          </Button>

        </Stack>

        <Divider
          sx={{
            my: 4,
            borderColor: "#333"
          }}
        />

        <Paper
          elevation={6}
          sx={{
            background: "#FFFFFF",
            borderRadius: 3,
            p: 5
          }}
        >

          <Typography
            align="center"
            variant="h3"
            fontWeight="bold"
            color="#222"
          >
            {request?.name}
          </Typography>

          <Typography
            align="center"
            sx={{
              mt: 1,
              color: "#666",
              fontSize: 17
            }}
          >
            {request?.education}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            mb={2}
          >

            <PersonIcon color="warning" />

            <Typography
              variant="h5"
              fontWeight="bold"
              color="#222"
            >
              Professional Summary
            </Typography>

          </Stack>

          <Typography
            sx={{
              color: "#444",
              lineHeight: 1.9
            }}
          >
            {resume.professional_summary}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            mb={2}
          >

            <BusinessCenterIcon color="warning" />

            <Typography
              variant="h5"
              fontWeight="bold"
              color="#222"
            >
              Professional Experience
            </Typography>

          </Stack>

          {resume.experience_bullets?.map((item, index) => (

            <Typography
              key={index}
              sx={{
                color: "#444",
                mb: 1.4,
                lineHeight: 1.8
              }}
            >
              • {item}
            </Typography>

          ))}

          <Divider sx={{ my: 4 }} />

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            mb={2}
          >

            <BuildIcon color="warning" />

            <Typography
              variant="h5"
              fontWeight="bold"
              color="#222"
            >
              Technical Skills
            </Typography>

          </Stack>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1
            }}
          >

            {resume.skills?.map((skill, index) => (

              <Chip
                key={index}
                label={skill}
                sx={{
                  background: "#FFF3E6",
                  color: "#FF7A00",
                  fontWeight: "bold"
                }}
              />

            ))}

          </Box>

          <Divider sx={{ my: 4 }} />
                      <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            mb={2}
          >

            <FolderIcon color="warning" />

            <Typography
              variant="h5"
              fontWeight="bold"
              color="#222"
            >
              Projects
            </Typography>

          </Stack>

          {resume.project_descriptions?.map((project, index) => (

            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 2,
                mb: 2,
                background: "#FAFAFA",
                borderLeft: "5px solid #FF7A00"
              }}
            >

              <Typography
                sx={{
                  color: "#444",
                  lineHeight: 1.8
                }}
              >
                {project}
              </Typography>

            </Paper>

          ))}

          <Divider sx={{ my: 4 }} />

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            mb={2}
          >

            <SchoolIcon color="warning" />

            <Typography
              variant="h5"
              fontWeight="bold"
              color="#222"
            >
              Education
            </Typography>

          </Stack>

          <Typography
            sx={{
              color: "#444",
              lineHeight: 1.8
            }}
          >
            {request?.education}
          </Typography>

          {request?.certifications?.length > 0 && (

            <>

              <Divider sx={{ my: 4 }} />

              <Typography
                variant="h5"
                fontWeight="bold"
                color="#222"
                gutterBottom
              >
                Certifications
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1
                }}
              >

                {request.certifications.map((cert, index) => (

                  <Chip
                    key={index}
                    label={cert}
                    sx={{
                      background: "#E8F5E9",
                      color: "#2E7D32",
                      fontWeight: "bold"
                    }}
                  />

                ))}

              </Box>

            </>

          )}

        </Paper>

      </CardContent>

    </Card>

  );

}

export default ResumePreview;