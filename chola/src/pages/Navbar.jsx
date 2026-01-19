// Navbar.jsx
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

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
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Box>
          <img
            src="/cholabiz_logo.jpeg"
            alt="Chola Biz Logo"
            style={{ width: 120, height: "auto", objectFit: "contain" }}
          />
        </Box>

        {/* Links + Auth Buttons */}
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
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

          {/* Auth Buttons */}
          <Button
            variant="outlined"
            size="small"
            sx={{
              ml: 2,
              borderColor: "#ff7a45",
              color: "#ff7a45",
              textTransform: "none",
              "&:hover": {
                borderColor: "#ff7a45",
                background: "rgba(255,122,69,0.08)",
              },
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{
              background: "#ff7a45",
              textTransform: "none",
              "&:hover": { background: "#e96a3c" },
            }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
