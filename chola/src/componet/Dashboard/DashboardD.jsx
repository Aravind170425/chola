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
  useMediaQuery
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
  VerifiedUser
} from "@mui/icons-material";

export function DashboardD() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(false);

  const META_ONBOARD_URL =
    "https://www.facebook.com/v24.0/dialog/oauth" +
    "?client_id=874320005464617" +
    "&config_id=1178308291053223" +
    "&display=popup" +
    "&extras=%7B%22sessionInfoVersion%22%3A%22v3%22%2C%22version%22%3A%22v3%22%2C%22featureType%22%3A%22whatsapp_business_app_onboarding%22%7D" +
    "&redirect_uri=http://localhost:3000/whatsapp/redirect" +
    "&response_type=code" +
    "&override_default_response_type=true";

  const handleConnectWhatsapp = () => {
    setLoading(true);
    const popup = window.open(META_ONBOARD_URL, "metaSignup", "width=600,height=720");
    
    const listener = (event) => {
      if (event.origin.includes("facebook.com")) {
        localStorage.setItem("whatsapp_connected", "true");
        setTimeout(() => window.location.href = "/dashboard/success", 3000);
      }
    };
    
    window.addEventListener("message", listener);
    setTimeout(() => {
      window.removeEventListener("message", listener);
      window.location.href = "/dashboard/success";
    }, 15000);
  };

  const stats = [
    { value: "2B+", label: "Active Users", color: "#25D366", icon: <People /> },
    { value: "99.8%", label: "Delivery Rate", color: "#128C7E", icon: <CheckCircle /> },
    { value: "10x", label: "Higher Engagement", color: "#075E54", icon: <Analytics /> },
    { value: "<1s", label: "Response Time", color: "#ff7a45", icon: <Timer /> }
  ];

  const benefits = [
    {
      title: "Bulk Messaging",
      description: "Send personalized messages to thousands of contacts in one click.",
      icon: <Send sx={{ fontSize: 32, color: "#25D366" }} />
    },
    {
      title: "Automated Responses",
      description: "Set up quick replies and automated responses for common queries.",
      icon: <WhatsApp sx={{ fontSize: 32, color: "#128C7E" }} />
    },
    {
      title: "Advanced Analytics",
      description: "Track delivery rates, open rates, and customer engagement metrics.",
      icon: <Analytics sx={{ fontSize: 32, color: "#075E54" }} />
    },
    {
      title: "Secure Communication",
      description: "End-to-end encryption ensures your messages remain private.",
      icon: <Security sx={{ fontSize: 32, color: "#ff7a45" }} />
    }
  ];

  return (
    <Box sx={{ 
      minHeight: "100vh",
      display: "flex", 
      flexDirection: { xs: "column", md: "row" },
      backgroundColor: "#ffffff",
    }}>
      {/* Left Side - 30% - Image & Features */}
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          height: { xs: "auto", md: "700px" },
            minHeight: { xs: "400px", md: "700px" },
          backgroundColor: "#f8f9fa",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          borderRight: { md: "1px solid #e0e0e0" },
          p: { xs: 3, md: 4 },
          overflow: "hidden"
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, ${alpha("#25D366", 0.03)} 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, ${alpha("#128C7E", 0.03)} 0%, transparent 50%),
              linear-gradient(135deg, ${alpha("#25D366", 0.02)} 0%, ${alpha("#128C7E", 0.02)} 100%)
            `,
            zIndex: 0
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
            alignItems: "center"
          }}
        >
          {/* Image */}
          <Box
            component="img"
            src="/w.jpg"
            alt="WhatsApp Business Integration"
            sx={{
              width: "100%",
              maxWidth: "350px",
              height: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 12px 40px rgba(37, 211, 102, 0.15))",
              mb: 4,
              mt: 15,
              transform: { md: "scale(1.05)" },
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: { md: "scale(1.08)" }
              }
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
              mb: 2
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
              p: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
            }}
          >
            {[
              { icon: <Send fontSize="small" />, text: "Bulk Messaging", desc: "Reach thousands instantly" },
              { icon: <Analytics fontSize="small" />, text: "Real-time Analytics", desc: "Track performance live" },
              { icon: <Security fontSize="small" />, text: "End-to-End Encryption", desc: "Maximum security" },
              { icon: <Speed fontSize="small" />, text: "High Speed Delivery", desc: "Messages delivered in seconds" },
              { icon: <VerifiedUser fontSize="small" />, text: "Official API", desc: "Direct WhatsApp integration" }
            ].map((item, index) => (
              <ListItem 
                key={index} 
                sx={{ 
                  px: 1, 
                  py: 1.5,
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: "rgba(37, 211, 102, 0.05)"
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: "#25D366" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography variant="body1" fontWeight={600} color="#333">
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

          {/* Trust Badge */}
          <Box
            sx={{
              mt: 3,
              p: 2,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: 2,
              textAlign: "center",
              width: "100%",
              border: "1px solid rgba(37, 211, 102, 0.2)"
            }}
          >
            <Typography variant="caption" color="#666" sx={{ display: "block", mb: 0.5 }}>
              Trusted by 10,000+ businesses
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Box key={star} sx={{ color: "#ffb400", fontSize: "1rem" }}>★</Box>
              ))}
            </Box>
          </Box>
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
          p: { xs: 3, md: 0 }
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            py: { xs: 4, md: 6 },
            px: { xs: 2, md: 4 }
          }}
        >
          {/* Header Section */}
          <Box sx={{ mb: 5 }}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: 800,
                color: "#1a1a1a",
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                lineHeight: 1.1,
                mb: 2
              }}
            >
              WhatsApp Business <Box component="span" sx={{ color: "#25D366" }}>Integration</Box>
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{ 
                color: "#666",
                fontWeight: 400,
                fontSize: { xs: "1.1rem", md: "1.4rem" },
                lineHeight: 1.6,
                maxWidth: "800px"
              }}
            >
              Connect your WhatsApp Business account with Chola Biz to transform your customer communication. 
              Send bulk messages, track analytics, and automate responses—all from one dashboard.
            </Typography>
          </Box>

          {/* Stats Section */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Card 
                  elevation={0}
                  sx={{ 
                    textAlign: "center",
                    backgroundColor: alpha(stat.color, 0.08),
                    borderRadius: 3,
                    height: "100%",
                    p: 2,
                    border: `1px solid ${alpha(stat.color, 0.2)}`,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: `0 8px 30px ${alpha(stat.color, 0.15)}`
                    }
                  }}
                >
                  <CardContent sx={{ p: "8px !important" }}>
                    <Box sx={{ 
                      display: "inline-flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      backgroundColor: alpha(stat.color, 0.1),
                      color: stat.color,
                      mb: 2
                    }}>
                      {stat.icon}
                    </Box>
                    <Typography 
                      variant="h2" 
                      sx={{ 
                        color: stat.color, 
                        fontWeight: 800,
                        fontSize: { xs: "2rem", md: "2.5rem" },
                        lineHeight: 1,
                        mb: 1
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: "#666",
                        fontWeight: 600,
                        fontSize: "0.9rem"
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Benefits Section */}
          <Box sx={{ mb: 6 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 700, 
                color: "#1a1a1a", 
                mb: 4,
                fontSize: { xs: "1.8rem", md: "2.2rem" }
              }}
            >
              Why Connect with Chola Biz?
            </Typography>
            
            <Grid container spacing={3}>
              {benefits.map((benefit, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box 
                    sx={{ 
                      display: "flex", 
                      alignItems: "flex-start",
                      p: 3,
                      borderRadius: 3,
                      backgroundColor: "rgba(0,0,0,0.02)",
                      height: "100%",
                      border: "1px solid rgba(0,0,0,0.05)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(37, 211, 102, 0.03)",
                        borderColor: "rgba(37, 211, 102, 0.2)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.08)"
                      }
                    }}
                  >
                    <Box sx={{ 
                      mr: 2.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      backgroundColor: alpha(benefit.icon.props.sx.color || "#25D366", 0.1)
                    }}>
                      {benefit.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 700, 
                          mb: 1.5,
                          fontSize: "1.3rem"
                        }}
                      >
                        {benefit.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {benefit.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Connection Section */}
          <Box
            sx={{
              background: `linear-gradient(135deg, ${alpha("#25D366", 0.05)} 0%, ${alpha("#128C7E", 0.05)} 100%)`,
              borderRadius: 4,
              p: { xs: 3, md: 5 },
              border: "2px solid",
              borderColor: alpha("#25D366", 0.2),
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* Decorative Elements */}
            <Box
              sx={{
                position: "absolute",
                top: -50,
                right: -50,
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${alpha("#25D366", 0.1)} 0%, transparent 70%)`,
                zIndex: 0
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -30,
                left: -30,
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${alpha("#128C7E", 0.1)} 0%, transparent 70%)`,
                zIndex: 0
              }}
            />
            
            <Box sx={{ position: "relative", zIndex: 1 }}>
              {/* Header */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    backgroundColor: "#25D366",
                    color: "white",
                    mr: 3
                  }}
                >
                  <WhatsApp sx={{ fontSize: 36 }} />
                </Box>
                <Box>
                  <Typography 
                    variant="h2" 
                    sx={{ 
                      fontWeight: 800, 
                      color: "#128C7E",
                      fontSize: { xs: "1.8rem", md: "2.5rem" },
                      lineHeight: 1.2
                    }}
                  >
                    Ready to Get Started?
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: "#666",
                      fontWeight: 400,
                      mt: 1
                    }}
                  >
                    Connect your WhatsApp Business account in just 2 minutes
                  </Typography>
                </Box>
              </Box>

              {/* Description */}
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 4, 
                  color: "#555",
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                  maxWidth: "800px"
                }}
              >
                Click the button below to securely authorize Chola Biz to access your WhatsApp Business account. 
                You'll be redirected to Meta's official authorization page. Your data is safe with us—we use 
                industry-standard security protocols.
              </Typography>

              {/* CTA Button */}
              <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  disabled={loading}
                  onClick={handleConnectWhatsapp}
                  sx={{
                    backgroundColor: "#25D366",
                    color: "white",
                    py: 2.5,
                    px: 6,
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    borderRadius: 3,
                    textTransform: "none",
                    minWidth: { xs: "100%", sm: "400px" },
                    boxShadow: "0 6px 20px rgba(37, 211, 102, 0.3)",
                    "&:hover": {
                      backgroundColor: "#128C7E",
                      transform: "translateY(-3px)",
                      boxShadow: "0 12px 40px rgba(37, 211, 102, 0.4)"
                    },
                    "&:active": {
                      transform: "translateY(-1px)"
                    },
                    "&:disabled": {
                      backgroundColor: "#cccccc",
                      boxShadow: "none"
                    },
                    transition: "all 0.3s ease"
                  }}
                >
                  {loading ? (
                    <>
                      <CircularProgress size={24} sx={{ color: "white", mr: 2 }} />
                      Connecting to WhatsApp Business...
                    </>
                  ) : (
                    <>
                      <WhatsApp sx={{ mr: 2, fontSize: 28 }} />
                      Connect WhatsApp Business Account
                    </>
                  )}
                </Button>
              </Box>

              {/* Footer Note */}
              <Typography 
                variant="body2" 
                sx={{ 
                  color: "#666",
                  textAlign: "center",
                  maxWidth: "600px",
                  mx: "auto",
                  lineHeight: 1.6
                }}
              >
                By connecting, you agree to our <Box component="span" sx={{ color: "#25D366", fontWeight: 600 }}>Terms of Service</Box> and 
                WhatsApp Business API policies. We respect your privacy and never store personal messages.
              </Typography>
            </Box>
          </Box>

          {/* Support Section */}
          <Box 
            sx={{ 
              mt: 5, 
              pt: 3, 
              borderTop: "1px solid #eee",
              textAlign: "center" 
            }}
          >
            <Typography variant="body1" color="#666" sx={{ mb: 1 }}>
              Need assistance? Our support team is here to help
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap" }}>
              <Typography variant="body2" color="#25D366" sx={{ fontWeight: 600 }}>
                ✉️ support@cholabiz.com
              </Typography>
              <Typography variant="body2" color="#25D366" sx={{ fontWeight: 600 }}>
                📞 +91-9876543210
              </Typography>
              <Typography variant="body2" color="#25D366" sx={{ fontWeight: 600 }}>
                🕒 24/7 Support Available
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}