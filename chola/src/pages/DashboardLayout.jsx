// pages/DashboardLayout.jsx
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "../componet/Dashboard/DashboardSidebar";
import DummyNav from "./DummyNav";

export function DashboardLayout() {
  return (
  <Box sx={{   }}>
  {/* <DashboardSidebar />
<DummyNav/> */}
  <Box sx={{ flex: 1, background: "#f5f6fa" }}>
    <Outlet />
  </Box>
</Box>

  );
}
