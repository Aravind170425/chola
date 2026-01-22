// pages/DashboardHome.jsx
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";

export function DashboardD() {
  const [loading, setLoading] = useState(false);

  const META_ONBOARD_URL =
    "https://www.facebook.com/v24.0/dialog/oauth" +
    "?client_id=874320005464617" +
    "&config_id=1178308291053223" +
    "&display=popup" +
    "&extras=%7B%22sessionInfoVersion%22%3A%223%22%2C%22version%22%3A%22v3%22%2C%22featureType%22%3A%22whatsapp_business_app_onboarding%22%7D" +
    "&redirect_uri=http://localhost:3000/whatsapp/redirect" +
    "&response_type=code" +
    "&override_default_response_type=true";

  const handleConnectWhatsapp = () => {
    setLoading(true);

    const popup = window.open(
      META_ONBOARD_URL,
      "metaSignup",
      "width=600,height=720"
    );

    // Listen for Meta postMessage (will fire only after approval)
    const listener = (event) => {
      if (event.origin.includes("facebook.com")) {
        console.log("META EVENT:", event.data);

        localStorage.setItem("whatsapp_connected", "true");

        setTimeout(() => {
          window.location.href = "/dashboard/success";
        }, 3000);
      }
    };

    window.addEventListener("message", listener);

    // Fallback auto success (for Dev Mode demo)
    setTimeout(() => {
      window.removeEventListener("message", listener);
      window.location.href = "/dashboard/success";
    }, 15000);
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>WhatsApp Integration</h2>
      <p>Connect your WhatsApp Business account to start messaging customers.</p>

      <Button
        variant="contained"
        color="success"
        disabled={loading}
        onClick={handleConnectWhatsapp}
      >
        {loading ? (
          <>
            <CircularProgress size={20} style={{ marginRight: 10 }} />
            Connecting...
          </>
        ) : (
          "Connect WhatsApp"
        )}
      </Button>
    </div>
  );
}
