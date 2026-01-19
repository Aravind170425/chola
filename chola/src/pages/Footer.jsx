
// Footer.jsx
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { NavLink } from "react-router-dom";
export function Footer() {
  return (
    <Box sx={{ background: "#f8f9fb", borderTop: "1px solid #eaeaea", mt: 5 }}>
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          p: 4,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {/* Left */}
        <Box>
          <img
            src="/cholabiz_logo.jpeg"
            alt="Chola Biz Logo"
            style={{ width: 120, height: "auto", objectFit: "contain" }}
          />
          <Typography
            sx={{
              maxWidth: 350,
              fontSize: 14,
              color: "#555",
              lineHeight: 1.6,
              mt: 1,
            }}
          >
            Business automation platform for WhatsApp communication and customer
            engagement.
          </Typography>
        </Box>

        {/* Right */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <MuiLink
            component={NavLink}
            to="/privacy-policy"
            underline="none"
            sx={{
              color: "#333",
              fontSize: 14,
              "&:hover": { color: "#ff7a45" },
            }}
          >
            Privacy Policy
          </MuiLink>
          <MuiLink
            component={NavLink}
            to="/about"
            underline="none"
            sx={{
              color: "#333",
              fontSize: 14,
              "&:hover": { color: "#ff7a45" },
            }}
          >
            About
          </MuiLink>
        </Box>
      </Box>

      {/* Bottom */}
      <Box
        sx={{
          textAlign: "center",
          py: 1.5,
          fontSize: 13,
          color: "#777",
          borderTop: "1px solid #eaeaea",
        }}
      >
        © {new Date().getFullYear()} Chola Business Automation Pvt. Ltd. All
        rights reserved.
      </Box>
    </Box>
  );
}
