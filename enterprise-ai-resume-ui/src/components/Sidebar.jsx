import {
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

const drawerWidth = 240;

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

function Sidebar() {

  return (

    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,

        "& .MuiDrawer-paper": {

          width: drawerWidth,

          background: "#171717",

          color: "#FFFFFF",

          borderRight: "1px solid #333"

        }

      }}
    >

      <Toolbar>

        <Typography
          variant="h6"
          fontWeight="bold"
          color="#FF7A00"
        >

          Enterprise AI

        </Typography>

      </Toolbar>

      <List>

        {menus.map((item) => (

          <ListItem
            disablePadding
            key={item.text}
          >

            <ListItemButton
              sx={{
                mx: 1,
                my: .5,
                borderRadius: 2,

                transition: ".3s",

                "&:hover": {

                  background: "#FF7A00"

                }

              }}
            >

              <ListItemIcon
                sx={{
                  color: "#FFFFFF"
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

    </Drawer>

  );

}

export default Sidebar;