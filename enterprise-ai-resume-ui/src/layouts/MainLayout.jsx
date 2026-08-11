import { useState } from "react";

import {
  Box
} from "@mui/material";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";


function MainLayout({ children }) {
  const [
    mobileOpen,
    setMobileOpen
  ] = useState(false);


  const handleMenuClick = () => {
    setMobileOpen(true);
  };


  const handleDrawerClose = () => {
    setMobileOpen(false);
  };


  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#121212"
      }}
    >
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={handleDrawerClose}
      />


      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0,

          width: {
            xs: "100%",
            md: "calc(100% - 240px)"
          }
        }}
      >
        <Header
          onMenuClick={handleMenuClick}
        />


        <Box
          component="main"
          sx={{
            width: "100%",
            maxWidth: "100vw",
            overflowX: "hidden",
            boxSizing: "border-box"
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}


export default MainLayout;