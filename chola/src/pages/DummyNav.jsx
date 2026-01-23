// Navbar.jsx
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider,
  IconButton,
  Badge,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Person,
  Settings,
  ExitToApp,
  Notifications,
  Dashboard,
  Business,
  AccountBalanceWallet,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";

export function DummyNav() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isNotificationOpen = Boolean(notificationAnchorEl);

  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#ff7a45" : "#333",
    fontWeight: 500,
    borderBottom: isActive ? "2px solid #ff7a45" : "none",
    paddingBottom: 4,
  });

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    // Add logout logic here
    handleMenuClose();
    navigate("/login");
  };

  const notifications = [
    { id: 1, text: "New order received", time: "5 min ago" },
    { id: 2, text: "Payment confirmed", time: "1 hour ago" },
    { id: 3, text: "New message from support", time: "2 hours ago" },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "#fff",
        borderBottom: "1px solid #eee",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1400,
          mx: "auto",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1,
        }}
      >
        {/* Logo Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img
            src="/cholabiz_logo.jpeg"
            alt="Chola Biz Logo"
            style={{
              width: 140,
              height: "auto",
              objectFit: "contain",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />

          {/* Navigation Links - Only show on larger screens */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, ml: 4 }}>
            <NavLink to="/" end style={linkStyle}>
              Home
            </NavLink>
            <NavLink to="/dashboard" style={linkStyle}>
              Dashboard
            </NavLink>
            <NavLink to="/business" style={linkStyle}>
              My Business
            </NavLink>
            <NavLink to="/transactions" style={linkStyle}>
              Transactions
            </NavLink>
            <NavLink to="/reports" style={linkStyle}>
              Reports
            </NavLink>
          </Box>
        </Box>

        {/* Right Section - User Info & Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {/* Notification Bell */}
          <IconButton
            size="small"
            sx={{
              color: "#666",
              "&:hover": {
                color: "#ff7a45",
                background: "rgba(255,122,69,0.08)",
              },
            }}
            onClick={handleNotificationMenuOpen}
          >
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* Wallet Balance */}

          {/* User Profile Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              p: 1,
              borderRadius: 3,
              cursor: "pointer",
              "&:hover": {
                background: "rgba(255,122,69,0.08)",
              },
            }}
            onClick={handleProfileMenuOpen}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#ff7a45",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              M
            </Avatar>

            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Typography variant="body2" fontWeight={600} color="#333">
                MR FRANCHISE 
              </Typography>
            </Box>

            {isMenuOpen ? (
              <ExpandLess sx={{ color: "#666" }} />
            ) : (
              <ExpandMore sx={{ color: "#666" }} />
            )}
          </Box>
        </Box>

        {/* Profile Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 220,
              borderRadius: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {/* Profile Header */}
          <Box sx={{ p: 2, pb: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              MR franchise
            </Typography>
            <Typography variant="caption" color="#666">
              mr.franchise@example.com
            </Typography>
          </Box>

          <Divider />

          {/* Menu Items */}
          <MenuItem
            onClick={() => {
              navigate("/dashboard");
              handleMenuClose();
            }}
            sx={{ py: 1.5 }}
          >
            <Dashboard sx={{ mr: 2, fontSize: 20, color: "#666" }} />
            <Typography variant="body2">Dashboard</Typography>
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate("/profile");
              handleMenuClose();
            }}
            sx={{ py: 1.5 }}
          >
            <Person sx={{ mr: 2, fontSize: 20, color: "#666" }} />
            <Typography variant="body2">My Profile</Typography>
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate("/business");
              handleMenuClose();
            }}
            sx={{ py: 1.5 }}
          >
            <Business sx={{ mr: 2, fontSize: 20, color: "#666" }} />
            <Typography variant="body2">Business Settings</Typography>
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate("/settings");
              handleMenuClose();
            }}
            sx={{ py: 1.5 }}
          >
            <Settings sx={{ mr: 2, fontSize: 20, color: "#666" }} />
            <Typography variant="body2">Settings</Typography>
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
            <ExitToApp sx={{ mr: 2, fontSize: 20, color: "#ff6b6b" }} />
            <Typography variant="body2" color="#ff6b6b">
              Logout
            </Typography>
          </MenuItem>
        </Menu>

        {/* Notifications Dropdown Menu */}
        <Menu
          anchorEl={notificationAnchorEl}
          open={isNotificationOpen}
          onClose={handleNotificationClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              width: 320,
              borderRadius: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            },
          }}
        >
          <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
            <Typography variant="subtitle1" fontWeight={600}>
              Notifications
            </Typography>
            <Typography variant="caption" color="#666">
              You have {notifications.length} new notifications
            </Typography>
          </Box>

          {notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              sx={{
                py: 1.5,
                borderBottom: "1px solid #f5f5f5",
                "&:hover": { background: "#fff9f5" },
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2">{notification.text}</Typography>
                <Typography variant="caption" color="#666">
                  {notification.time}
                </Typography>
              </Box>
            </MenuItem>
          ))}

          <MenuItem
            onClick={() => {
              navigate("/notifications");
              handleNotificationClose();
            }}
            sx={{
              py: 1.5,
              justifyContent: "center",
              color: "#ff7a45",
              fontWeight: 500,
            }}
          >
            View All Notifications
          </MenuItem>
        </Menu>
      </Toolbar>

      {/* Mobile Navigation - Only show on small screens */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          justifyContent: "center",
          gap: 2,
          py: 1.5,
          borderTop: "1px solid #f0f0f0",
          overflowX: "auto",
          background: "#fff",
        }}
      >
        <NavLink to="/" end style={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/dashboard" style={linkStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/business" style={linkStyle}>
          Business
        </NavLink>
        <NavLink to="/transactions" style={linkStyle}>
          Transactions
        </NavLink>
        <NavLink to="/privacy-policy" style={linkStyle}>
          Privacy Policy
        </NavLink>
        <NavLink to="/terms-and-services" style={linkStyle}>
          Terms & Services  
        </NavLink>
      </Box>
    </AppBar>
  );
}
