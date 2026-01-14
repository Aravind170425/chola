import React from "react";


const TermsandServices = () => {
  return (
    <div className="tos-container">
      <h1 className="tos-title">
        Terms of Service – Chola Business Automation Pvt. Ltd.
      </h1>

      <p className="tos-date">
        <strong>Effective Date:</strong> [Insert Date]
      </p>

      <p>
        By using the services of <strong>Chola Business Automation Pvt. Ltd.</strong>
        (“we”, “our”, “us”), including our integration with Meta’s WhatsApp
        Business Platform, you agree to these Terms of Service (“ToS”).
      </p>

      <h2>1. Service Overview</h2>
      <p>
        Our platform enables businesses to send and receive messages using
        <strong> their own WhatsApp Business Accounts</strong> through Meta’s
        WhatsApp Business Platform. We provide automation and management tools
        only and <strong>do not control or resell WhatsApp services or pricing</strong>.
        WhatsApp messaging usage fees are billed directly by Meta.
      </p>

      <h2>2. Account Responsibilities</h2>
      <ul>
        <li>
          Businesses must connect and maintain their own WhatsApp Business
          Accounts.
        </li>
        <li>
          You are responsible for all activities performed using your WhatsApp
          account.
        </li>
        <li>
          You must comply with WhatsApp’s Acceptable Use Policy and all
          applicable laws and regulations.
        </li>
      </ul>

      <h2>3. Payment Terms</h2>
      <ul>
        <li>
          Subscription payments are processed via secure third-party payment
          gateways.
        </li>
        <li>
          We do not store or process credit card or banking information.
        </li>
        <li>
          WhatsApp messaging charges are billed directly by Meta and are not
          collected or controlled by us.
        </li>
      </ul>

      <h2>4. Data Use & Privacy</h2>
      <ul>
        <li>
          We collect only data necessary to provide services, including:
          <ul>
            <li>Business contact details (name, email, phone, company)</li>
            <li>WhatsApp message content and delivery status</li>
            <li>Technical data required for platform operation</li>
          </ul>
        </li>
        <li>
          We do not sell or misuse WhatsApp message data.
        </li>
        <li>
          All data is processed strictly on behalf of the business.
        </li>
        <li>
          Please refer to our <strong>Privacy Policy</strong> for more details.
        </li>
      </ul>

      <h2>5. Security & Data Retention</h2>
      <p>
        We use reasonable technical and organizational safeguards, including SSL
        encryption, to protect data. Information is retained only as long as
        necessary to provide services or meet legal obligations.
      </p>

      <h2>6. User Conduct</h2>
      <ul>
        <li>
          You agree not to send spam, fraudulent, illegal, or abusive messages.
        </li>
        <li>
          You are solely responsible for obtaining recipient consent and
          complying with messaging regulations.
        </li>
      </ul>

      <h2>7. Limitation of Liability</h2>
      <p>
        Chola Business Automation Pvt. Ltd. is not responsible for WhatsApp
        service interruptions, message delivery failures, or Meta’s actions.
        WhatsApp infrastructure, pricing, and policies are fully controlled by
        Meta.
      </p>

      <h2>8. Termination</h2>
      <p>
        We reserve the right to suspend or terminate access for violations of
        these Terms or WhatsApp/Meta policies. Upon termination, data may be
        deleted in accordance with our data retention practices.
      </p>

      <h2>9. Contact Information</h2>
      <p>
        For any questions or concerns regarding these Terms of Service, please
        contact:
      </p>
      <p className="tos-email">
        📧 <a href="mailto:support@cholabiz.com">support@cholabiz.com</a>
      </p>
    </div>
  );
};

export default TermsandServices;
