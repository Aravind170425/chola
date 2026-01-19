// pages/DashboardSidebar.jsx
import { Box, Typography, List, ListItemButton, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";

export function DashboardSidebar() {
  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#ff7a45" : "#333",
    fontWeight: isActive ? 600 : 500,
  });

  return (
    <Box
      sx={{
        width: 240,
        background: "#ffffff",
        borderRight: "1px solid #eaeaea",
        p: 2,
      }}
    >
      {/* Logo */}
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <img
          src="/cholabiz_logo.jpeg"
          alt="Chola Biz Logo"
          style={{ width: 140, height: "auto", objectFit: "contain" }}
        />
      </Box>

      <Typography sx={{ fontSize: 12, color: "#777", mb: 1 }}>
        MAIN MENU
      </Typography>

      <List disablePadding>
        <NavLink to="/dashboard" end style={linkStyle}>
          <ListItemButton>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </NavLink>

        <NavLink to="/dashboard/whatsapp" style={linkStyle}>
          <ListItemButton>
            <ListItemText primary="WhatsApp Bulk Sender" />
          </ListItemButton>
        </NavLink>
      </List>
    </Box>
  );
}
