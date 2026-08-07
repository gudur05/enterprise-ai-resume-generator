import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#FF7A00",
    },

    secondary: {
      main: "#FF9F43",
    },

    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },

    text: {
      primary: "#FFFFFF",
      secondary: "#BDBDBD",
    },

    success: {
      main: "#22C55E",
    },

    warning: {
      main: "#FACC15",
    },

    error: {
      main: "#EF4444",
    },
  },

  typography: {
    fontFamily: "'Poppins', 'Roboto', sans-serif",

    h3: {
      fontWeight: 700,
    },

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },

    h6: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E1E1E",
          border: "1px solid #333",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: "linear-gradient(90deg,#FF7A00,#FF9F43)",
          color: "#fff",
        },
      },
    },
  },
});

export default theme;