import {
  Box,
  Typography,
  Button,
  Grid,
  Chip
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function HeroBanner() {
  const scrollToUpload = () => {
    const section = document.getElementById("resume-upload");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg,#101010 0%,#181818 58%,#202020 100%)",
        color: "#FFFFFF",
        borderBottom: "1px solid #FF7A00"
      }}
    >
      <Box
        sx={{
          maxWidth: 1500,
          mx: "auto",
          px: {
            xs: 3,
            sm: 4,
            md: 5
          },
          py: {
            xs: 5,
            md: 6
          }
        }}
      >
        <Grid
          container
          spacing={{
            xs: 4,
            md: 3
          }}
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            md={7}
          >
            <Box
              sx={{
                maxWidth: 720
              }}
            >
              <Chip
                icon={<SmartToyIcon />}
                label="Enterprise AI Powered"
                sx={{
                  mb: 2.5,
                  background: "#FF7A00",
                  color: "#FFFFFF",
                  fontWeight: "bold"
                }}
              />

              <Typography
                sx={{
                  fontSize: {
                    xs: "2.3rem",
                    sm: "2.8rem",
                    md: "3.5rem"
                  },
                  fontWeight: 800,
                  lineHeight: 1.1
                }}
              >
                Build ATS Optimized
                <br />

                <Box
                  component="span"
                  sx={{
                    color: "#FF7A00"
                  }}
                >
                  Professional Resumes
                </Box>

                <br />

                in Seconds
              </Typography>

              <Typography
                sx={{
                  mt: 2.5,
                  color: "#BDBDBD",
                  fontSize: {
                    xs: 15,
                    md: 17
                  },
                  maxWidth: 650,
                  lineHeight: 1.75
                }}
              >
                Upload your resume, paste a job description,
                and let specialized AI agents analyze your
                profile, improve your resume, calculate ATS
                compatibility, review content quality, match
                skills and generate a recruiter-ready resume.
              </Typography>

              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowDownwardIcon />}
                onClick={scrollToUpload}
                sx={{
                  mt: 3.5,
                  px: 4,
                  py: 1.4,
                  borderRadius: 3,
                  fontWeight: "bold",
                  background:
                    "linear-gradient(90deg,#FF7A00,#FF9A3C)",

                  "&:hover": {
                    background:
                      "linear-gradient(90deg,#FF9A3C,#FF7A00)"
                  }
                }}
              >
                Generate Resume
              </Button>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={5}
          >
            <Box
              sx={{
                maxWidth: 430,
                ml: {
                  md: 0
                },
                background: "#1E1E1E",
                borderRadius: 5,
                p: {
                  xs: 3,
                  md: 4.5
                },
                border: "1px solid #333333",
                boxShadow:
                  "0 18px 45px rgba(255,122,0,.15)"
              }}
            >
              <Box
                display="flex"
                justifyContent="center"
              >
                <AutoAwesomeIcon
                  sx={{
                    fontSize: 82,
                    color: "#FF7A00"
                  }}
                />
              </Box>

              <Typography
                align="center"
                variant="h5"
                fontWeight="bold"
                mt={2}
              >
                AI Resume Intelligence
              </Typography>

              <Typography
                align="center"
                sx={{
                  color: "#BDBDBD",
                  mt: 2,
                  lineHeight: 2,
                  fontSize: 15
                }}
              >
                ✓ Resume Parsing
                <br />
                ✓ ATS Optimization
                <br />
                ✓ Resume Review
                <br />
                ✓ Job Matching
                <br />
                ✓ AI Resume Generation
                <br />
                ✓ PDF Export
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default HeroBanner;