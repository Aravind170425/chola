// App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./HomePage";
import About from "./AboutPage";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsandServices from "./TermsandServices";
import { Navbar } from "./pages/Navbar.jsx";
import { Footer } from "./pages/Footer.jsx";
import { Box } from "@mui/material";


function App() {
return (
<Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
<Navbar />


<Box component="main" sx={{ flex: 1 }}>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/terms-and-services" element={<TermsandServices />} />
</Routes>
</Box>


<Footer />
</Box>
);
}


export default App;