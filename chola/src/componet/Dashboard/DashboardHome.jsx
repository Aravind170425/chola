// pages/DashboardHome.jsx
import { Box, Typography, Paper, Button, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function DashboardHome() {
  const [isConnected, setIsConnected] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleConnectWhatsapp = () => {
    // simulate successful connection
    setIsConnected(true);
    setShowSnackbar(true);

    // navigate after 1.5 seconds
    setTimeout(() => {
      navigate("/dashboard/whatsapp");
    }, 1500);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Dashboard
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography sx={{ fontSize: 16, mb: 1 }}>
          Welcome to Chola Biz Dashboard 👋
        </Typography>

        <Typography sx={{ fontSize: 14, color: "#555", mb: 3 }}>
          From here you can manage WhatsApp campaigns, view reports,
          and configure your business automation settings.
        </Typography>

        {/* Connect WhatsApp Button */}
        {!isConnected && (
          <Button
            variant="contained"
            sx={{
              background: "#ff7a45",
              textTransform: "none",
              "&:hover": { background: "#e96a3c" },
            }}
            onClick={handleConnectWhatsapp}
          >
            Connect WhatsApp
          </Button>
        )}
      </Paper>

      {/* Snackbar Success Message */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ borderRadius: 2 }}
        >
          WhatsApp connected successfully ✅
        </Alert>
      </Snackbar>
    </Box>
  );
}
