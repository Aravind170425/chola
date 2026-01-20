import React from "react";
import { Button, Box } from "@mui/material";

const APP_ID = "874320005464617";
const CONFIG_ID = "1178308291053223";
const REDIRECT_URI = "https://yourdomain.com/whatsapp/callback";
// localhost example:
// http://localhost:5000/whatsapp/callback

export const DashboardHome = () => {
  const handleConnect = () => {
    const url =
      `https://www.facebook.com/v24.0/dialog/oauth` +
      `?client_id=${APP_ID}` +
      `&config_id=${CONFIG_ID}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = url;
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Button
        variant="contained"
        color="success"
        size="large"
        onClick={handleConnect}
      >
        Connect WhatsApp
      </Button>
    </Box>
  );
};
