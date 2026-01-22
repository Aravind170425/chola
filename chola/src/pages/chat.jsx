import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Button,
  Typography,
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextareaAutosize,
  Grid,
  Chip,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  EmojiEmotions as EmojiIcon,
  Send as SendIcon,
  Phone as PhoneIcon,
  Videocam as VideoIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  AccessTime as TimeIcon,
  CalendarToday as CalendarIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { DashboardSidebar } from "../componet/Dashboard/DashboardSidebar";

export default function Inbox() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const [contacts, setContacts] = useState([
    {
      id: 1,
      number: "+91 9876543210",
      name: "John Doe",
      status: "Online",
      lastSeen: "Just now",
      avatarColor: "#FF6B6B",
    },
    {
      id: 2,
      number: "+91 9123456789",
      name: "Jane Smith",
      status: "Away",
      lastSeen: "5 min ago",
      avatarColor: "#4ECDC4",
    },
    {
      id: 3,
      number: "+1 5551234561",
      name: "Robert Johnson",
      status: "Offline",
      lastSeen: "2 hours ago",
      avatarColor: "#45B7D1",
    },
    {
      id: 4,
      number: "+44 7712345678",
      name: "Emma Wilson",
      status: "Online",
      lastSeen: "Just now",
      avatarColor: "#96CEB4",
    },
    {
      id: 5,
      number: "+91 9988776655",
      name: "Alex Turner",
      status: "Busy",
      lastSeen: "30 min ago",
      avatarColor: "#FFEAA7",
    },
  ]);

  const [selectedId, setSelectedId] = useState(1);
  const [messages, setMessages] = useState({
    1: [
      { from: "agent", text: "Hello! How can I help you today?", time: "10:00 AM" },
      { from: "contact", text: "I need help with my order", time: "10:02 AM" },
      { from: "agent", text: "Sure, can you provide your order ID?", time: "10:03 AM" },
    ],
    2: [{ from: "contact", text: "Hi there!", time: "Yesterday" }],
  });
  const [input, setInput] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", number: "" });
  const [showContactsOnMobile, setShowContactsOnMobile] = useState(true);

  const selectedContact = contacts.find((c) => c.id === selectedId);

  // Initialize messages for new contacts
  useEffect(() => {
    contacts.forEach((contact) => {
      if (!messages[contact.id]) {
        setMessages((prev) => ({
          ...prev,
          [contact.id]: [],
        }));
      }
    });
  }, [contacts]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setMessages((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), { from: "agent", text: input, time }],
    }));

    setInput("");
  };

  const handleAddContact = () => {
    if (!newContact.name || !newContact.number) return;

    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setContacts((prev) => [
      ...prev,
      {
        id: Date.now(),
        number: newContact.number,
        name: newContact.name,
        status: "Offline",
        lastSeen: "Never",
        avatarColor: randomColor,
      },
    ]);

    setNewContact({ name: "", number: "" });
    setOpenAddDialog(false);
  };

  const deleteContact = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
      if (selectedId === id) {
        const remainingContacts = contacts.filter((c) => c.id !== id);
        setSelectedId(remainingContacts[0]?.id || null);
      }
    }
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.number.includes(searchQuery)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Online":
        return "#10B981";
      case "Away":
        return "#F59E0B";
      case "Busy":
        return "#EF4444";
      default:
        return "#9CA3AF";
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleContactSelect = (id) => {
    setSelectedId(id);
    setShowProfile(false);
    if (isMobile) {
      setShowContactsOnMobile(false);
    }
  };

  const handleBackToContacts = () => {
    setShowContactsOnMobile(true);
  };

  const renderMessageBubble = (message, index) => (
    <Box
      key={index}
      sx={{
        display: "flex",
        justifyContent: message.from === "agent" ? "flex-end" : "flex-start",
        mb: 2,
        alignItems: "flex-end",
      }}
    >
      {message.from === "contact" && (
        <Avatar
          sx={{
            bgcolor: selectedContact?.avatarColor,
            width: 32,
            height: 32,
            fontSize: 12,
            mr: 1,
          }}
        >
          {getInitials(selectedContact?.name || "")}
        </Avatar>
      )}
      <Box>
        <Paper
          elevation={1}
          sx={{
            p: 1.5,
            bgcolor: message.from === "agent" ? "primary.main" : "grey.100",
            color: message.from === "agent" ? "white" : "text.primary",
            borderRadius: message.from === "agent" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
            maxWidth: { xs: "85%", sm: "70%" },
          }}
        >
          <Typography variant="body2">{message.text}</Typography>
        </Paper>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: message.from === "agent" ? "right" : "left",
            ml: message.from === "contact" ? "44px" : 0,
            mt: 0.5,
            color: "text.secondary",
          }}
        >
          {message.time}
        </Typography>
      </Box>
    </Box>
  );

  const shouldShowContacts = !isMobile || (isMobile && showContactsOnMobile);
  const shouldShowChat = !isMobile || (isMobile && !showContactsOnMobile);

  return (
    <>
    <DashboardSidebar />
    <Box sx={{ display: "flex", height: "89vh", bgcolor: "grey.50", overflow: "hidden" }}>
      {/* Left Sidebar - Contacts */}
      {shouldShowContacts && (
        <Paper
          elevation={0}
          sx={{
            width: { xs: "100%", md: 320 },
            borderRight: "1px solid",
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
            bgcolor: "background.paper",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                fullWidth
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchQuery("")}>
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 20,
                    bgcolor: "grey.50",
                  },
                }}
              />
              <IconButton
                onClick={() => setOpenAddDialog(true)}
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>

          <List sx={{ flex: 1, overflow: "auto", p: 1 }}>
            {filteredContacts.map((contact) => (
              <ListItem
                key={contact.id}
                button
                selected={selectedId === contact.id}
                onClick={() => handleContactSelect(contact.id)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": { bgcolor: "primary.dark" },
                  },
                }}
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: getStatusColor(contact.status),
                        border: "2px solid white",
                      },
                    }}
                  >
                    <Avatar sx={{ bgcolor: contact.avatarColor }}>
                      {getInitials(contact.name)}
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" noWrap>
                      {contact.name}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="caption" display="block" noWrap>
                        {contact.number}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            bgcolor: getStatusColor(contact.status),
                          }}
                        />
                        <Typography variant="caption">
                          {contact.status} • {contact.lastSeen}
                        </Typography>
                      </Box>
                    </>
                  }
                  sx={{
                    "& .MuiListItemText-secondary": {
                      color: selectedId === contact.id ? "rgba(51, 47, 47, 0.7)" : "text.secondary",
                    },
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={() => deleteContact(contact.id)}
                    sx={{
                      color: selectedId === contact.id ? "white" : "error.main",
                      opacity: 0.7,
                      "&:hover": { opacity: 1 },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* Main Chat Area */}
      {shouldShowChat && selectedContact && (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            // minWidth: 0,
            width: "1000%",
            transition: "all 0.3s ease",
            transform: "translateX(0)",
            position: "relative",
            mr: showProfile ? { md: 45, lg: 48 } : 0,
          }}
        >
          {/* Chat Header */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "background.paper",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {isMobile && (
                <IconButton onClick={handleBackToContacts}>
                  <ArrowBackIcon />
                </IconButton>
              )}
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: getStatusColor(selectedContact.status),
                    border: "2px solid white",
                  },
                }}
              >
                <Avatar sx={{ bgcolor: selectedContact.avatarColor }}>
                  {getInitials(selectedContact.name)}
                </Avatar>
              </Badge>
              <Box>
                <Typography variant="h6">{selectedContact.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedContact.status} • {selectedContact.lastSeen}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              startIcon={<PersonIcon />}
              onClick={() => setShowProfile(!showProfile)}
              sx={{ borderRadius: 20 }}
            >
              {showProfile ? "Hide Profile" : "Show Profile"}
            </Button>
          </Paper>

          {/* Chat Messages */}
          <Box sx={{ flex: 1, overflow: "auto", p: 3, bgcolor: "grey.50" }}>
            {/* Welcome Message */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                mb: 4,
                px: 2,
              }}
            >
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: selectedContact.avatarColor,
                  mb: 2,
                  fontSize: 24,
                }}
              >
                {getInitials(selectedContact.name)}
              </Avatar>
              <Typography variant="h6" gutterBottom>
                {selectedContact.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This is the beginning of your conversation with {selectedContact.name}
              </Typography>
            </Box>

            {/* Messages */}
            {(messages[selectedId] || []).map((message, index) =>
              renderMessageBubble(message, index)
            )}
          </Box>

          {/* Message Input */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderTop: "1px solid",
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "background.paper",
            }}
          >
            <IconButton>
              <EmojiIcon />
            </IconButton>
            <TextField
              fullWidth
              placeholder={`Message ${selectedContact.name}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 20,
                  bgcolor: "grey.50",
                },
              }}
            />
            <IconButton
              onClick={sendMessage}
              disabled={!input.trim()}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                "&:hover": { bgcolor: "primary.dark" },
                "&.Mui-disabled": { bgcolor: "grey.400" },
              }}
            >
              <SendIcon />
            </IconButton>
          </Paper>
        </Box>
      )}

      {/* Profile Sidebar - Persistent Drawer */}
      <Drawer
        anchor="right"
        open={showProfile}
        onClose={() => setShowProfile(false)}
        variant={isMobile ? "temporary" : "persistent"}
        sx={{
          // width: { xs: "100%", sm: 380, lg: 400 },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: 380, lg: 400 },
            boxSizing: "border-box",
            position: "fixed",
            height: "100%",
            right: 0,
            top: 0,
            borderLeft: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        {selectedContact && (
          <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {/* Profile Header */}
            <Paper
              elevation={0}
              sx={{
                p: 1,
                 mt:7,
                borderBottom: "1px solid",
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: "background.paper",
              }}
            >
              <Typography variant="body1" sx={{fontSize:"bold"}}>Contact Profile</Typography>
              <IconButton onClick={() => setShowProfile(false)}>
                <CloseIcon />
              </IconButton>
            </Paper>

            {/* Profile Content */}
            <Box sx={{ flex: 1, overflow: "auto", p: 1 }}>
              {/* Avatar */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
                <Avatar
                  sx={{
                    width: { xs: 80, sm: 96 },
                    height: { xs: 80, sm: 96 },
                    bgcolor: selectedContact.avatarColor,
                    mb: 2,
                   
                    fontSize: { xs: 28, sm: 32 },
                  }}
                >
                  {getInitials(selectedContact.name)}
                </Avatar>
                <Chip
                  label={selectedContact.status}
                  size="small"
                  sx={{
                    bgcolor: `${getStatusColor(selectedContact.status)}20`,
                    color: getStatusColor(selectedContact.status),
                    "& .MuiChip-icon": {
                      color: getStatusColor(selectedContact.status),
                    },
                  }}
                  icon={
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: getStatusColor(selectedContact.status),
                      }}
                    />
                  }
                />
              </Box>

              {/* Contact Info */}
              <Box sx={{ mb: 4 }}>
                <InfoRow icon={<PersonIcon fontSize="small" />} label="Full Name" value={selectedContact.name} />
                <InfoRow icon={<PhoneIcon fontSize="small" />} label="Phone Number" value={selectedContact.number} />
                <InfoRow 
                  icon={
                    <Box 
                      sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: "50%", 
                        bgcolor: getStatusColor(selectedContact.status) 
                      }} 
                    />
                  } 
                  label="Status" 
                  value={selectedContact.status} 
                />
                <InfoRow icon={<TimeIcon fontSize="small" />} label="Last Seen" value={selectedContact.lastSeen} />
                <InfoRow icon={<CalendarIcon fontSize="small" />} label="Contact Since" value="February 15, 2024" />
              </Box>

              {/* Action Buttons */}
              <Grid container spacing={1} sx={{ mb: 4 }}>
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<PhoneIcon />}
                    sx={{ borderRadius: 2 }}
                  >
                    Call
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<VideoIcon />}
                    sx={{ borderRadius: 2 }}
                  >
                    Video
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<EmailIcon />}
                    sx={{ borderRadius: 2 }}
                  >
                    Email
                  </Button>
                </Grid>
              </Grid>

              {/* Conversation Stats */}
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Conversation Stats
              </Typography>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={4}>
                  <Card variant="outlined" sx={{ textAlign: "center", height: "100%" }}>
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="h5" color="primary">
                        {(messages[selectedId] || []).length}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Total Messages
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card variant="outlined" sx={{ textAlign: "center", height: "100%" }}>
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="h5" color="primary">
                        {(messages[selectedId] || []).filter((m) => m.from === "contact").length}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        From Contact
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card variant="outlined" sx={{ textAlign: "center", height: "100%" }}>
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="h5" color="primary">
                        {(messages[selectedId] || []).filter((m) => m.from === "agent").length}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        From You
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Notes Section */}
              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Notes
                </Typography>
                <TextareaAutosize
                  minRows={4}
                  placeholder="Add notes about this contact..."
                  defaultValue="Important client. Prefers morning calls."
                  style={{
                    width: "100%",
                    padding: 12,
                    borderRadius: 8,
                    border: `1px solid ${theme.palette.divider}`,
                    fontFamily: theme.typography.fontFamily,
                    fontSize: theme.typography.body2.fontSize,
                    resize: "vertical",
                    marginBottom: 12,
                  }}
                />
                <Button fullWidth variant="contained" sx={{ borderRadius: 2 }}>
                  Save Notes
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Drawer>

      {/* Add Contact Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New Contact</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Full Name"
            fullWidth
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            sx={{ mb: 3 }}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            fullWidth
            value={newContact.number}
            onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddContact} variant="contained">
            Add Contact
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </>
  );
}

// Helper component for profile info rows
function InfoRow({ icon, label, value }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Box sx={{ width: 40, display: "flex", justifyContent: "center", alignItems: "center" }}>
        {icon}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}