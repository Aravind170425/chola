import { useState, useEffect } from "react";

export default function Inbox() {
  const [contacts, setContacts] = useState([
    { 
      id: 1, 
      number: "+91 9876543210", 
      name: "John Doe",
      status: "Online",
      lastSeen: "Just now",
      avatarColor: "#FF6B6B"
    },
    { 
      id: 2, 
      number: "+91 9123456789", 
      name: "Jane Smith",
      status: "Away",
      lastSeen: "5 min ago",
      avatarColor: "#4ECDC4"
    },
    { 
      id: 3, 
      number: "+1 5551234561", 
      name: "Robert Johnson",
      status: "Offline",
      lastSeen: "2 hours ago",
      avatarColor: "#45B7D1"
    },
    { 
      id: 4, 
      number: "+44 7712345678", 
      name: "Emma Wilson",
      status: "Online",
      lastSeen: "Just now",
      avatarColor: "#96CEB4"
    },
    { 
      id: 5, 
      number: "+91 9988776655", 
      name: "Alex Turner",
      status: "Busy",
      lastSeen: "30 min ago",
      avatarColor: "#FFEAA7"
    }
  ]);

  const [selectedId, setSelectedId] = useState(1);
  const [messages, setMessages] = useState({
    1: [
      { from: "agent", text: "Hello! How can I help you today?", time: "10:00 AM" },
      { from: "contact", text: "I need help with my order", time: "10:02 AM" },
      { from: "agent", text: "Sure, can you provide your order ID?", time: "10:03 AM" }
    ],
    2: [
      { from: "contact", text: "Hi there!", time: "Yesterday" }
    ]
  });
  const [input, setInput] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedContact = contacts.find(c => c.id === selectedId);

  // Initialize messages for new contacts
  useEffect(() => {
    contacts.forEach(contact => {
      if (!messages[contact.id]) {
        setMessages(prev => ({
          ...prev,
          [contact.id]: []
        }));
      }
    });
  }, [contacts]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => ({
      ...prev,
      [selectedId]: [
        ...(prev[selectedId] || []),
        { from: "agent", text: input, time }
      ]
    }));

    setInput("");
  };

  const addContact = () => {
    const number = prompt("Enter phone number");
    if (!number) return;

    const name = prompt("Enter contact name") || "New Contact";
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setContacts(prev => [
      ...prev,
      { 
        id: Date.now(), 
        number,
        name,
        status: "Offline",
        lastSeen: "Never",
        avatarColor: randomColor
      }
    ]);
  };

  const deleteContact = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this contact?")) {
      setContacts(prev => prev.filter(c => c.id !== id));
      if (selectedId === id) {
        setSelectedId(contacts.filter(c => c.id !== id)[0]?.id || null);
      }
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.number.includes(searchQuery)
  );

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div style={styles.page}>
      {/* LEFT CONTACT SECTION */}
      <div style={styles.left}>
        <div style={styles.leftHeader}>
          <div style={styles.searchContainer}>
            <div style={styles.searchIcon}>🔍</div>
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                style={styles.clearSearch}
              >
                ×
              </button>
            )}
          </div>
          <button onClick={addContact} style={styles.addBtn} title="Add Contact">
            <span style={styles.addIcon}>＋</span>
          </button>
        </div>

        <div style={styles.contactList}>
          {filteredContacts.map(c => (
            <div
              key={c.id}
              onClick={() => {
                setSelectedId(c.id);
                setShowProfile(false);
              }}
              style={{
                ...styles.contact,
                background: selectedId === c.id ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "transparent",
                color: selectedId === c.id ? "white" : "#374151"
              }}
            >
              <div 
                style={{
                  ...styles.avatar,
                  background: selectedId === c.id ? "rgba(255,255,255,0.2)" : c.avatarColor,
                  color: selectedId === c.id ? "white" : "white"
                }}
              >
                {getInitials(c.name)}
              </div>
              <div style={styles.contactInfo}>
                <strong style={styles.contactName}>{c.name}</strong>
                <span style={styles.contactNumber}>{c.number}</span>
                <div style={styles.statusContainer}>
                  <div 
                    style={{
                      ...styles.statusDot,
                      background: c.status === "Online" ? "#10B981" : 
                                 c.status === "Away" ? "#F59E0B" : 
                                 c.status === "Busy" ? "#EF4444" : "#9CA3AF"
                    }}
                  />
                  <span style={styles.statusText}>{c.status}</span>
                </div>
              </div>
              <button 
                onClick={(e) => deleteContact(c.id, e)}
                style={styles.deleteBtn}
                title="Delete Contact"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CENTER CHAT SECTION */}
      <div style={styles.center}>
        {/* CHAT NAVBAR */}
        <div style={styles.chatHeader}>
          <div style={styles.chatHeaderLeft}>
            <div 
              style={{
                ...styles.avatarBig,
                background: selectedContact?.avatarColor
              }}
            >
              {selectedContact && getInitials(selectedContact.name)}
            </div>
            <div style={styles.contactDetails}>
              <strong style={styles.contactNameBig}>{selectedContact?.name}</strong>
              <span style={styles.contactStatus}>{selectedContact?.status} • {selectedContact?.lastSeen}</span>
            </div>
          </div>
          <button 
            onClick={() => setShowProfile(!showProfile)}
            style={styles.profileBtn}
            title={showProfile ? "Close Profile" : "Open Profile"}
          >
            {showProfile ? "← Hide Profile" : "👤 Show Profile"}
          </button>
        </div>

        {/* CHAT BODY */}
        <div style={styles.chatBody}>
          <div style={styles.welcomeMessage}>
            <div style={styles.welcomeAvatar}>
              {selectedContact && getInitials(selectedContact.name)}
            </div>
            <div style={styles.welcomeText}>
              <strong>{selectedContact?.name}</strong>
              <p>This is the beginning of your conversation with {selectedContact?.name}</p>
            </div>
          </div>

          {(messages[selectedId] || []).map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: m.from === "agent" ? "flex-end" : "flex-start",
                marginBottom: 16,
                alignItems: "flex-end"
              }}
            >
              {m.from === "contact" && (
                <div 
                  style={{
                    ...styles.avatarSmall,
                    background: selectedContact?.avatarColor,
                    marginRight: 8
                  }}
                >
                  {selectedContact && getInitials(selectedContact.name)}
                </div>
              )}
              <div>
                <div
                  style={{
                    ...styles.bubble,
                    background: m.from === "agent" ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#F3F4F6",
                    color: m.from === "agent" ? "white" : "#374151",
                    borderRadius: m.from === "agent" ? "18px 18px 4px 18px" : "18px 18px 18px 4px"
                  }}
                >
                  {m.text}
                </div>
                <div 
                  style={{
                    ...styles.messageTime,
                    textAlign: m.from === "agent" ? "right" : "left",
                    marginLeft: m.from === "contact" ? "44px" : "0"
                  }}
                >
                  {m.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* INPUT BAR */}
        <div style={styles.inputBar}>
          <button style={styles.emojiBtn}>😊</button>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`Message ${selectedContact?.name}...`}
            style={styles.input}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
          />
          <button 
            onClick={sendMessage} 
            style={{
              ...styles.sendBtn,
              opacity: input.trim() ? 1 : 0.5
            }}
            disabled={!input.trim()}
          >
            <span style={styles.sendIcon}>➤</span>
          </button>
        </div>
      </div>

      {/* RIGHT PROFILE SECTION */}
      {showProfile && selectedContact && (
        <div style={styles.right}>
          <div style={styles.profileHeader}>
            <h3 style={styles.profileTitle}>Contact Profile</h3>
            <button 
              onClick={() => setShowProfile(false)}
              style={styles.closeBtn}
              title="Close Profile"
            >
              ×
            </button>
          </div>

          <div style={styles.profileContent}>
            <div style={styles.profileAvatarContainer}>
              <div 
                style={{
                  ...styles.profileAvatar,
                  background: `linear-gradient(135deg, ${selectedContact.avatarColor}20, ${selectedContact.avatarColor})`
                }}
              >
                {getInitials(selectedContact.name)}
              </div>
              <div style={styles.profileStatus}>
                <div 
                  style={{
                    ...styles.profileStatusDot,
                    background: selectedContact.status === "Online" ? "#10B981" : 
                               selectedContact.status === "Away" ? "#F59E0B" : 
                               selectedContact.status === "Busy" ? "#EF4444" : "#9CA3AF"
                  }}
                />
                <span>{selectedContact.status}</span>
              </div>
            </div>

            <div style={styles.profileInfo}>
              <div style={styles.infoSection}>
                <label style={styles.infoLabel}>Full Name</label>
                <div style={styles.infoValue}>{selectedContact.name}</div>
              </div>

              <div style={styles.infoSection}>
                <label style={styles.infoLabel}>Phone Number</label>
                <div style={styles.infoValue}>{selectedContact.number}</div>
              </div>

              <div style={styles.infoSection}>
                <label style={styles.infoLabel}>Status</label>
                <div style={styles.infoValue}>{selectedContact.status}</div>
              </div>

              <div style={styles.infoSection}>
                <label style={styles.infoLabel}>Last Seen</label>
                <div style={styles.infoValue}>{selectedContact.lastSeen}</div>
              </div>

              <div style={styles.infoSection}>
                <label style={styles.infoLabel}>Contact Since</label>
                <div style={styles.infoValue}>February 15, 2024</div>
              </div>
            </div>

            <div style={styles.profileActions}>
              <button style={styles.actionBtn}>
                <span style={styles.actionIcon}>📞</span>
                Call
              </button>
              <button style={styles.actionBtn}>
                <span style={styles.actionIcon}>📹</span>
                Video
              </button>
              <button style={styles.actionBtn}>
                <span style={styles.actionIcon}>✉️</span>
                Email
              </button>
            </div>

            <div style={styles.statsSection}>
              <h4 style={styles.statsTitle}>Conversation Stats</h4>
              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>
                    {(messages[selectedId] || []).length}
                  </div>
                  <div style={styles.statLabel}>Total Messages</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>
                    {(messages[selectedId] || []).filter(m => m.from === "contact").length}
                  </div>
                  <div style={styles.statLabel}>From Contact</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>
                    {(messages[selectedId] || []).filter(m => m.from === "agent").length}
                  </div>
                  <div style={styles.statLabel}>From You</div>
                </div>
              </div>
            </div>

            <div style={styles.notesSection}>
              <h4 style={styles.notesTitle}>Notes</h4>
              <textarea
                placeholder="Add notes about this contact..."
                style={styles.notesInput}
                defaultValue={`Important client. Prefers morning calls.`}
              />
              <button style={styles.saveNotesBtn}>
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "#f8fafc"
  },

  left: {
    width: 320,
    background: "white",
    borderRight: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column"
  },

  leftHeader: {
    padding: "16px",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "white"
  },

  searchContainer: {
    flex: 1,
    position: "relative",
    display: "flex",
    alignItems: "center"
  },

  searchIcon: {
    position: "absolute",
    left: "12px",
    color: "#94a3b8",
    fontSize: "14px"
  },

  searchInput: {
    width: "100%",
    padding: "8px 12px 8px 32px",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s ease",
    ":focus": {
      borderColor: "#667eea",
      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)"
    }
  },

  clearSearch: {
    position: "absolute",
    right: "8px",
    background: "none",
    border: "none",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: "18px",
    padding: "0"
  },

  addBtn: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "none",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    cursor: "pointer",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s ease",
    ":hover": {
      transform: "scale(1.1)"
    }
  },

  addIcon: {
    display: "block",
    lineHeight: "1"
  },

  contactList: {
    flex: 1,
    overflowY: "auto",
    padding: "8px"
  },

  contact: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    borderRadius: "12px",
    cursor: "pointer",
    marginBottom: "4px",
    transition: "all 0.2s ease",
    position: "relative",
    ":hover": {
      background: "linear-gradient(135deg, #667eea20 0%, #764ba220 100%)"
    }
  },

  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "12px",
    fontWeight: "600",
    fontSize: "14px",
    flexShrink: "0"
  },

  contactInfo: {
    flex: 1,
    minWidth: "0"
  },

  contactName: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "2px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },

  contactNumber: {
    fontSize: "12px",
    color: "inherit",
    opacity: "0.8",
    display: "block",
    marginBottom: "4px"
  },

  statusContainer: {
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },

  statusDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%"
  },

  statusText: {
    fontSize: "11px",
    fontWeight: "500"
  },

  deleteBtn: {
    background: "none",
    border: "none",
    color: "#ef4444",
    cursor: "pointer",
    fontSize: "14px",
    padding: "4px",
    opacity: "0.6",
    transition: "opacity 0.2s ease",
    ":hover": {
      opacity: "1"
    }
  },

  center: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: "white"
  },

  chatHeader: {
    padding: "16px 20px",
    borderBottom: "1px solid #e2e8f0",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },

  chatHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },

  avatarBig: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "600",
    fontSize: "16px",
    flexShrink: "0"
  },

  contactDetails: {
    display: "flex",
    flexDirection: "column"
  },

  contactNameBig: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1e293b"
  },

  contactStatus: {
    fontSize: "12px",
    color: "#64748b"
  },

  profileBtn: {
    padding: "8px 16px",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
    background: "white",
    color: "#64748b",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.2s ease",
    ":hover": {
      background: "#f8fafc",
      borderColor: "#cbd5e1"
    }
  },

  chatBody: {
    flex: 1,
    padding: "20px",
    background: "#f8fafc",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column"
  },

  welcomeMessage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "32px 20px",
    textAlign: "center",
    marginBottom: "24px"
  },

  welcomeAvatar: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "600",
    fontSize: "20px",
    marginBottom: "16px"
  },

  welcomeText: {
    maxWidth: "400px"
  },

  avatarSmall: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "600",
    fontSize: "12px",
    flexShrink: "0"
  },

  bubble: {
    maxWidth: "65%",
    padding: "12px 16px",
    fontSize: "14px",
    lineHeight: "1.4",
    wordBreak: "break-word",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  },

  messageTime: {
    fontSize: "11px",
    color: "#94a3b8",
    marginTop: "4px",
    padding: "0 4px"
  },

  inputBar: {
    padding: "16px 20px",
    borderTop: "1px solid #e2e8f0",
    background: "white",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },

  emojiBtn: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "8px",
    ":hover": {
      background: "#f8fafc"
    }
  },

  input: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: "24px",
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s ease",
    ":focus": {
      borderColor: "#667eea",
      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)"
    }
  },

  sendBtn: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    ":disabled": {
      cursor: "not-allowed"
    }
  },

  sendIcon: {
    transform: "rotate(90deg)",
    fontSize: "16px",
    marginLeft: "2px"
  },

  right: {
    width: "380px",
    background: "white",
    borderLeft: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    boxShadow: "-2px 0 8px rgba(0,0,0,0.1)"
  },

  profileHeader: {
    padding: "20px",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },

  profileTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0"
  },

  closeBtn: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "none",
    background: "#f1f5f9",
    color: "#64748b",
    cursor: "pointer",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    ":hover": {
      background: "#e2e8f0"
    }
  },

  profileContent: {
    flex: 1,
    overflowY: "auto",
    padding: "20px"
  },

  profileAvatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "32px"
  },

  profileAvatar: {
    width: "96px",
    height: "96px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "600",
    fontSize: "32px",
    marginBottom: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)"
  },

  profileStatus: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 16px",
    borderRadius: "20px",
    background: "#f8fafc",
    fontSize: "14px",
    fontWeight: "500"
  },

  profileStatusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%"
  },

  profileInfo: {
    marginBottom: "32px"
  },

  infoSection: {
    marginBottom: "20px"
  },

  infoLabel: {
    display: "block",
    fontSize: "12px",
    color: "#64748b",
    fontWeight: "500",
    marginBottom: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },

  infoValue: {
    fontSize: "14px",
    color: "#1e293b",
    fontWeight: "500",
    padding: "8px 0",
    borderBottom: "1px solid #f1f5f9"
  },

  profileActions: {
    display: "flex",
    gap: "8px",
    marginBottom: "32px"
  },

  actionBtn: {
    flex: 1,
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    background: "white",
    color: "#64748b",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.2s ease",
    ":hover": {
      background: "#f8fafc",
      borderColor: "#cbd5e1"
    }
  },

  actionIcon: {
    fontSize: "16px"
  },

  statsSection: {
    marginBottom: "32px"
  },

  statsTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "16px",
    paddingBottom: "8px",
    borderBottom: "1px solid #f1f5f9"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px"
  },

  statCard: {
    padding: "16px",
    borderRadius: "12px",
    background: "#f8fafc",
    textAlign: "center"
  },

  statNumber: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "4px"
  },

  statLabel: {
    fontSize: "11px",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },

  notesSection: {
    marginBottom: "20px"
  },

  notesTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "12px"
  },

  notesInput: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    fontSize: "14px",
    minHeight: "80px",
    resize: "vertical",
    marginBottom: "12px",
    outline: "none",
    transition: "all 0.2s ease",
    ":focus": {
      borderColor: "#667eea",
      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)"
    }
  },

  saveNotesBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "opacity 0.2s ease",
    ":hover": {
      opacity: "0.9"
    }
  }
};