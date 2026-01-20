// pages/DashboardLayout.jsx
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "../componet/Dashboard/DashboardSidebar";

export function DashboardLayout() {
  return (
  <Box sx={{ display: "flex", minHeight: "100vh", background: "#f5f6fa" }}>
  <DashboardSidebar />
  <Box sx={{ flex: 1, p: 3, background: "#f5f6fa" }}>
    <Outlet />
  </Box>
</Box>

  );
}
