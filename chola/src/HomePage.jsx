import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>WhatsApp Cloud API for Business</h1>
          <p>
            Chola Automation Private Limited provides a secure and scalable
            WhatsApp Cloud API platform to help businesses automate and manage
            customer conversations using their own WhatsApp Business number.
          </p>

          <div className="hero-buttons">
            <button className="btn primary">Get Started</button>
            <button className="btn secondary">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Chola Automation?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Official Meta API</h3>
            <p>Direct integration with Meta WhatsApp Cloud API.</p>
          </div>

          <div className="feature-card">
            <h3>Use Your Own Number</h3>
            <p>Connect and manage your own WhatsApp Business number.</p>
          </div>

          <div className="feature-card">
            <h3>Message Automation</h3>
            <p>Send bulk messages, notifications, and automated replies.</p>
          </div>

          <div className="feature-card">
            <h3>Secure & Reliable</h3>
            <p>Enterprise-grade security with high delivery rates.</p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="cta">
        <h2>Start Messaging Your Customers Today</h2>
        <p>
          Integrate WhatsApp Cloud API in minutes and grow your business
          communication.
        </p>
        <button className="btn primary">Request Demo</button>
      </section>
    </div>
  );
};

export default Home;
