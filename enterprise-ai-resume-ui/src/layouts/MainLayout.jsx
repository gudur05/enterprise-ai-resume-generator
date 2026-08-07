import { Box } from "@mui/material";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        background: "#121212",
        overflow: "hidden"
      }}
    >
      {/* STATIC LEFT SIDEBAR */}
      <Box
        sx={{
          flexShrink: 0,
          height: "100vh",
          overflow: "hidden",
          borderRight: "1px solid #2A2A2A"
        }}
      >
        <Sidebar />
      </Box>

      {/* RIGHT APPLICATION AREA */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "#121212",
          overflow: "hidden"
        }}
      >
        {/* STATIC TOP HEADER */}
        <Box
          component="header"
          sx={{
            flexShrink: 0,
            zIndex: 1200,
            background: "#171717",
            borderBottom: "1px solid #2D2D2D"
          }}
        >
          <Header />
        </Box>

        {/* ONLY THIS AREA SCROLLS */}
        <Box
          component="main"
          sx={{
            flex: 1,
            minHeight: 0,
            width: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            background: "#121212",
            scrollBehavior: "smooth"
          }}
        >
          {children}
        </Box>

        {/* STATIC BOTTOM FOOTER */}
        <Box
          component="footer"
          sx={{
            flexShrink: 0,
            zIndex: 1200,
            background: "#0D0D0D",
            borderTop: "1px solid #2D2D2D"
          }}
        >
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;