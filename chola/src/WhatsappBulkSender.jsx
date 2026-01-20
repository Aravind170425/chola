import { useState } from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";
import { Send } from "@mui/icons-material";

const WHATSAPP_GREEN = "#0d5d27";

const WhatsappBulkSender = () => {
  const [toNumber, setToNumber] = useState("917449213799"); // recipient number
  const [message, setMessage] = useState("Hello 👋 Test from frontend");
  const [status, setStatus] = useState("");
  const [useTemplate, setUseTemplate] = useState(true); // toggle template
  const [templateParams, setTemplateParams] = useState(["John Doe", "123456", "Jan 19, 2026"]); // Example params

  const handleSend = async () => {
    setStatus("Sending...");
    try {
      const res = await fetch("http://localhost:5050/api/send-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: toNumber,
          type: useTemplate ? "template" : "text",
          message: message,
          templateName: useTemplate ? "jaspers_market_order_confirmation_v1" : undefined,
          templateParams: useTemplate ? templateParams : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error?.message || "Failed to send");

      setStatus("✅ Message sent successfully");
      console.log("Backend response:", data);
    } catch (err) {
      
      setStatus("❌ " + err.message);
      console.error(err);
    }
  };

  return (
    <Box sx={{ height: "100vh", p: 2, bgcolor: "#f0f2f5", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper sx={{ width: 400, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, color: WHATSAPP_GREEN }}>WhatsApp Test Sender</Typography>

        <TextField
          fullWidth
          label="To Number (no +)"
          value={toNumber}
          onChange={(e) => setToNumber(e.target.value)}
          sx={{ mb: 2 }}
        />

        {!useTemplate && (
          <TextField
            fullWidth
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ mb: 2 }}
          />
        )}

        {useTemplate && (
          <TextField
            fullWidth
            label="Template Params (comma separated)"
            value={templateParams.join(", ")}
            onChange={(e) => setTemplateParams(e.target.value.split(",").map((s) => s.trim()))}
            sx={{ mb: 2 }}
          />
        )}

        <Button
          startIcon={<Send />}
          sx={{ bgcolor: WHATSAPP_GREEN, color: "white", textTransform: "none" }}
          onClick={handleSend}
        >
          Send Now
        </Button>

        <Typography sx={{ mt: 1, fontSize: 13 }}>{status}</Typography>
      </Paper>
    </Box>
  );
};

export default WhatsappBulkSender;
