import {
  Avatar,
  Box,
  LinearProgress,
  Stack,
  Typography
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const icons = {
  resume_parser: <CloudUploadIcon />,
  profile_analyzer: <PersonSearchIcon />,
  ats_optimizer: <FactCheckIcon />,
  resume_writer: <EditDocumentIcon />,
  reviewer: <RateReviewIcon />,
  job_match: <PsychologyIcon />
};

function ProcessingLoader({
  workflowSteps,
  progress,
  errorMessage,
  timeline
}) {
  return (
    <Box
      sx={{
        mt: 5,
        p: {
          xs: 3,
          md: 4
        },
        borderRadius: 5,
        background: "#1E1E1E",
        border: "1px solid #333333",
        boxShadow: "0 15px 35px rgba(0,0,0,0.35)"
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        color="#FFFFFF"
      >
        AI Workflow Live Monitor
      </Typography>

      <Typography
        sx={{
          mt: 1,
          mb: 4,
          color: "#BDBDBD"
        }}
      >
        Real-time execution updates from the LangGraph
        multi-agent workflow.
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <Typography color="#DDDDDD">
            Overall progress
          </Typography>

          <Typography
            color="#FF9A3C"
            fontWeight="bold"
          >
            {progress}%
          </Typography>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 12,
            borderRadius: 6,
            backgroundColor: "#333333",

            "& .MuiLinearProgress-bar": {
              borderRadius: 6,
              background:
                "linear-gradient(90deg,#FF7A00,#FFB347)"
            }
          }}
        />
      </Box>

      <Stack spacing={2.5}>
        {workflowSteps.map((workflowStep) => {
          const isCompleted =
            workflowStep.status === "completed";

          const isActive =
            workflowStep.status === "active";

          const isFailed =
            workflowStep.status === "failed";

          let avatarColor = "#424242";
          let textColor = "#9E9E9E";
          let statusText = "Waiting";

          if (isCompleted) {
            avatarColor = "#22C55E";
            textColor = "#4ADE80";
            statusText = "Completed";
          }

          if (isActive) {
            avatarColor = "#FF7A00";
            textColor = "#FFFFFF";
            statusText = "Running";
          }

          if (isFailed) {
            avatarColor = "#EF4444";
            textColor = "#F87171";
            statusText = "Failed";
          }

          return (
            <Box
              key={workflowStep.id}
              sx={{
                p: 2.5,
                borderRadius: 3,
                background: isActive
                  ? "rgba(255,122,0,0.08)"
                  : "#252525",
                border: isActive
                  ? "1px solid rgba(255,122,0,0.55)"
                  : "1px solid #383838",
                transition: "all 0.3s ease"
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Avatar
                  sx={{
                    bgcolor: avatarColor,
                    color: "#FFFFFF",
                    width: 50,
                    height: 50
                  }}
                >
                  {icons[workflowStep.id]}
                </Avatar>

                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    sx={{
                      color: textColor,
                      fontWeight: isActive ? 700 : 600,
                      fontSize: 17
                    }}
                  >
                    {workflowStep.label}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.4,
                      color: "#9E9E9E",
                      fontSize: 14
                    }}
                  >
                    {statusText}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    color: textColor,
                    fontWeight: 700,
                    fontSize: 20
                  }}
                >
                  {isCompleted && "✓"}
                  {isActive && "●"}
                  {isFailed && "!"}
                  {workflowStep.status === "pending" && "○"}
                </Typography>
              </Stack>

              {isActive && (
                <LinearProgress
                  sx={{
                    mt: 2,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#333333",

                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                      background:
                        "linear-gradient(90deg,#FF7A00,#FFB347)"
                    }
                  }}
                />
              )}
            </Box>
          );
        })}
      </Stack>

      <Box
        sx={{
          mt: 5,
          p: 3,
          borderRadius: 4,
          background: "#171717",
          border: "1px solid #333333"
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          mb={3}
        >
          <AccessTimeIcon sx={{ color: "#FF7A00" }} />

          <Typography
            variant="h5"
            fontWeight="bold"
          >
            Execution Timeline
          </Typography>
        </Stack>

        {timeline.length === 0 ? (
          <Typography color="#9E9E9E">
            Waiting for workflow events...
          </Typography>
        ) : (
          <Stack spacing={2}>
            {timeline.map((event, index) => (
              <Box
                key={`${event.time}-${index}`}
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start"
                }}
              >
                <Typography
                  sx={{
                    minWidth: 85,
                    color: "#FF9A3C",
                    fontWeight: 600,
                    fontFamily: "monospace"
                  }}
                >
                  {event.time}
                </Typography>

                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    mt: 0.7,
                    borderRadius: "50%",
                    background:
                      event.type === "error"
                        ? "#EF4444"
                        : event.type === "completed"
                        ? "#22C55E"
                        : "#FF7A00",
                    flexShrink: 0
                  }}
                />

                <Typography
                  sx={{
                    color:
                      event.type === "error"
                        ? "#F87171"
                        : "#DDDDDD",
                    lineHeight: 1.6
                  }}
                >
                  {event.message}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </Box>

      {errorMessage && (
        <Box
          sx={{
            mt: 3,
            p: 2.5,
            borderRadius: 3,
            background: "rgba(239,68,68,0.12)",
            border: "1px solid rgba(239,68,68,0.5)"
          }}
        >
          <Typography
            color="#F87171"
            fontWeight="bold"
          >
            Workflow error
          </Typography>

          <Typography
            sx={{
              mt: 0.7,
              color: "#FCA5A5"
            }}
          >
            {errorMessage}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default ProcessingLoader;