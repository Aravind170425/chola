const PrivacyPolicy = () => {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Privacy Policy</h1>

        <p style={styles.text}>
          <strong>Chola Business Automation Pvt. Ltd.</strong> (“we”, “our”, “us”) respects your privacy and is
          committed to protecting the personal and business information of our users.
        </p>

        <Section title="Information We Collect">
          <ul style={styles.list}>
            <li>Name, email address, and contact details</li>
            <li>Company information and business requirements</li>
            <li>WhatsApp Business phone numbers</li>
            <li>WhatsApp message content and message status information</li>
            <li>Technical data required to deliver messages via the WhatsApp Business Platform</li>
          </ul>

          <p style={styles.text}>
            Payment details for software subscriptions are processed securely through third-party payment
            gateways. We do not store or process card or banking details on our servers.
          </p>
        </Section>

        <Section title="Use of Information">
          <p style={styles.text}>The collected information is used solely to:</p>
          <ul style={styles.list}>
            <li>Provide business automation and communication services</li>
            <li>Enable businesses to send and receive messages using the WhatsApp Business Platform</li>
            <li>Send invoices, receipts, notifications, and service-related updates</li>
            <li>Improve platform performance, reliability, and user experience</li>
          </ul>
        </Section>

        <Section title="WhatsApp & Meta Platform Disclosure">
          <p style={styles.text}>
            Our application integrates with Meta’s WhatsApp Business Platform. Businesses connect their own
            WhatsApp Business Accounts through Meta’s Embedded Signup process.
          </p>

          <p style={styles.text}>
            WhatsApp message content and related data are processed strictly on behalf of the business for
            the purpose of message delivery and platform functionality.
          </p>

          <p style={styles.text}>
            WhatsApp messaging usage fees are billed directly by Meta to the business. Chola Business
            Automation Pvt. Ltd. does not resell WhatsApp messaging services and does not control WhatsApp
            pricing or billing policies.
          </p>
        </Section>

        <Section title="Data Sharing">
          <p style={styles.text}>
            We do not sell, rent, or trade WhatsApp message data or personal information. Data is shared only
            with trusted service providers strictly required to operate and maintain the platform, in
            compliance with applicable laws and Meta policies.
          </p>
        </Section>

        <Section title="Data Security">
          <p style={styles.text}>
            We implement reasonable technical and organizational security measures, including SSL
            encryption and access controls, to protect user data from unauthorized access, disclosure, or
            misuse.
          </p>
        </Section>

        <Section title="Data Retention">
          <p style={styles.text}>
            User data is retained only for as long as necessary to provide services, fulfill contractual
            obligations, or comply with applicable legal and regulatory requirements.
          </p>
        </Section>

        <Section title="User Rights">
          <p style={styles.text}>
            Users may request access, correction, or deletion of their personal data by contacting us using
            the details provided below.
          </p>
        </Section>

        <Section title="Contact Information">
          <p style={styles.text}>
            For any privacy-related questions or requests, please contact us at{" "}
            <a href="mailto:support@cholabiz.com" style={styles.link}>
              support@cholabiz.com
            </a>
          </p>
        </Section>
      </div>
    </div>
  )
}

const Section = ({ title, children }) => (
  <div style={{ marginTop: "32px" }}>
    <h2 style={styles.sectionTitle}>{title}</h2>
    {children}
  </div>
)

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f6f7fb",
    padding: "40px 16px",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    maxWidth: "900px",
    width: "100%",
    background: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  title: {
    textAlign: "center",
    fontSize: "36px",
    fontWeight: "700",
    color: "#ff7a45",
    marginBottom: "24px",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#ff7a45",
    marginBottom: "12px",
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#333",
    marginBottom: "10px",
  },
  list: {
    paddingLeft: "20px",
    lineHeight: "1.8",
    color: "#333",
  },
  link: {
    color: "#ff7a45",
    textDecoration: "none",
    fontWeight: "500",
  },
}

export default PrivacyPolicy
