// App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./HomePage";
import About from "./AboutPage";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsandServices from "./TermsandServices";
import { Navbar } from "./pages/Navbar.jsx";
import { Footer } from "./pages/Footer.jsx";
import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Box } from "@mui/material";
import WhatsappBulkSender from "./WhatsappBulkSender.jsx";
import { DashboardLayout } from "./pages/DashboardLayout.jsx";
import { DashboardHome } from "./componet/Dashboard/DashboardHome.jsx";

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!isDashboard && <Navbar />}

      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-services" element={<TermsandServices />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route
              path="whatsapp"
              element={<WhatsappBulkSender />}
            />
          </Route>
        </Routes>
      </Box>

      {!isDashboard && <Footer />}
    </Box>
  );
}

export default App;
