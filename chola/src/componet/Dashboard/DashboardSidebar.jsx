// // pages/DashboardSidebar.jsx
// import { Box, Typography, List, ListItemButton, ListItemText } from "@mui/material";
// import { NavLink } from "react-router-dom";

// export function DashboardSidebar() {
//   const linkStyle = ({ isActive }) => ({
//     textDecoration: "none",
//     color: isActive ? "#ff7a45" : "#333",
//     fontWeight: isActive ? 600 : 500,
//   });

//   return (
//     <Box
//       sx={{
//         width: 240,
//         background: "#ffffff",
//         borderRight: "1px solid #eaeaea",
//         p: 2,
//       }}
//     >
//       {/* Logo */}
//       <Box sx={{ mb: 3, textAlign: "center" }}>
//         <img
//           src="/cholabiz_logo.jpeg"
//           alt="Chola Biz Logo"
//           style={{ width: 140, height: "auto", objectFit: "contain" }}
//         />
//       </Box>

//       <Typography sx={{ fontSize: 12, color: "#777", mb: 1 }}>
//         MAIN MENU
//       </Typography>

//       <List disablePadding>
//         <NavLink to="/dashboard" end style={linkStyle}>
//           <ListItemButton>
//             <ListItemText primary="Dashboard" />
//           </ListItemButton>
//         </NavLink>

//         <NavLink to="/dashboard/whatsapp" style={linkStyle}>
//           <ListItemButton>
//             <ListItemText primary="WhatsApp Bulk Sender" />
//           </ListItemButton>
//         </NavLink>
//       </List>
//     </Box>
//   );
// }
// components/Navbar.jsx
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Badge,
  InputBase,
  alpha,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  WhatsApp as WhatsAppIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export function DashboardSidebar({ onMenuClick }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isNotificationsOpen = Boolean(notificationsAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate("/login");
    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
    >
      <MenuItem onClick={() => navigate("/profile")}>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        My Profile
      </MenuItem>
      <MenuItem onClick={() => navigate("/settings")}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const notifications = [
    { id: 1, text: "New message from John", time: "5 min ago" },
    { id: 2, text: "Campaign completed successfully", time: "1 hour ago" },
    { id: 3, text: "System update available", time: "2 hours ago" },
  ];

  const renderNotifications = (
    <Menu
      anchorEl={notificationsAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isNotificationsOpen}
      onClose={handleNotificationsClose}
      PaperProps={{
        sx: {
          width: 320,
          maxHeight: 400,
        },
      }}
    >
      <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">Notifications</Typography>
        <Typography variant="caption" sx={{ color: "primary.main", cursor: "pointer" }}>
          Mark all as read
        </Typography>
      </Box>
      <Divider />
      {notifications.map((notification) => (
        <MenuItem key={notification.id} sx={{ py: 1.5 }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography variant="body2">{notification.text}</Typography>
            <Typography variant="caption" color="text.secondary">
              {notification.time}
            </Typography>
          </Box>
        </MenuItem>
      ))}
      <Divider />
      <MenuItem sx={{ justifyContent: "center", color: "primary.main" }}>
        View all notifications
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: "white",
          color: "text.primary",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          {/* Left Section - Menu Button & Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={onMenuClick}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <img
                src="/cholabiz_logo.jpeg"
                alt="Chola Biz Logo"
                style={{ width: 90, height: 40, objectFit: "contain" }}
              />
        
            </Box>

            {/* Navigation Links */}
            <Box sx={{ display: { xs: "none", md: "flex" }, ml: 4, gap: 1 }}>
              <NavLink
                to="/dashboard"
                end
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? theme.palette.primary.main : "inherit",
                })}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    backgroundColor: (isActive) => isActive ? alpha(theme.palette.primary.main, 0.1) : "transparent",
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  <DashboardIcon fontSize="small" />
                  <Typography variant="body2" fontWeight={500}>
                    Dashboard
                  </Typography>
                </Box>
              </NavLink>

              <NavLink
                to="/dashboard/whatsapp"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? theme.palette.primary.main : "inherit",
                })}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    backgroundColor: (isActive) => isActive ? alpha(theme.palette.primary.main, 0.1) : "transparent",
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  <WhatsAppIcon fontSize="small" />
                  <Typography variant="body2" fontWeight={500}>
                    WhatsApp Bulk Sender
                  </Typography>
                </Box>
              </NavLink>
            </Box>
          </Box>

          {/* Search Bar */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              mx: 4,
            }}
          >
            <Box
              sx={{
                position: "relative",
                borderRadius: 20,
                backgroundColor: alpha(theme.palette.common.black, 0.05),
                "&:hover": {
                  backgroundColor: alpha(theme.palette.common.black, 0.08),
                },
                width: "100%",
                maxWidth: 400,
              }}
            >
              <Box
                sx={{
                  padding: theme.spacing(0, 2),
                  height: "100%",
                  position: "absolute",
                  pointerEvents: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SearchIcon fontSize="small" />
              </Box>
              <InputBase
                placeholder="Search..."
                sx={{
                  color: "inherit",
                  width: "100%",
                  pl: 6,
                  pr: 2,
                  py: 0.5,
                  "& .MuiInputBase-input": {
                    padding: 0,
                  },
                }}
              />
            </Box>
          </Box>

          {/* Right Section - Icons & Profile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Notifications */}
            <IconButton
              size="large"
              aria-label="show notifications"
              color="inherit"
              onClick={handleNotificationsOpen}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Settings */}
            <IconButton
              size="large"
              aria-label="settings"
              color="inherit"
              onClick={() => navigate("/settings")}
            >
              <SettingsIcon />
            </IconButton>

            {/* Profile */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
                U
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Render menus */}
      {renderMenu}
      {renderNotifications}

      {/* Spacer to prevent content from being hidden under the app bar */}
      <Toolbar />
    </>
  );
}

// Main Layout Component with Navbar and Sidebar
// export function DashboardLayout({ children }) {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh" }}>
//       <Navbar onMenuClick={handleDrawerToggle} />
      
//       {/* Sidebar (can be made responsive/drawer for mobile) */}
//       <Box
//         component="nav"
//         sx={{
//           width: { md: 240 },
//           flexShrink: { md: 0 },
//         }}
//       >
//         {/* Mobile drawer can be implemented here */}
//       </Box>
      
//       {/* Main content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { md: `calc(100% - 240px)` },
//         }}
//       >
//         {children}
//       </Box>
//     </Box>
//   );
// }

// Usage example in App.jsx:
/*
import { DashboardLayout } from './components/Navbar';
import { DashboardSidebar } from './components/DashboardSidebar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/whatsapp" element={<WhatsAppBulkSender />} />
        </Route>
      </Routes>
    </Router>
  );
}
*/