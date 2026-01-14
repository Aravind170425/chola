import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1 style={{color:"black"}}><span style={{ fontSize: "2.8rem", color:"#ed910e"}}>C</span>HOL<span style={{ fontSize: "2.8rem", color:"#5fdc36"}}>A</span> Business Automation</h1>
          <p style={{ fontSize: "22px", fontWeight: "500", marginBottom: "16px" }}>
            Simplifying WhatsApp Communication for Businesses
          </p>

          <p>
            Chola Business Automation is a SaaS platform that enables businesses
            to manage their WhatsApp messaging efficiently and securely.
            Connect your WhatsApp Business Account and send messages, manage
            templates, and track engagement — all from a single dashboard.
            <br />
            <br />
            Our platform integrates directly with the WhatsApp Cloud API via
            Meta Embedded Signup, ensuring that businesses use their own
            WhatsApp accounts safely.
          </p>

          <div className="hero-buttons">
            <button className="btn primary">Start Free Trial</button>
            <button className="btn secondary">Connect WhatsApp Account</button>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <h2>Platform Features</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Message Dashboard</h3>
            <p>
              Send and receive WhatsApp messages directly from a centralized
              dashboard.
            </p>
          </div>

          <div className="feature-card">
            <h3>Template Management</h3>
            <p>
              Create, submit, and manage WhatsApp message templates with ease.
            </p>
          </div>

          <div className="feature-card">
            <h3>Analytics & Tracking</h3>
            <p>
              Track message delivery status and customer engagement analytics.
            </p>
          </div>

          <div className="feature-card">
            <h3>Use Your Own Account</h3>
            <p>
              Businesses connect their own WhatsApp accounts — we never resell
              messages.
            </p>
          </div>

          <div className="feature-card">
            <h3>Secure & Compliant</h3>
            <p>
              GDPR-compliant platform with secure data handling and encryption.
            </p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta">
        <h2>Connect Your WhatsApp Account</h2>
        <p>
          Start automating customer communication today using the official
          WhatsApp Cloud API.
        </p>
        <button className="btn primary">Start Free Trial</button>
      </section>
    </div>
  );
};

export default Home;
