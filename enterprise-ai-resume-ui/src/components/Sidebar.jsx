import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import HubIcon from "@mui/icons-material/Hub";
import SettingsIcon from "@mui/icons-material/Settings";


export const drawerWidth = 240;


const menus = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />
  },
  {
    text: "Resume",
    icon: <DescriptionIcon />
  },
  {
    text: "Analytics",
    icon: <AnalyticsIcon />
  },
  {
    text: "AI Workflow",
    icon: <HubIcon />
  },
  {
    text: "Settings",
    icon: <SettingsIcon />
  }
];


function DrawerContent({ onClose }) {
  return (
    <Box
      sx={{
        width: drawerWidth,
        height: "100%",
        background: "#171717",
        color: "#FFFFFF"
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            color: "#FF7A00"
          }}
        >
          Enterprise AI
        </Typography>
      </Toolbar>

      <List>
        {menus.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
          >
            <ListItemButton
              onClick={onClose}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 2,

                "&:hover": {
                  background: "#FF7A00"
                }
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#FFFFFF",
                  minWidth: 45
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}


function Sidebar({
  mobileOpen,
  onClose
}) {
  return (
    <>
      {/* MOBILE SIDEBAR */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: {
            xs: "block",
            md: "none"
          },

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#171717",
            borderRight: "1px solid #333"
          }
        }}
      >
        <DrawerContent
          onClose={onClose}
        />
      </Drawer>


      {/* DESKTOP SIDEBAR */}
      <Box
        component="nav"
        sx={{
          width: {
            md: drawerWidth
          },

          flexShrink: {
            md: 0
          },

          display: {
            xs: "none",
            md: "block"
          }
        }}
      >
        <Drawer
          variant="permanent"
          open
          sx={{
            display: {
              xs: "none",
              md: "block"
            },

            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              background: "#171717",
              color: "#FFFFFF",
              borderRight: "1px solid #333"
            }
          }}
        >
          <DrawerContent />
        </Drawer>
      </Box>
    </>
  );
}


export default Sidebar;