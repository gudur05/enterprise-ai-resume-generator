import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";

function Header({
  onMenuClick
}) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: 1200,
        background: "#1A1A1A",
        color: "#FFFFFF",
        borderBottom: "1px solid #333"
      }}
    >
      <Toolbar
        sx={{
          minHeight: {
            xs: 60,
            md: 64
          },

          px: {
            xs: 1.5,
            sm: 2,
            md: 3
          }
        }}
      >
        {/* MOBILE MENU BUTTON */}

        <IconButton
          onClick={onMenuClick}
          sx={{
            display: {
              xs: "flex",
              md: "none"
            },

            color: "#FF7A00",
            mr: 1
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* TITLE */}

        <Typography
          sx={{
            flexGrow: 1,

            fontWeight: 800,

            fontSize: {
              xs: 15,
              sm: 18,
              md: 22
            },

            whiteSpace: {
              xs: "normal",
              sm: "nowrap"
            },

            lineHeight: 1.2
          }}
        >
          <Box
            component="span"
            sx={{
              display: {
                xs: "none",
                sm: "inline"
              }
            }}
          >
            🤖{" "}
          </Box>

          Enterprise AI Resume Generator
        </Typography>

        {/* NOTIFICATION */}

        <IconButton
          sx={{
            color: "#FF7A00",

            display: {
              xs: "none",
              sm: "flex"
            }
          }}
        >
          <NotificationsIcon />
        </IconButton>

        {/* USER */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",

            gap: {
              xs: 0,
              sm: 1
            },

            ml: {
              xs: 0.5,
              sm: 1.5
            }
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#FF7A00",

              width: {
                xs: 34,
                md: 40
              },

              height: {
                xs: 34,
                md: 40
              },

              fontSize: {
                xs: 14,
                md: 17
              }
            }}
          >
            D
          </Avatar>

          <Typography
            sx={{
              display: {
                xs: "none",
                sm: "block"
              }
            }}
          >
            Divya
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;