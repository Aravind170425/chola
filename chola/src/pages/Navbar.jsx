import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export function Navbar() {
  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#ff7a45" : "#333",
    fontWeight: 500,
    borderBottom: isActive ? "2px solid #ff7a45" : "none",
    paddingBottom: 4,
  });

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ background: "#fff", borderBottom: "1px solid #eee" }}
    >
      <Toolbar
        sx={{
          maxWidth: 1200,
          mx: "auto",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <img
            src="/cholabiz_logo.jpeg"
            alt="Chola Biz Logo"
            style={{ width: 120, height: "auto", objectFit: "contain" }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 3 }}>
          <NavLink to="/" end style={linkStyle}>
            Home
          </NavLink>
          <NavLink to="/about" style={linkStyle}>
            About
          </NavLink>
          <NavLink to="/privacy-policy" style={linkStyle}>
            Privacy Policy
          </NavLink>
          <NavLink to="/terms-and-services" style={linkStyle}>
            Terms And Services
          </NavLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
