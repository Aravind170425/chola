import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./HomePage";
import About from "./AboutPage";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsandServices from "./TermsandServices";
import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="navbar-container">
          <div className="logo">CholaBiz</div>

          <nav className="nav-links">
            <NavLink to="/" end className="nav-link">
              Home
            </NavLink>
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
            <NavLink to="/privacy-policy" className="nav-link">
              Privacy Policy
            </NavLink>
                  <NavLink to="/terms-and-services" className="nav-link">
             Terms And Services 
            </NavLink>
            
          </nav>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-and-services" element={<TermsandServices />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <h3 className="footer-logo">CholaBiz</h3>
            <p className="footer-text">
              Business automation platform for WhatsApp communication and customer engagement.
            </p>
          </div>

          <div className="footer-right">
            <NavLink to="/privacy-policy" className="footer-link">
              Privacy Policy
            </NavLink>
            <NavLink to="/about" className="footer-link">
              About
            </NavLink>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Chola Business Automation Pvt. Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
