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
  Snackbar,
  Alert,
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
  AttachFile as AttachFileIcon,
} from "@mui/icons-material";
import { DashboardSidebar } from "../componet/Dashboard/DashboardSidebar";

export default function Inbox() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  // State for notifications
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [contacts, setContacts] = useState([
    {
      id: 1,
      number: "+91 7449213799",
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
  const [showProfile, setShowProfile] = useState(true); // Always show profile
  const [searchQuery, setSearchQuery] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", number: "" });
  const [showContactsOnMobile, setShowContactsOnMobile] = useState(true);
  const [messageType, setMessageType] = useState("text");
  const [selectedTemplate, setSelectedTemplate] = useState("jaspers_market_order_confirmation_v1");
  const [templateParams, setTemplateParams] = useState(["John Doe", "ORD-123456", "Jan 22, 2026"]);
  
  // Available templates
  const availableTemplates = [
    {
      name: "jaspers_market_order_confirmation_v1",
      displayName: "Order Confirmation",
      params: ["Customer Name", "Order ID", "Date"],
      description: "Send order confirmation to customers"
    },
    {
      name: "jaspers_market_shipping_update_v1",
      displayName: "Shipping Update",
      params: ["Order ID", "Tracking Number", "ETA"],
      description: "Notify customers about shipping updates"
    },
    {
      name: "jaspers_market_payment_reminder_v1",
      displayName: "Payment Reminder",
      params: ["Customer Name", "Invoice Number", "Due Date"],
      description: "Send payment reminder to customers"
    }
  ];

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

  // Function to send message via WhatsApp API
  const sendWhatsAppMessage = async (messageData) => {
    try {
      const response = await fetch('https://protandrous-unoiled-ricki.ngrok-free.dev/api/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw error;
    }
  };

  const sendMessage = async () => {
    if (!input.trim() && messageType === "text") {
      setSnackbar({
        open: true,
        message: "Message cannot be empty",
        severity: "warning",
      });
      return;
    }

    try {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      if (messageType === "template" && selectedContact) {
        // Prepare template parameters
        const params = selectedTemplate === "jaspers_market_order_confirmation_v1" 
          ? templateParams 
          : ["John Doe", "ORD-123456", "Jan 22, 2026"];

        // Prepare WhatsApp message data
        const whatsappData = {
          to: selectedContact.number.replace(/\D/g, ''),
          type: "template",
          templateName: selectedTemplate,
          templateParams: params,
        };

        // Send via API
        const apiResult = await sendWhatsAppMessage(whatsappData);
        
        // Add to local messages with template info
        const templateDisplay = availableTemplates.find(t => t.name === selectedTemplate);
        const messageText = `[Template Sent: ${templateDisplay?.displayName || selectedTemplate}]`;
        
        setMessages((prev) => ({
          ...prev,
          [selectedId]: [...(prev[selectedId] || []), { 
            from: "agent", 
            text: messageText, 
            time,
            isTemplate: true,
            templateName: selectedTemplate,
            templateParams: params
          }],
        }));

        setSnackbar({
          open: true,
          message: `Template "${templateDisplay?.displayName}" sent successfully!`,
          severity: "success",
        });
      } else {
        // Send regular text message
        setMessages((prev) => ({
          ...prev,
          [selectedId]: [...(prev[selectedId] || []), { from: "agent", text: input, time }],
        }));

        setSnackbar({
          open: true,
          message: "Message sent!",
          severity: "success",
        });
      }

      setInput("");
      
      // Switch back to text mode after sending template
      if (messageType === "template") {
        setMessageType("text");
        setOpenTemplateDialog(false);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setSnackbar({
        open: true,
        message: `Failed to send message: ${error.message}`,
        severity: "error",
      });
    }
  };

  const handleAddContact = () => {
    if (!newContact.name || !newContact.number) {
      setSnackbar({
        open: true,
        message: "Please fill in all fields",
        severity: "warning",
      });
      return;
    }

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
    
    setSnackbar({
      open: true,
      message: "Contact added successfully!",
      severity: "success",
    });
  };

  const deleteContact = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
      if (selectedId === id) {
        const remainingContacts = contacts.filter((c) => c.id !== id);
        setSelectedId(remainingContacts[0]?.id || null);
      }
      
      setSnackbar({
        open: true,
        message: "Contact deleted successfully!",
        severity: "info",
      });
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template.name);
    setOpenTemplateDialog(true);
  };

  const handleSendTemplate = () => {
    // Check if all template parameters are filled
    const emptyParams = templateParams.filter(param => !param.trim());
    if (emptyParams.length > 0) {
      setSnackbar({
        open: true,
        message: "Please fill in all template parameters",
        severity: "warning",
      });
      return;
    }
    sendMessage();
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
        mb: 1.5,
        alignItems: "flex-end",
      }}
    >
      {message.from === "contact" && (
        <Avatar
          sx={{
            bgcolor: selectedContact?.avatarColor,
            width: 28,
            height: 28,
            fontSize: 11,
            mr: 0.5,
          }}
        >
          {getInitials(selectedContact?.name || "")}
        </Avatar>
      )}
      <Box>
        <Paper
          elevation={0}
          sx={{
            p: 1,
            bgcolor: message.from === "agent" ? "primary.main" : "grey.100",
            color: message.from === "agent" ? "white" : "text.primary",
            borderRadius: message.from === "agent" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
            maxWidth: { xs: "85%", sm: "70%" },
            position: "relative",
            border: "1px solid",
            borderColor: message.from === "agent" ? "transparent" : "divider",
          }}
        >
          {message.isTemplate && (
            <Chip
              label="Template"
              size="small"
              sx={{
                position: "absolute",
                top: -8,
                left: 8,
                bgcolor: "secondary.main",
                color: "white",
                fontSize: "0.55rem",
                height: 18,
                "& .MuiChip-label": { px: 0.5 },
              }}
            />
          )}
          <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>{message.text}</Typography>
          {message.templateName && (
            <Box sx={{ mt: 0.5, pt: 0.5, borderTop: "1px dashed rgba(255,255,255,0.3)" }}>
              <Typography variant="caption" sx={{ opacity: 0.9, display: "block", fontSize: '0.7rem' }}>
                <strong>Template:</strong> {message.templateName}
              </Typography>
              {message.templateParams && (
                <Typography variant="caption" sx={{ opacity: 0.8, display: "block", mt: 0.25, fontSize: '0.65rem' }}>
                  <strong>Params:</strong> {message.templateParams.join(", ")}
                </Typography>
              )}
            </Box>
          )}
        </Paper>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: message.from === "agent" ? "right" : "left",
            ml: message.from === "contact" ? "36px" : 0,
            mt: 0.25,
            color: "text.secondary",
            fontSize: '0.7rem',
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
      <Box sx={{ display: "flex", height: "calc(100vh - 64px)", bgcolor: 'background.default', overflow: "hidden" }}>
        {/* Left Sidebar - Contacts */}
        {shouldShowContacts && (
          <Paper
            elevation={0}
            sx={{
              width: { xs: "100%", md: 300 },
              borderRight: "1px solid",
              borderColor: "divider",
              display: "flex",
              flexDirection: "column",
              bgcolor: "background.paper",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Box sx={{ p: 1.5, borderBottom: "1px solid", borderColor: "divider" }}>
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
                        <SearchIcon fontSize="small" sx={{ fontSize: '1rem' }} />
                      </InputAdornment>
                    ),
                    endAdornment: searchQuery && (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setSearchQuery("")} sx={{ p: 0.5 }}>
                          <ClearIcon fontSize="small" sx={{ fontSize: '0.9rem' }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 20,
                      bgcolor: "grey.50",
                      fontSize: '0.875rem',
                      height: 36,
                    },
                  }}
                />
                <IconButton
                  onClick={() => setOpenAddDialog(true)}
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    width: 36,
                    height: 36,
                    "&:hover": { bgcolor: "primary.dark" },
                  }}
                >
                  <AddIcon sx={{ fontSize: '1rem' }} />
                </IconButton>
              </Box>
            </Box>

            <List sx={{ flex: 1, overflow: "auto", p: 0.5 }}>
              {filteredContacts.map((contact) => (
                <ListItem
                  key={contact.id}
                  button
                  selected={selectedId === contact.id}
                  onClick={() => handleContactSelect(contact.id)}
                  sx={{
                    borderRadius: 1.5,
                    mb: 0.5,
                    px: 1.5,
                    py: 1,
                    "&.Mui-selected": {
                      bgcolor: "primary.main",
                      color: "white",
                      "&:hover": { bgcolor: "primary.dark" },
                    },
                  }}
                >
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                      sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: getStatusColor(contact.status),
                          border: "1.5px solid white",
                          width: 10,
                          height: 10,
                          minWidth: 10,
                        },
                      }}
                    >
                      <Avatar 
                        sx={{ 
                          bgcolor: contact.avatarColor,
                          width: 32,
                          height: 32,
                          fontSize: '0.8rem'
                        }}
                      >
                        {getInitials(contact.name)}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" noWrap sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                        {contact.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="caption" display="block" noWrap sx={{ fontSize: '0.75rem' }}>
                          {contact.number}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.25 }}>
                          <Box
                            sx={{
                              width: 5,
                              height: 5,
                              borderRadius: "50%",
                              bgcolor: getStatusColor(contact.status),
                            }}
                          />
                          <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                            {contact.status} • {contact.lastSeen}
                          </Typography>
                        </Box>
                      </>
                    }
                    sx={{
                      "& .MuiListItemText-secondary": {
                        color: selectedId === contact.id ? "rgba(67, 64, 64, 0.7)" : "text.secondary",
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
                        p: 0.5,
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: '0.9rem' }} />
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
              bgcolor: 'background.default',
            }}
          >
            {/* Chat Header */}
            <Paper
              elevation={0}
              sx={{
                p: 1.5,
                borderBottom: "1px solid",
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: "background.paper",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                {isMobile && (
                  <IconButton onClick={handleBackToContacts} size="small">
                    <ArrowBackIcon sx={{ fontSize: '1.1rem' }} />
                  </IconButton>
                )}
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: getStatusColor(selectedContact.status),
                      border: "1.5px solid white",
                      width: 10,
                      height: 10,
                    },
                  }}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: selectedContact.avatarColor,
                      width: 36,
                      height: 36,
                      fontSize: '0.9rem'
                    }}
                  >
                    {getInitials(selectedContact.name)}
                  </Avatar>
                </Badge>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontSize: '0.95rem', fontWeight: 600 }}>
                    {selectedContact.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                    {selectedContact.status} • {selectedContact.lastSeen}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Chat Messages */}
            <Box sx={{ flex: 1, overflow: "auto", p: 2, bgcolor: 'background.default' }}>
              {/* Welcome Message */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  mb: 3,
                  px: 1,
                }}
              >
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: selectedContact.avatarColor,
                    mb: 1.5,
                    fontSize: '1.1rem',
                  }}
                >
                  {getInitials(selectedContact.name)}
                </Avatar>
                <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '0.95rem', fontWeight: 600 }}>
                  {selectedContact.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                  Start of conversation with {selectedContact.name}
                </Typography>
              </Box>

              {/* Messages */}
              {(messages[selectedId] || []).map((message, index) =>
                renderMessageBubble(message, index)
              )}
            </Box>

            {/* Message Input Area */}
            <Paper
              elevation={0}
              sx={{
                p: 1.5,
                borderTop: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              {/* Message Type Selector */}
              <Box sx={{ display: "flex", gap: 0.5, mb: 1 }}>
                <Button
                  variant={messageType === "text" ? "contained" : "outlined"}
                  size="small"
                  onClick={() => setMessageType("text")}
                  sx={{ fontSize: '0.75rem', px: 1.5, py: 0.25, borderRadius: 1 }}
                >
                  Text
                </Button>
                <Button
                  variant={messageType === "template" ? "contained" : "outlined"}
                  size="small"
                  onClick={() => setMessageType("template")}
                  sx={{ fontSize: '0.75rem', px: 1.5, py: 0.25, borderRadius: 1 }}
                >
                  Template
                </Button>
              </Box>

              {/* Template Selection */}
              {messageType === "template" && (
                <Box sx={{ mb: 1.5, p: 1.5, bgcolor: "grey.50", borderRadius: 1.5 }}>
                  <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
                    Select Template:
                  </Typography>
                  <Grid container spacing={1}>
                    {availableTemplates.map((template) => (
                      <Grid item xs={12} sm={6} md={4} key={template.name}>
                        <Card
                          variant="outlined"
                          sx={{
                            cursor: "pointer",
                            "&:hover": {
                              borderColor: "primary.main",
                              bgcolor: "primary.50",
                            },
                          }}
                          onClick={() => handleTemplateSelect(template)}
                        >
                          <CardContent sx={{ p: 1.5 }}>
                            <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '0.8rem' }}>
                              {template.displayName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                              {template.description}
                            </Typography>
                            <Typography variant="caption" display="block" sx={{ mt: 0.5, fontSize: '0.65rem' }}>
                              Params: {template.params.join(", ")}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Message Input */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <IconButton size="small" sx={{ p: 0.5 }}>
                  <EmojiIcon sx={{ fontSize: '1.1rem' }} />
                </IconButton>
                <IconButton size="small" sx={{ p: 0.5 }}>
                  <AttachFileIcon sx={{ fontSize: '1.1rem' }} />
                </IconButton>
                <TextField
                  fullWidth
                  placeholder={
                    messageType === "template"
                      ? "Select a template..."
                      : `Message ${selectedContact.name}...`
                  }
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  size="small"
                  disabled={messageType === "template"}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 20,
                      bgcolor: "grey.50",
                      fontSize: '0.875rem',
                      height: 36,
                    },
                  }}
                />
                <IconButton
                  onClick={sendMessage}
                  disabled={messageType === "text" ? !input.trim() : false}
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    width: 36,
                    height: 36,
                    "&:hover": { bgcolor: "primary.dark" },
                    "&.Mui-disabled": { bgcolor: "grey.400" },
                  }}
                >
                  <SendIcon sx={{ fontSize: '1rem' }} />
                </IconButton>
              </Box>
            </Paper>
          </Box>
        )}

        {/* Profile Sidebar - ALWAYS VISIBLE */}
        <Box
          sx={{
            width: { xs: 0, md: 320 }, // Hidden on mobile, visible on desktop
            display: { xs: 'none', md: 'block' },
            borderLeft: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            height: "100%",
            overflow: "auto",
          }}
        >
          {selectedContact && (
            <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              {/* Profile Header */}
              <Box
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
                <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                  Contact Profile
                </Typography>
                <IconButton onClick={() => setShowProfile(false)} size="small" sx={{ display: { md: 'none' } }}>
                  <CloseIcon sx={{ fontSize: '1rem' }} />
                </IconButton>
              </Box>

              {/* Profile Content */}
              <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
                {/* Avatar */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: selectedContact.avatarColor,
                      mb: 2,
                      fontSize: '1.5rem',
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
                      fontSize: '0.75rem',
                      height: 24,
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
                  <InfoRow icon={<PersonIcon sx={{ fontSize: '0.9rem' }} />} label="Full Name" value={selectedContact.name} />
                  <InfoRow icon={<PhoneIcon sx={{ fontSize: '0.9rem' }} />} label="Phone" value={selectedContact.number} />
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
                  <InfoRow icon={<TimeIcon sx={{ fontSize: '0.9rem' }} />} label="Last Seen" value={selectedContact.lastSeen} />
                  <InfoRow icon={<CalendarIcon sx={{ fontSize: '0.9rem' }} />} label="Contact Since" value="Feb 15, 2024" />
                </Box>

                {/* Action Buttons */}
                <Grid container spacing={1} sx={{ mb: 4 }}>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      startIcon={<PhoneIcon sx={{ fontSize: '0.8rem' }} />}
                      sx={{ fontSize: '0.75rem', borderRadius: 1, py: 0.5 }}
                    >
                      Call
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      startIcon={<VideoIcon sx={{ fontSize: '0.8rem' }} />}
                      sx={{ fontSize: '0.75rem', borderRadius: 1, py: 0.5 }}
                    >
                      Video
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      startIcon={<EmailIcon sx={{ fontSize: '0.8rem' }} />}
                      sx={{ fontSize: '0.75rem', borderRadius: 1, py: 0.5 }}
                    >
                      Email
                    </Button>
                  </Grid>
                </Grid>

                {/* Conversation Stats */}
                <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '0.9rem', fontWeight: 600 }}>
                  Conversation Stats
                </Typography>
                <Grid container spacing={1} sx={{ mb: 4 }}>
                  <Grid item xs={4}>
                    <Card variant="outlined" sx={{ textAlign: "center", height: "100%" }}>
                      <CardContent sx={{ p: 1.5 }}>
                        <Typography variant="h6" color="primary" sx={{ fontSize: '1.1rem' }}>
                          {(messages[selectedId] || []).length}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                          Total Messages
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card variant="outlined" sx={{ textAlign: "center", height: "100%" }}>
                      <CardContent sx={{ p: 1.5 }}>
                        <Typography variant="h6" color="primary" sx={{ fontSize: '1.1rem' }}>
                          {(messages[selectedId] || []).filter((m) => m.from === "contact").length}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                          From Contact
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card variant="outlined" sx={{ textAlign: "center", height: "100%" }}>
                      <CardContent sx={{ p: 1.5 }}>
                        <Typography variant="h6" color="primary" sx={{ fontSize: '1.1rem' }}>
                          {(messages[selectedId] || []).filter((m) => m.from === "agent").length}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                          From You
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                {/* Notes Section */}
                <Box>
                  <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '0.9rem', fontWeight: 600 }}>
                    Notes
                  </Typography>
                  <TextareaAutosize
                    minRows={4}
                    placeholder="Add notes about this contact..."
                    defaultValue="Important client. Prefers morning calls."
                    style={{
                      width: "100%",
                      padding: 10,
                      borderRadius: 6,
                      border: `1px solid ${theme.palette.divider}`,
                      fontFamily: theme.typography.fontFamily,
                      fontSize: '0.8rem',
                      resize: "vertical",
                      marginBottom: 10,
                    }}
                  />
                  <Button fullWidth variant="contained" size="small" sx={{ fontSize: '0.8rem', borderRadius: 1, py: 0.75 }}>
                    Save Notes
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>

        {/* Mobile Profile Drawer */}
        <Drawer
          anchor="right"
          open={showProfile && isMobile}
          onClose={() => setShowProfile(false)}
          variant="temporary"
          sx={{
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: "85%",
              boxSizing: "border-box",
              borderLeft: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          {selectedContact && (
            <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              {/* Profile Header */}
              <Box
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
                <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                  Contact Profile
                </Typography>
                <IconButton onClick={() => setShowProfile(false)} size="small">
                  <CloseIcon sx={{ fontSize: '1rem' }} />
                </IconButton>
              </Box>

              {/* Profile Content */}
              <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
                {/* Avatar */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 70,
                      height: 70,
                      bgcolor: selectedContact.avatarColor,
                      mb: 2,
                      fontSize: '1.3rem',
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
                      fontSize: '0.75rem',
                      height: 24,
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
                  <InfoRow icon={<PersonIcon sx={{ fontSize: '0.9rem' }} />} label="Full Name" value={selectedContact.name} />
                  <InfoRow icon={<PhoneIcon sx={{ fontSize: '0.9rem' }} />} label="Phone" value={selectedContact.number} />
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
                  <InfoRow icon={<TimeIcon sx={{ fontSize: '0.9rem' }} />} label="Last Seen" value={selectedContact.lastSeen} />
                  <InfoRow icon={<CalendarIcon sx={{ fontSize: '0.9rem' }} />} label="Contact Since" value="Feb 15, 2024" />
                </Box>

                {/* Action Buttons */}
                <Grid container spacing={1} sx={{ mb: 4 }}>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      startIcon={<PhoneIcon sx={{ fontSize: '0.8rem' }} />}
                      sx={{ fontSize: '0.75rem', borderRadius: 1, py: 0.5 }}
                    >
                      Call
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      startIcon={<VideoIcon sx={{ fontSize: '0.8rem' }} />}
                      sx={{ fontSize: '0.75rem', borderRadius: 1, py: 0.5 }}
                    >
                      Video
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      startIcon={<EmailIcon sx={{ fontSize: '0.8rem' }} />}
                      sx={{ fontSize: '0.75rem', borderRadius: 1, py: 0.5 }}
                    >
                      Email
                    </Button>
                  </Grid>
                </Grid>

                {/* Conversation Stats */}
                <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '0.9rem', fontWeight: 600 }}>
                  Conversation Stats
                </Typography>
                <Grid container spacing={1} sx={{ mb: 4 }}>
                  <Grid item xs={4}>
                    <Card variant="outlined" sx={{ textAlign: "center", height: "100%" }}>
                      <CardContent sx={{ p: 1.5 }}>
                        <Typography variant="h6" color="primary" sx={{ fontSize: '1.1rem' }}>
                          {(messages[selectedId] || []).length}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                          Total Messages
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card variant="outlined" sx={{ textAlign: "center", height: "100%" }}>
                      <CardContent sx={{ p: 1.5 }}>
                        <Typography variant="h6" color="primary" sx={{ fontSize: '1.1rem' }}>
                          {(messages[selectedId] || []).filter((m) => m.from === "contact").length}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                          From Contact
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card variant="outlined" sx={{ textAlign: "center", height: "100%" }}>
                      <CardContent sx={{ p: 1.5 }}>
                        <Typography variant="h6" color="primary" sx={{ fontSize: '1.1rem' }}>
                          {(messages[selectedId] || []).filter((m) => m.from === "agent").length}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                          From You
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                {/* Notes Section */}
                <Box>
                  <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '0.9rem', fontWeight: 600 }}>
                    Notes
                  </Typography>
                  <TextareaAutosize
                    minRows={4}
                    placeholder="Add notes about this contact..."
                    defaultValue="Important client. Prefers morning calls."
                    style={{
                      width: "100%",
                      padding: 10,
                      borderRadius: 6,
                      border: `1px solid ${theme.palette.divider}`,
                      fontFamily: theme.typography.fontFamily,
                      fontSize: '0.8rem',
                      resize: "vertical",
                      marginBottom: 10,
                    }}
                  />
                  <Button fullWidth variant="contained" size="small" sx={{ fontSize: '0.8rem', borderRadius: 1, py: 0.75 }}>
                    Save Notes
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Drawer>

        {/* Add Contact Dialog */}
        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ fontSize: '1rem', pb: 1 }}>Add New Contact</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Full Name"
              fullWidth
              size="small"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Phone Number"
              fullWidth
              size="small"
              value={newContact.number}
              onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
              placeholder="+91917449213799"
            />
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 1 }}>
            <Button onClick={() => setOpenAddDialog(false)} size="small" sx={{ fontSize: '0.75rem' }}>
              Cancel
            </Button>
            <Button onClick={handleAddContact} variant="contained" size="small" sx={{ fontSize: '0.75rem' }}>
              Add Contact
            </Button>
          </DialogActions>
        </Dialog>

        {/* Template Parameters Dialog */}
        <Dialog open={openTemplateDialog} onClose={() => setOpenTemplateDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontSize: '0.95rem', pb: 1 }}>
            {availableTemplates.find(t => t.name === selectedTemplate)?.displayName || "Template Parameters"}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" paragraph sx={{ fontSize: '0.8rem' }}>
              {availableTemplates.find(t => t.name === selectedTemplate)?.description}
            </Typography>
            
            {selectedTemplate === "jaspers_market_order_confirmation_v1" && (
              <>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Customer Name"
                  fullWidth
                  size="small"
                  value={templateParams[0] || ""}
                  onChange={(e) => setTemplateParams([e.target.value, templateParams[1], templateParams[2]])}
                  sx={{ mb: 1.5 }}
                />
                <TextField
                  margin="dense"
                  label="Order ID"
                  fullWidth
                  size="small"
                  value={templateParams[1] || ""}
                  onChange={(e) => setTemplateParams([templateParams[0], e.target.value, templateParams[2]])}
                  sx={{ mb: 1.5 }}
                />
                <TextField
                  margin="dense"
                  label="Date"
                  fullWidth
                  size="small"
                  value={templateParams[2] || ""}
                  onChange={(e) => setTemplateParams([templateParams[0], templateParams[1], e.target.value])}
                  placeholder="Jan 22, 2026"
                />
              </>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 1 }}>
            <Button onClick={() => setOpenTemplateDialog(false)} size="small" sx={{ fontSize: '0.75rem' }}>
              Cancel
            </Button>
            <Button onClick={handleSendTemplate} variant="contained" size="small" sx={{ fontSize: '0.75rem' }}>
              Send Template
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%", fontSize: '0.8rem' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}

// Helper component for profile info rows
function InfoRow({ icon, label, value }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
      <Box sx={{ width: 32, display: "flex", justifyContent: "center", alignItems: "center" }}>
        {icon}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.25, fontSize: '0.7rem' }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}