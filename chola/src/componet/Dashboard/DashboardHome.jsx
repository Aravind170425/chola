import { Box, Typography, Paper, Button, Snackbar, Alert } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const META_ONBOARD_URL =
  "https://business.facebook.com/messaging/whatsapp/onboard/?" +
  "app_id=874320005464617" +
  "&config_id=1178308291053223" +
  "&extras=" +
  encodeURIComponent(
    JSON.stringify({
      sessionInfoVersion: "3",
      version: "v3"
    })
  );

export function DashboardHome() {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleMetaMessage = (event) => {
      const allowedOrigins = [
        "https://www.facebook.com",
        "https://business.facebook.com"
      ];

      if (!allowedOrigins.includes(event.origin)) {
        console.warn("Blocked origin:", event.origin);
        return;
      }

      let data = event.data;

      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }

      console.log("✅ Meta message:", data);

      if (data?.type !== "WA_EMBEDDED_SIGNUP") return;

      const payload = data.payload;

      if (!payload?.code) {
        console.error("❌ No code in payload");
        setLoading(false);
        return;
      }

      console.log("📦 Embedded Signup Payload:", payload);

      axios
        .post(
          "https://chola-whatsapp-api-backend.onrender.com",
          {
            code: payload.code,
            waba_id: payload.waba_id,
            phone_number_id: payload.phone_number_id,
            display_phone_number: payload.display_phone_number,
            business_id: payload.business_id
          },
          {
            withCredentials: true,
            headers: {
              "ngrok-skip-browser-warning": "true"
            }
          }
        )
        .then(() => {
          setShowSnackbar(true);
          setLoading(false);
          popupRef.current?.close();
        })
        .catch((err) => {
          console.error("❌ Backend failed:", err);
          alert("Signup completed but backend failed");
          setLoading(false);
        });
    };

    window.addEventListener("message", handleMetaMessage);
    return () => window.removeEventListener("message", handleMetaMessage);
  }, []);

  const startEmbeddedSignup = () => {
    setLoading(true);

    const popup = window.open(
      META_ONBOARD_URL,
      "metaSignup",
      "width=500,height=700"
    );

    if (!popup) {
      alert("Popup blocked. Allow popups.");
      setLoading(false);
      return;
    }

    popupRef.current = popup;
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Dashboard
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography sx={{ fontSize: 16, mb: 2 }}>
          Connect your WhatsApp Business account
        </Typography>

        <Button
          variant="contained"
          sx={{ background: "#25D366", textTransform: "none" }}
          onClick={startEmbeddedSignup}
          disabled={loading}
        >
          {loading ? "Opening Meta..." : "Connect WhatsApp"}
        </Button>
      </Paper>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ borderRadius: 2 }}>
          WhatsApp connected successfully ✅
        </Alert>
      </Snackbar>
    </Box>
  );
}
