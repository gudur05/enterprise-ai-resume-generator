import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip
} from "@mui/material";

import { PieChart } from "@mui/x-charts/PieChart";

function DashboardCard({
  title,
  value,
  color
}) {
  const numericValue = Number.parseInt(
    value,
    10
  );

  const isExperience =
    title.toLowerCase().includes(
      "experience"
    );

  let gaugeValue = 0;

  if (
    !Number.isNaN(numericValue)
  ) {
    if (isExperience) {
      /*
        Experience is not a percentage.

        We map years to a visual scale
        only for the circular indicator.

        10+ years = full ring.
      */
      gaugeValue = Math.min(
        (numericValue / 10) * 100,
        100
      );
    } else {
      gaugeValue = Math.min(
        Math.max(
          numericValue,
          0
        ),
        100
      );
    }
  }

  const getStatus = () => {
    if (isExperience) {
      if (numericValue >= 8) {
        return "Senior";
      }

      if (numericValue >= 4) {
        return "Experienced";
      }

      if (numericValue >= 2) {
        return "Intermediate";
      }

      return "Early Career";
    }

    if (numericValue >= 90) {
      return "Excellent";
    }

    if (numericValue >= 75) {
      return "Strong";
    }

    if (numericValue >= 60) {
      return "Good";
    }

    return "Needs Improvement";
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        minHeight: 235,
        height: "100%",
        background: "#1E1E1E",
        color: "#FFFFFF",
        borderRadius: 5,
        border:
          "1px solid #333333",
        boxShadow:
          "0 14px 30px rgba(0,0,0,0.32)",
        overflow: "hidden",
        transition:
          "all 0.3s ease",

        "&:hover": {
          transform:
            "translateY(-6px)",
          borderColor:
            "#FF7A00",
          boxShadow:
            "0 18px 36px rgba(255,122,0,0.20)"
        }
      }}
    >
      <CardContent
        sx={{
          width: "100%",
          height: "100%",
          p: 2.5,
          boxSizing:
            "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Typography
          align="center"
          sx={{
            color: "#BDBDBD",
            fontWeight: 700,
            fontSize: 16,
            mb: 0.5
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 155,
            display: "flex",
            justifyContent:
              "center",
            alignItems:
              "center",
            overflow: "hidden"
          }}
        >
          <PieChart
            width={160}
            height={160}
            series={[
              {
                innerRadius: 50,
                outerRadius: 68,
                data: [
                  {
                    value:
                      gaugeValue,
                    color
                  },
                  {
                    value:
                      100 -
                      gaugeValue,
                    color:
                      "#333333"
                  }
                ]
              }
            ]}
            slotProps={{
              legend: {
                hidden: true
              }
            }}
          />

          <Typography
            sx={{
              position:
                "absolute",
              color: "#FFFFFF",
              fontSize: {
                xs: 24,
                md: 28
              },
              fontWeight: 800,
              textAlign:
                "center"
            }}
          >
            {value}
          </Typography>
        </Box>

        <Chip
          label={getStatus()}
          size="small"
          sx={{
            mt: 0.5,
            background:
              "rgba(255,122,0,0.12)",
            color:
              "#FF9A3C",
            border:
              "1px solid rgba(255,122,0,0.28)",
            fontWeight: 700
          }}
        />
      </CardContent>
    </Card>
  );
}

export default DashboardCard;