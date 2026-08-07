import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography
} from "@mui/material";

import AssessmentIcon from "@mui/icons-material/Assessment";
import DownloadIcon from "@mui/icons-material/Download";

import api from "../api/api";

function AnalysisReportDownload({ result }) {
  const [downloading, setDownloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!result) {
    return null;
  }

  const downloadAnalysisReport = async () => {
    setDownloading(true);
    setErrorMessage("");

    try {
      const response = await api.post(
        "/download-analysis-report",
        result,
        {
          responseType: "blob"
        }
      );

      const contentType =
        response.headers["content-type"] ||
        "application/pdf";

      const fileBlob = new Blob(
        [response.data],
        {
          type: contentType
        }
      );

      const fileUrl =
        window.URL.createObjectURL(fileBlob);

      const link = document.createElement("a");

      link.href = fileUrl;
      link.download =
        "AI_Resume_Analysis_Report.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(fileUrl);
    } catch (error) {
      console.error(error);

      let message =
        "Unable to download the AI analysis report.";

      if (
        error.response?.data instanceof Blob
      ) {
        try {
          const errorText =
            await error.response.data.text();

          const parsedError =
            JSON.parse(errorText);

          message =
            parsedError.detail || message;
        } catch {
          // Keep the default message.
        }
      } else if (error.response?.data?.detail) {
        message =
          error.response.data.detail;
      }

      setErrorMessage(message);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Card
      sx={{
        mt: 5,
        borderRadius: 5,
        background:
          "linear-gradient(145deg,#1E1E1E,#251C15)",
        color: "#FFFFFF",
        border:
          "1px solid rgba(255,122,0,0.45)",
        boxShadow:
          "0 18px 40px rgba(0,0,0,0.35)"
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
          direction={{
            xs: "column",
            md: "row"
          }}
          spacing={3}
          alignItems={{
            xs: "flex-start",
            md: "center"
          }}
          justifyContent="space-between"
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Box
              sx={{
                width: 58,
                height: 58,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#FF7A00",
                boxShadow:
                  "0 10px 25px rgba(255,122,0,0.28)"
              }}
            >
              <AssessmentIcon
                sx={{
                  fontSize: 34,
                  color: "#FFFFFF"
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="h5"
                fontWeight="bold"
              >
                AI Resume Analysis Report
              </Typography>

              <Typography
                sx={{
                  mt: 0.7,
                  color: "#BDBDBD",
                  maxWidth: 700,
                  lineHeight: 1.7
                }}
              >
                Download a candidate-facing PDF containing
                ATS results, job-match insights, review
                scores, strengths, missing skills, and
                prioritized recommendations.
              </Typography>
            </Box>
          </Stack>

          <Button
            variant="contained"
            size="large"
            startIcon={<DownloadIcon />}
            disabled={downloading}
            onClick={downloadAnalysisReport}
            sx={{
              minWidth: 230,
              minHeight: 52,
              borderRadius: 3,
              background:
                "linear-gradient(90deg,#FF7A00,#FF9F43)",
              color: "#FFFFFF",
              fontWeight: 700,

              "&:hover": {
                background:
                  "linear-gradient(90deg,#FF9F43,#FFB866)"
              }
            }}
          >
            {downloading
              ? "Preparing Report..."
              : "Download AI Report"}
          </Button>
        </Stack>

        {errorMessage && (
          <Alert
            severity="error"
            sx={{
              mt: 3
            }}
          >
            {errorMessage}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default AnalysisReportDownload;