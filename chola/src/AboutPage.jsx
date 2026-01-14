import "./About.css";

const About = () => {
  return (
    <div className="about">
      {/* Header Section */}
      <section className="about-hero">
        <h1>About Chola Automation</h1>
        <p>
          Empowering businesses with reliable and secure WhatsApp Cloud API
          solutions.
        </p>
      </section>

      {/* About Content */}
      <section className="about-content">
        <div className="content-box">
          <h2>Who We Are</h2>
          <p>
            Chola Automation Private Limited is a technology-focused company
            helping businesses connect with their customers using the official
            Meta WhatsApp Cloud API. We provide tools that make customer
            communication simple, fast, and scalable.
          </p>
        </div>

        <div className="content-box">
          <h2>What We Do</h2>
          <p>
            Our platform allows businesses to integrate their own WhatsApp
            Business number and manage bulk messages, notifications, and
            automated conversations — all from a single dashboard.
          </p>
        </div>

        <div className="content-box">
          <h2>Our Mission</h2>
          <p>
            To help businesses grow by delivering secure, compliant, and
            easy-to-use WhatsApp automation solutions powered by Meta’s Cloud
            API.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us">
        <h2>Why Choose Chola Automation?</h2>
        <ul>
          <li>Official Meta WhatsApp Cloud API integration</li>
          <li>Use your own WhatsApp Business number</li>
          <li>Secure and scalable infrastructure</li>
          <li>Fast onboarding and expert support</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
