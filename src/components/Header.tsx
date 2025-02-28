import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import ViewListIcon from "@mui/icons-material/ViewList";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import SearchIcon from "@mui/icons-material/Search";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const navigationItems = [
    { label: "Home", path: "/", icon: <HomeIcon /> }, // ✅ Updated to path `/`
    {
      label: "Scientific Articles",
      href: "#articles",
      icon: <NewspaperIcon />,
    },
    { label: "Features", href: "#features", icon: <FeaturedPlayListIcon /> },
    { label: "Application View", href: "#app-view", icon: <ViewListIcon /> },
    {
      label: "Medical Records",
      href: "#medical-records",
      icon: <MedicalServicesIcon />,
    },
    { label: "AI for Oncology", href: "#ai", icon: <SearchIcon /> },
    { label: "Contact", href: "#contact", icon: <ContactMailIcon /> },
  ];

  const drawer = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "#f5f5f5",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navigationItems.map((item, index) => (
          <ListItemButton
            key={index}
            onClick={() =>
              item.path
                ? navigate(item.path)
                : (window.location.href = item.href!)
            }
            sx={{
              color: "#333",
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
                color: "#fff",
              },
              padding: "10px 20px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {item.icon && <Box sx={{ mr: 2 }}>{item.icon}</Box>}
              <ListItemText primary={item.label} />
            </Box>
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Divider />
        <Typography variant="body2" sx={{ mt: 2 }}>
          © 2024 E-OncoHub
        </Typography>
      </Box>
    </Box>
  );

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography
          variant="h6"
          color="primary"
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer" }}
        >
          E-OncoHub
        </Typography>

        {/* Navigation for larger screens */}
        {!isMobile && (
          <Box sx={{ display: "flex", gap: "20px" }}>
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                onClick={() =>
                  item.path
                    ? navigate(item.path)
                    : (window.location.href = item.href!)
                }
                color="inherit"
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Log In Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/login")}
        >
          Log In
        </Button>

        {/* Menu icon for smaller screens */}
        {isMobile && (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Drawer for mobile navigation */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
