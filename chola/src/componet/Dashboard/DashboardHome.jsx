import { Box, Typography, Paper } from "@mui/material";

export function DashboardHome() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Dashboard
      </Typography>

      {/* Make Paper fully white and remove shadow */}
      <Paper sx={{ p: 3, borderRadius: 2, background: "#fff" }} elevation={0}>
        <Typography sx={{ fontSize: 16, mb: 1 }}>
          Welcome to Chola Biz Dashboard 👋
        </Typography>
        <Typography sx={{ fontSize: 14, color: "#555" }}>
          From here you can manage WhatsApp campaigns, view reports,
          and configure your business automation settings.
        </Typography>
      </Paper>
    </Box>
  );
}
