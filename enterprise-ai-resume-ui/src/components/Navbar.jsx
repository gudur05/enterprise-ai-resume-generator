import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Chip
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";

function Navbar() {

  return (

    <AppBar
      position="static"
      sx={{
        background: "#111111",
        borderBottom: "2px solid #FF7A00",
        boxShadow: "0px 10px 30px rgba(255,122,0,.15)"
      }}
    >

      <Toolbar>

        <SmartToyIcon
          sx={{
            color: "#FF7A00",
            mr: 2,
            fontSize: 35
          }}
        />

        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontWeight: "bold"
          }}
        >
          Enterprise AI Resume Generator
        </Typography>

        <Chip
          label="AI Powered"
          sx={{
            mr: 2,
            background: "#FF7A00",
            color: "white",
            fontWeight: "bold"
          }}
        />

        <Avatar
          sx={{
            bgcolor: "#FF7A00"
          }}
        >
          D
        </Avatar>

      </Toolbar>

    </AppBar>

  );

}

export default Navbar;