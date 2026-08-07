import {
  Box,
  Stack,
  Typography
} from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        px: {
          xs: 2,
          md: 3
        },
        py: 1.2,
        background: "#0D0D0D"
      }}
    >
      <Stack
        direction={{
          xs: "column",
          sm: "row"
        }}
        spacing={{
          xs: 0.5,
          sm: 2
        }}
        alignItems={{
          xs: "flex-start",
          sm: "center"
        }}
        justifyContent="space-between"
      >
        <Typography
          sx={{
            color: "#AFAFAF",
            fontSize: 12.5
          }}
        >
          © 2026 Enterprise{" "}
          <Box
            component="span"
            sx={{
              color: "#FF7A00",
              fontWeight: 700
            }}
          >
            AI Resume Generator
          </Box>
        </Typography>

        <Typography
          sx={{
            color: "#777777",
            fontSize: 12
          }}
        >
          AI-generated recommendations should be reviewed before use.
        </Typography>

        <Typography
          sx={{
            color: "#FF9A3C",
            fontSize: 12,
            fontWeight: 600
          }}
        >
          Agentic AI • LangGraph • FastAPI • React
        </Typography>
      </Stack>
    </Box>
  );
}

export default Footer;