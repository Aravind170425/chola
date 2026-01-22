export default function WhatsappSuccess() {
  const fakeData = {
    business_id: "123456789012345",
    waba_id: "987654321098765",
    phone_number_id: "15556667777",
    status: "CONNECTED"
  };

  return (
    <div style={{ padding: 40 }}>
      <h2 style={{ color: "green" }}>✅ WhatsApp Connected Successfully</h2>

      <p>Your WhatsApp Business account has been linked to your platform.</p>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: 20,
          maxWidth: 520,
          background: "#f9f9f9"
        }}
      >
        {/* 👇 THIS IS THE IMPORTANT PART */}
        <h4>Connection Details (Sandbox / Test Environment)</h4>

        <p style={{ color: "#777", fontSize: 13, marginTop: -5 }}>
          These values are generated in Meta’s test environment for demo purposes only.
        </p>

        <hr />

        <p><strong>Business ID:</strong> {fakeData.business_id}</p>
        <p><strong>WABA ID:</strong> {fakeData.waba_id}</p>
        <p><strong>Phone Number ID:</strong> {fakeData.phone_number_id}</p>
        <p><strong>Status:</strong> {fakeData.status}</p>
      </div>

      <br />

      <a href="/dashboard/chat">
        <button
          style={{
            padding: "10px 20px",
            background: "#25D366",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          Go to Chat
        </button>
      </a>
    </div>
  );
}
