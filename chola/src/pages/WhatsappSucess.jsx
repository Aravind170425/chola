export default function WhatsappSuccess() {
  const connectionData = {
    business_id: "123456789012345",
    waba_id: "987654321098765",
    // phone_number_id: "+91 744",
    status: "CONNECTED",
    environment: "Whatsapp Cloud API "
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.successIcon}>✓</div>
        <h1 style={styles.title}>WhatsApp Business API Connected</h1>
        <p style={styles.subtitle}>
          Whatsapp business Account connected successfully! You can now start sending messages and managing your WhatsApp communications through our platform.
        </p>
        {/* <div style={styles.demoBadge}>DEMO - FOR REVIEW PURPOSES</div> */}
      </div>

      <div style={styles.contentGrid}>
        <div style={styles.connectionCard}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Connection Details</h3>
            <span style={styles.environmentBadge}>
              {connectionData.environment} ENVIRONMENT
            </span>
          </div>
          
          <p style={styles.cardDescription}>
            This is a Mr Franchise connection using Meta's WhatsApp Cloud API through the Embedded SignUp prcess
          </p>

          <div style={styles.detailsGrid}>
            <div style={styles.detailItem}>
              <label style={styles.detailLabel}>Business ID</label>
              <div style={styles.detailValue}>{connectionData.business_id}</div>
            </div>
            
            <div style={styles.detailItem}>
              <label style={styles.detailLabel}>WhatsApp Business Account ID</label>
              <div style={styles.detailValue}>{connectionData.waba_id}</div>
            </div>
            
            <div style={styles.detailItem}>
              {/* <label style={styles.detailLabel}>Phone Number</label> */}
              <div style={styles.detailValue}>{connectionData.phone_number_id}</div>

            </div>
            
            <div style={styles.detailItem}>
              <label style={styles.detailLabel}>Status</label>
              <div style={styles.statusBadge}>
                <span style={styles.statusDot}></span>
                {connectionData.status}
              </div>
            </div>
          </div>
        </div>

        <div style={styles.sidePanel}>
          <div style={styles.featureCard}>
            <h4 style={styles.featureTitle}>🎯 What's Next?</h4>
            <ul style={styles.featureList}>
              <li style={styles.featureItem}>Send test message </li>
              <li style={styles.featureItem}>Configure message templates</li>
              <li style={styles.featureItem}>Set up automated responses</li>
            </ul>
         
          </div>

          <div style={styles.featureCard}>
            <h4 style={styles.featureTitle}>📋 Requirements for Production</h4>
            <ul style={styles.featureList}>
              <li style={styles.featureItem}>Business verification</li>
              <li style={styles.featureItem}>Phone number verification</li>
              <li style={styles.featureItem}>Display name approval</li>
              <li style={styles.featureItem}>Privacy policy URL</li>
            </ul>
           
          </div>
        </div>
      </div>

      <div style={styles.actionBar}>
        <button style={styles.secondaryButton}>
          View Documentation
        </button>
        <button style={styles.secondaryButton}>
          Test Connection
        </button>
        <a href="/dashboard/chat" style={styles.primaryLink}>
          <button style={styles.primaryButton}>
            Launch WhatsApp Chat
            <span style={styles.buttonIcon}>→</span>
          </button>
        </a>
      </div>


    </div>
  );
}

const styles = {
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '32px 24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#f8fafc',
    minHeight: '100vh'
  },
  header: {
    textAlign: 'center',
    marginBottom: 40
  },
  demoBadge: {
    display: 'inline-block',
    backgroundColor: '#6366f1',
    color: 'white',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    marginTop: '16px',
    letterSpacing: '0.5px'
  },
  successIcon: {
    width: 70,
    height: 70,
    borderRadius: '50%',
    backgroundColor: '#10b981',
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    boxShadow: '0 4px 20px rgba(16, 185, 129, 0.2)'
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    maxWidth: 500,
    margin: '0 auto',
    lineHeight: 1.5
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 320px',
    gap: 28,
    marginBottom: 40
  },
  connectionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 28,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    position: 'relative'
  },
  demoNotice: {
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    padding: '4px 16px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '500',
    border: '1px solid #e5e7eb'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: '#111827',
    margin: 0
  },
  environmentBadge: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
    padding: '5px 10px',
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.05em'
  },
  cardDescription: {
    color: '#6b7280',
    fontSize: 13,
    lineHeight: 1.5,
    marginBottom: 24,
    paddingBottom: 20,
    borderBottom: '1px solid #e5e7eb'
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 20
  },
  detailItem: {
    marginBottom: 4,
    position: 'relative'
  },
  testNote: {
    fontSize: '10px',
    color: '#9ca3af',
    fontStyle: 'italic',
    marginTop: '2px'
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 6,
    display: 'block'
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 500,
    color: '#111827',
    wordBreak: 'break-all'
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#d1fae5',
    color: '#065f46',
    padding: '5px 10px',
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600
  },
  statusDot: {
    width: 8,
    height: 8,
    backgroundColor: '#10b981',
    borderRadius: '50%',
    marginRight: 8
  },
  sidePanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: '#111827',
    marginTop: 0,
    marginBottom: 12
  },
  featureList: {
    margin: 0,
    paddingLeft: 18,
    marginBottom: '12px'
  },
  featureItem: {
    fontSize: 13,
    color: '#4b5563',
    marginBottom: 8,
    lineHeight: 1.4
  },
  featureNote: {
    fontSize: '11px',
    color: '#9ca3af',
    fontStyle: 'italic',
    borderTop: '1px dashed #e5e7eb',
    paddingTop: '8px'
  },
  actionBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24
  },
  primaryButton: {
    backgroundColor: '#25D366',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    transition: 'all 0.2s',
    boxShadow: '0 2px 8px rgba(37, 211, 102, 0.3)'
  },
  secondaryButton: {
    backgroundColor: 'white',
    color: '#374151',
    border: '1px solid #d1d5db',
    padding: '12px 20px',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  primaryLink: {
    textDecoration: 'none'
  },
  buttonIcon: {
    fontSize: 16,
    marginLeft: 2
  },
  footerNote: {
    backgroundColor: '#eff6ff',
    border: '1px solid #dbeafe',
    borderRadius: 8,
    padding: '16px 20px',
    textAlign: 'center'
  },
  noteText: {
    margin: 0,
    color: '#1e40af',
    fontSize: 13,
    lineHeight: 1.5
  }
};