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
import { DashboardD } from "./componet/Dashboard/DashboardD.jsx";
import { ProtectedRoute } from "./pages/ProtectedRoute.jsx";
import WhatsappSuccess from "./pages/WhatsappSucess.jsx";
import Chat from "./pages/chat.jsx";
import { DummyNav } from "./pages/DummyNav.jsx";

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isChatPage = location.pathname === "/dashboard/chat";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Show DummyNav only for dashboard pages EXCEPT chat */}
      {isDashboard && !isChatPage && <DummyNav />}
      
      {/* Show regular Navbar for non-dashboard pages */}
      {!isDashboard && <Navbar />}
      
      {/* Chat page gets no navbar */}

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
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardD />} />
            <Route path="whatsapp" element={<WhatsappBulkSender />} />
            <Route path="success" element={<WhatsappSuccess />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Routes>
      </Box>

      {/* Hide footer for dashboard pages and chat page */}
      {!isDashboard && !isChatPage && <Footer />}
    </Box>
  );
}

export default App;