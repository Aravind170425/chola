// pages/DashboardHome.jsx
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Paper,
  Container,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import {
  WhatsApp,
  CheckCircle,
  Send,
  Analytics,
  Security,
  Speed,
  People,
  Timer,
  VerifiedUser,

} from "@mui/icons-material";
import LinkIcon from '@mui/icons-material/Link';

export function DashboardD() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(false);

  const META_ONBOARD_URL =
    "https://business.facebook.com/messaging/whatsapp/onboard/?app_id=874320005464617&config_id=1178308291053223&extras=%7B%22sessionInfoVersion%22%3A%223%22%2C%22version%22%3A%22v3%22%7D";

  const handleConnectWhatsapp = () => {
    setLoading(true);
    const popup = window.open(
      META_ONBOARD_URL,
      "metaSignup",
      "width=600,height=720",
    );

    const listener = (event) => {
      if (event.origin.includes("facebook.com")) {
        localStorage.setItem("whatsapp_connected", "true");
        setTimeout(() => (window.location.href = "/dashboard/success"), 3000);
      }
    };

    window.addEventListener("message", listener);
    setTimeout(() => {
      window.removeEventListener("message", listener);
      window.location.href = "/dashboard/success";
    }, 15000);
  };

  const benefits = [
    {
      title: "Bulk Messaging",
      description:
        "Send personalized messages to thousands of contacts in one click.",
      icon: <Send sx={{ fontSize: 32, color: "#25D366" }} />,
    },
    {
      title: "Automated Responses",
      description:
        "Set up quick replies and automated responses for common queries.",
      icon: <WhatsApp sx={{ fontSize: 32, color: "#128C7E" }} />,
    },
    {
      title: "Advanced Analytics",
      description:
        "Track delivery rates, open rates, and customer engagement metrics.",
      icon: <Analytics sx={{ fontSize: 32, color: "#075E54" }} />,
    },
    {
      title: "Secure Communication",
      description:
        "End-to-end encryption ensures your messages remain private.",
      icon: <Security sx={{ fontSize: 32, color: "#ff7a45" }} />,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        backgroundColor: "#ffffff",
      }}
    >
      {/* Left Side - 30% - Image & Features */}
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          height: "300px",
          minHeight: { xs: "400px", md: "700px" },
          backgroundColor: "#f8f9fa",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          borderRight: { md: "1px solid #e0e0e0" },
          overflow: "hidden",
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: "absolute",

            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, ${alpha("#25D366", 0.03)} 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, ${alpha("#128C7E", 0.03)} 0%, transparent 50%),
              linear-gradient(135deg, ${alpha("#25D366", 0.02)} 0%, ${alpha("#128C7E", 0.02)} 100%)
            `,
            zIndex: 0,
          }}
        />

        {/* Main Image Container */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Image */}
          <Box
            component="img"
            src="/6490.jpg"
            alt="WhatsApp Business Integration"
            sx={{
              width: "100%",
              maxWidth: "350px",
              height: "300px",
              objectFit: "contain",
              filter: "drop-shadow(0 12px 40px rgba(37, 211, 102, 0.15))",
              mb: 2,
              mt: -5,
              transform: { md: "scale(1.05)" },
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: { md: "scale(1.08)" },
              },
            }}
          />

          {/* Features Title */}
          <Typography
            variant="h5"
            gutterBottom 
            sx={{
              color: "#128C7E",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            Powerful Features
          </Typography>

          {/* Features List */}
          <List
            sx={{
              width: "100%",
              bgcolor: "rgba(255, 255, 255, 0.8)",
              borderRadius: 2,
              pl: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            {[
              {
                icon: <Send fontSize="small" />,
                text: "Bulk Messaging",
                desc: "Reach thousands instantly",
              },
              {
                icon: <Analytics fontSize="small" />,
                text: "Real-time Analytics",
                desc: "Track performance live",
              },
              {
                icon: <Security fontSize="small" />,
                text: "End-to-End Encryption",
                desc: "Maximum security",
              },
              {
                icon: <VerifiedUser fontSize="small" />,
                text: "Official API",
                desc: "Direct WhatsApp integration",
              },
            ].map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  px: 1,

                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "rgba(37, 211, 102, 0.05)",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: "#25D366" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" fontWeight={600} color="#333">
                      {item.text}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="#666">
                      {item.desc}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      {/* Right Side - 70% - Main Content */}
      <Box
        sx={{
          width: { xs: "100%", md: "70%" },
          minHeight: { xs: "auto", md: "100vh" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          // p: { xs: 3, md: 0 }
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: { xs: 4, md: 2 },
            px: { xs: 2, md: 4 },
          }}
        >
          {/* Header Section */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                color: "#1a1a1a",
                fontSize: { xs: "2.5rem", md: "2.5rem" },
                lineHeight: 1.1,
                mb: 2,
              }}
            >
              WhatsApp Business{" "}
              <Box component="span" sx={{ color: "#25D366" }}>
                Integration
              </Box>
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: "#666",
                fontWeight: 400,
                fontSize: { xs: "1.1rem", md: "1rem" },
                lineHeight: 1.6,
                maxWidth: "800px",
              }}
            >
              Connect your WhatsApp Business account with Chola Biz to transform
              your customer communication. Send bulk messages, track analytics,
              and automate responses—all from one dashboard.
            </Typography>
          </Box>

          {/* Benefits Section */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: "#1a1a1a",
                mb: 2,
                fontSize: { xs: "1.8rem", md: "1.5rem" },
              }}
            >
              Why Connect with Chola Business Automation ?
            </Typography>

            <Grid
              container
              spacing={2}
              // wrap="nowrap"                 // 🔑 force single row
              sx={{
                overflow: "hidden", // 🔑 no scrollbars
                width: "100%",
              }}
            >
              {benefits.map((benefit, index) => (
                <Grid
                  item
                  key={index}
                  sx={{
                    flex: "1 1 0", // 🔑 equal width for all cards
                    minWidth: 0, // 🔑 allow shrinking
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: "rgba(0,0,0,0.02)",
                      height: "100%",
                      border: "1px solid rgba(0,0,0,0.06)",
                      transition: "all 0.25s ease",
                      "&:hover": {
                        backgroundColor: "rgba(37, 211, 102, 0.04)",
                        borderColor: "rgba(37, 211, 102, 0.25)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    {/* Icon */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        flexShrink: 0,
                    
                      }}
                    >
                      {benefit.icon}
                    </Box>

                    {/* Text */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          mb: 0.25,
                          fontSize: "0.95rem",
                          lineHeight: 1.25,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {benefit.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: "0.8rem",
                          lineHeight: 1.4,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {benefit.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Connection Section - 200px Height Alternative */}
          <Box
            sx={{
              background: `linear-gradient(135deg, ${alpha("#25D366", 0.05)} 0%, ${alpha("#128C7E", 0.05)} 100%)`,
              borderRadius: 2.5,
              px: 2.5,
              border: "1.5px solid",
              borderColor: alpha("#25D366", 0.2),
              height: 200,
              width: "95%",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Icon Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mr: 3,
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  backgroundColor: "#25D366",
                  color: "white",
                  mb: 1,
                }}
              >
                <WhatsApp sx={{ fontSize: 28 }} />
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: "#128C7E",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                }}
              >
                2 minutes
              </Typography>
            </Box>

            {/* Content Section */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#128C7E",
                  fontSize: "1.1rem",
                  mb: 1,
                }}
              >
                Ready to Get Started?
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  mb: 1.5,
                }}
              >
                Connect your WhatsApp Business account in just 2 minutes
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#555",
                  fontSize: "0.8rem",
                  lineHeight: 1.5,
                  mb: 2,
                }}
              >
                Click the button below to securely authorize Chola Biz to access
                your WhatsApp Business account. You'll be redirected to Meta's
                official authorization page.
              </Typography>

              <Button
                variant="contained"
                size="small"
                disabled={loading}
                onClick={handleConnectWhatsapp}
                sx={{
                  backgroundColor: "#25D366",
                  color: "white",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  borderRadius: 1.5,
                  textTransform: "none",
                  py: 0.8,
                  px: 2.5,
                  minWidth: 160,
                  "&:hover": {
                    backgroundColor: "#128C7E",
                  },
                }}
              >
                {/* {loading ? (

                  <>
                    <CircularProgress
                      size={16}
                      sx={{ color: "white", mr: 1 }}
                    />
                    Connecting...
                  </>
                ) : ( */}
                  <><LinkIcon size={16}
                      sx={{ color: "white", mr: 1 }} /> Connect WhatsApp</>
                {/* )} */}
              </Button>
            </Box>
          </Box>

          {/* Support Section */}
        </Container>
        <Box
          sx={{
            mt: 5,
            pt: 3,
            borderTop: "1px solid #eee",
            textAlign: "center",
          }}
        >
          <Typography variant="body1" color="#666" sx={{ mb: 1 }}>
            Need assistance? Our support team is here to help
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="body2"
              color="#25D366"
              sx={{ fontWeight: 600 }}
            >
              ✉️ support@cholabiz.com
            </Typography>
            <Typography
              variant="body2"
              color="#25D366"
              sx={{ fontWeight: 600 }}
            >
              📞 +91-9876543210
            </Typography>
            <Typography
              variant="body2"
              color="#25D366"
              sx={{ fontWeight: 600 }}
            >
              🕒 24/7 Support Available
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
