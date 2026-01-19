import { useState, useRef, useEffect } from "react";
import {
  Box, Toolbar, Typography, IconButton, Button, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Menu, MenuItem, Popover, Tabs, Tab, TextField
} from "@mui/material";
import {
  Menu as MenuIcon, Add as AddIcon, Remove as RemoveIcon,
  FormatBold, FormatItalic, FormatStrikethrough, EmojiEmotions,
  Schedule, Send, Close as CloseIcon, Delete as DeleteIcon
} from "@mui/icons-material";
import EmojiPicker from 'emoji-picker-react';
import { DataGrid } from '@mui/x-data-grid';

const WHATSAPP_GREEN = "#0d5d27"; // Dark Green from your image

const WhatsappBulkSender = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [messages, setMessages] = useState([{ id: 1, text: "" }]);
  const [attachments, setAttachments] = useState([]); // Store uploaded files
  const [anchorEl, setAnchorEl] = useState(null);
  const [showEmojis, setShowEmojis] = useState(null);
  const [nextId, setNextId] = useState(2);
  const [activeTab, setActiveTab] = useState(0);
  
  const editorRefs = useRef({});
  const lastSavedContent = useRef("");
  const savedSelection = useRef(null);
  const fileInputRef = useRef(null);

  // --- Sample Contact Data ---
  const contactRows = [
    { id: 1, name: "John Doe", number: "+1234567890", var1: "Customer" },
    { id: 2, name: "Marketing Group", number: "Group: Marketing", var1: "Team" },
    { id: 3, name: "Sarah Smith", number: "+0987654321", var1: "Client" },
  ];
  const contactColumns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "number", headerName: "Number", width: 150 },
    { field: "var1", headerName: "Var1", width: 100 },
  ];

  const activeMessage = messages[activeTab] || { id: 1, text: "" };

  // --- Editor & Cursor Logic ---
  const syncEditorToState = () => {
    const el = editorRefs.current[activeMessage.id];
    if (!el) return;
    const content = el.innerHTML;
    if (content !== lastSavedContent.current) {
      setMessages(prev => prev.map(m => m.id === activeMessage.id ? { ...m, text: content } : m));
      lastSavedContent.current = content;
    }
  };

  const saveCursorPosition = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      savedSelection.current = selection.getRangeAt(0);
    }
  };

  const insertAtCursor = (textToInsert) => {
    const el = editorRefs.current[activeMessage.id];
    if (!el) return;
    el.focus();
    const selection = window.getSelection();
    if (savedSelection.current) {
      selection.removeAllRanges();
      selection.addRange(savedSelection.current);
    }
    const range = selection.rangeCount ? selection.getRangeAt(0) : document.createRange();
    if (!selection.rangeCount) {
      range.selectNodeContents(el);
      range.collapse(false);
      selection.addRange(range);
    }
    range.deleteContents();
    const textNode = document.createTextNode(textToInsert);
    range.insertNode(textNode);
    range.setStartAfter(textNode);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    savedSelection.current = range;
    syncEditorToState();
  };

  // --- File Upload Logic ---
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newAttachments = files.map(file => ({
      id: Math.random(),
      name: file.name,
      type: file.type.split('/')[0], // e.g., 'image' or 'application'
      file: file,
      caption: ""
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const handleCaptionChange = (id, value) => {
    setAttachments(prev => prev.map(a => a.id === id ? { ...a, caption: value } : a));
  };

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f0f2f5", p: 1 }}>
      {/* LEFT PANEL: CONTACTS */}
      <Paper sx={{ width: "35%", display: "flex", flexDirection: "column", mr: 1 }}>
        <Box sx={{ bgcolor: WHATSAPP_GREEN, color: "white", p: 1.5 }}>
          <Typography variant="subtitle1">Whatsapp Numbers</Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid rows={contactRows} columns={contactColumns} checkboxSelection disableRowSelectionOnClick />
        </Box>
      </Paper>

      {/* RIGHT PANEL: COMPOSER (Matching your Image) */}
      <Paper sx={{ width: "65%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        
        {/* Header 1: Message Tabs */}
        <Box sx={{ bgcolor: WHATSAPP_GREEN, color: "white", display: "flex", alignItems: "center", justifyContent: "space-between", px: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Message</Typography>
          <Box>
            <IconButton size="small" sx={{ color: "white" }} onClick={() => {
               const newMsg = { id: nextId, text: "" };
               setMessages([...messages, newMsg]);
               setNextId(nextId + 1);
               setActiveTab(messages.length);
            }}><AddIcon /></IconButton>
            <IconButton size="small" sx={{ color: "white" }} onClick={() => {
               if(messages.length > 1) {
                const newMsgs = messages.filter((_, i) => i !== activeTab);
                setMessages(newMsgs);
                setActiveTab(0);
               }
            }}><RemoveIcon /></IconButton>
          </Box>
        </Box>

        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ minHeight: 40, bgcolor: "#fff" }}>
          {messages.map((m, i) => <Tab key={m.id} label={`Message ${i + 1}`} sx={{ textTransform: 'none' }} />)}
        </Tabs>

        {/* Editor Area */}
        <Box sx={{ p: 1, flexGrow: 0 }}>
          <Box
            ref={(el) => (editorRefs.current[activeMessage.id] = el)}
            contentEditable
            onKeyUp={saveCursorPosition}
            onClick={saveCursorPosition}
            onBlur={syncEditorToState}
            suppressContentEditableWarning
            sx={{
              height: 200, border: "1px solid #ccc", p: 1, outline: "none", overflowY: "auto", bgcolor: "white"
            }}
          />
      

        {/* Formatting Toolbar */}
        <Box sx={{ bgcolor: "#f0f2f5", color: "black", display: "flex", justifyContent: "space-between", alignItems: "center", px: 1, py: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
             <Typography variant="body2" sx={{ mr: 1 }}>Insert Variables</Typography>
          </Box>
          <Box>
            <IconButton size="small" sx={{ color: "black" }} onClick={(e) => { saveCursorPosition(); setShowEmojis({ element: e.currentTarget }); }}><EmojiEmotions /></IconButton>
            <IconButton size="small" sx={{ color: "black" }} onClick={() => document.execCommand('bold')}><FormatBold /></IconButton>
            <IconButton size="small" sx={{ color: "black" }} onClick={() => document.execCommand('italic')}><FormatItalic /></IconButton>
            <IconButton size="small" sx={{ color: "black" }} onClick={() => document.execCommand('strikeThrough')}><FormatStrikethrough /></IconButton>
          </Box>
        </Box>  </Box>

        {/* Attachments Section */}
     <Box
  sx={{
    bgcolor: WHATSAPP_GREEN,
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    px: 1,
    py: 0.5
  }}
>
  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
    Attach Files & Photos
  </Typography>

  <IconButton
    size="small"
    sx={{ color: "white" }}
    onClick={() => fileInputRef.current.click()}
  >
    <AddIcon sx={{ fontSize: 18 }} />
  </IconButton>

  <input
    type="file"
    hidden
    multiple
    ref={fileInputRef}
    onChange={handleFileUpload}
  />
</Box>


        {/* Attachment Table */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", bgcolor: "white" }}>
          <TableContainer>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>File Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Caption</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} width={50}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attachments.length === 0 ? (
                  <TableRow><TableCell colSpan={4} align="center" sx={{ color: "#999", py: 4 }}>No files attached</TableCell></TableRow>
                ) : (
                  attachments.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell sx={{ fontSize: 12 }}>{file.name}</TableCell>
                      <TableCell sx={{ fontSize: 12 }}>{file.type}</TableCell>
                      <TableCell>
                        <TextField 
                          variant="standard" 
                          fullWidth 
                          placeholder="Add caption..."
                          value={file.caption}
                          onChange={(e) => handleCaptionChange(file.id, e.target.value)}
                          inputProps={{ style: { fontSize: 12 } }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" color="error" onClick={() => removeAttachment(file.id)}><DeleteIcon sx={{ fontSize: 16 }} /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Footer Actions */}
        <Box sx={{ bgcolor: WHATSAPP_GREEN, p: 1, display: "flex", justifyContent: "space-around" }}>
          <Button startIcon={<Schedule />} sx={{ color: "white", textTransform: 'none' }}>Schedule Send</Button>
          <Button startIcon={<Send />} sx={{ color: "white", textTransform: 'none' }}>Send Now</Button>
        </Box>
      </Paper>

      {/* Variables Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => { insertAtCursor("{{Name}}"); setAnchorEl(null); }}>Name</MenuItem>
        <MenuItem onClick={() => { insertAtCursor("{{Number}}"); setAnchorEl(null); }}>Number</MenuItem>
        <MenuItem onClick={() => { insertAtCursor("{{Var1}}"); setAnchorEl(null); }}>Var1</MenuItem>
      </Menu>

      {/* Emoji Picker Popover */}
      <Popover open={Boolean(showEmojis)} anchorEl={showEmojis?.element} onClose={() => setShowEmojis(null)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <EmojiPicker onEmojiClick={(emoji) => { insertAtCursor(emoji.emoji); setShowEmojis(null); }} />
      </Popover>
    </Box>
  );
};

export default WhatsappBulkSender;