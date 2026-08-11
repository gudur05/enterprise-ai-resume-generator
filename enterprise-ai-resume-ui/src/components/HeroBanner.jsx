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
    const section =
      document.getElementById(
        "resume-upload"
      );

    if (section) {
      section.scrollIntoView({
        behavior: "smooth"
      });
    }
  };


  return (
    <Box
      sx={{
        width: "100%",

        background:
          "linear-gradient(135deg,#101010 0%,#181818 58%,#202020 100%)",

        color: "#FFFFFF",

        borderBottom:
          "1px solid #FF7A00",

        overflowX: "hidden"
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1500,
          mx: "auto",

          px: {
            xs: 2,
            sm: 3,
            md: 5
          },

          py: {
            xs: 4,
            sm: 5,
            md: 6
          },

          boxSizing: "border-box"
        }}
      >
        <Grid
          container
          spacing={{
            xs: 4,
            md: 5
          }}
          alignItems="center"
        >
          {/* LEFT */}

          <Grid
            item
            xs={12}
            md={7}
          >
            <Box
              sx={{
                maxWidth: 720,

                textAlign: {
                  xs: "center",
                  md: "left"
                },

                mx: {
                  xs: "auto",
                  md: 0
                }
              }}
            >
              <Chip
                icon={
                  <SmartToyIcon />
                }
                label="Enterprise AI Powered"
                sx={{
                  mb: {
                    xs: 2,
                    md: 2.5
                  },

                  background:
                    "#FF7A00",

                  color:
                    "#FFFFFF",

                  fontWeight:
                    "bold",

                  fontSize: {
                    xs: 12,
                    sm: 13
                  }
                }}
              />

              <Typography
                component="h1"
                sx={{
                  fontSize: {
                    xs: "2rem",
                    sm: "2.6rem",
                    md: "3.5rem"
                  },

                  fontWeight: 800,

                  lineHeight: {
                    xs: 1.15,
                    md: 1.1
                  },

                  overflowWrap:
                    "anywhere"
                }}
              >
                Build ATS Optimized

                <br />

                <Box
                  component="span"
                  sx={{
                    color:
                      "#FF7A00"
                  }}
                >
                  Professional Resumes
                </Box>

                <br />

                in Seconds
              </Typography>


              <Typography
                sx={{
                  mt: {
                    xs: 2,
                    md: 2.5
                  },

                  color:
                    "#BDBDBD",

                  fontSize: {
                    xs: 14,
                    sm: 15,
                    md: 17
                  },

                  maxWidth:
                    650,

                  mx: {
                    xs: "auto",
                    md: 0
                  },

                  lineHeight: {
                    xs: 1.65,
                    md: 1.75
                  }
                }}
              >
                Upload your resume, paste a job
                description, and let specialized
                AI agents analyze your profile,
                improve your resume, calculate ATS
                compatibility, review content quality,
                match skills and generate a
                recruiter-ready resume.
              </Typography>


              <Button
                variant="contained"
                size="large"
                endIcon={
                  <ArrowDownwardIcon />
                }
                onClick={
                  scrollToUpload
                }
                sx={{
                  mt: {
                    xs: 3,
                    md: 3.5
                  },

                  width: {
                    xs: "100%",
                    sm: "auto"
                  },

                  maxWidth: {
                    xs: 320,
                    sm: "none"
                  },

                  px: {
                    xs: 3,
                    md: 4
                  },

                  py: 1.4,

                  borderRadius: 3,

                  fontWeight:
                    "bold",

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


          {/* RIGHT */}

          <Grid
            item
            xs={12}
            md={5}
          >
            <Box
              sx={{
                width: "100%",

                maxWidth: {
                  xs: 420,
                  md: 430
                },

                mx: {
                  xs: "auto",
                  md: 0
                },

                background:
                  "#1E1E1E",

                borderRadius: {
                  xs: 4,
                  md: 5
                },

                p: {
                  xs: 2.5,
                  sm: 3,
                  md: 4.5
                },

                border:
                  "1px solid #333333",

                boxShadow:
                  "0 18px 45px rgba(255,122,0,.15)",

                boxSizing:
                  "border-box"
              }}
            >
              <Box
                display="flex"
                justifyContent="center"
              >
                <AutoAwesomeIcon
                  sx={{
                    fontSize: {
                      xs: 58,
                      sm: 70,
                      md: 82
                    },

                    color:
                      "#FF7A00"
                  }}
                />
              </Box>


              <Typography
                align="center"
                fontWeight="bold"
                sx={{
                  mt: 2,

                  fontSize: {
                    xs: 20,
                    sm: 23,
                    md: 24
                  }
                }}
              >
                AI Resume Intelligence
              </Typography>


              <Typography
                align="center"
                sx={{
                  color:
                    "#BDBDBD",

                  mt: 2,

                  lineHeight: {
                    xs: 1.8,
                    md: 2
                  },

                  fontSize: {
                    xs: 14,
                    md: 15
                  }
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