import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";

function Header() {

  return (

    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "#1A1A1A",
        color: "#FFFFFF",
        borderBottom: "1px solid #333"
      }}
    >

      <Toolbar>

        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontWeight: "bold"
          }}
        >

          🤖 Enterprise AI Resume Generator

        </Typography>

        <IconButton sx={{ color: "#FF7A00" }}>

          <NotificationsIcon />

        </IconButton>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            ml: 2
          }}
        >

          <Avatar
            sx={{
              bgcolor: "#FF7A00"
            }}
          >
            D
          </Avatar>

          <Typography>

            Divya

          </Typography>

        </Box>

      </Toolbar>

    </AppBar>

  );

}

export default Header;