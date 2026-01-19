// Login.jsx
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { NavLink } from "react-router-dom";

export function Login() {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper sx={{ p: 4, width: 380, borderRadius: 2 }} elevation={4}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Login
        </Typography>

        <TextField fullWidth label="Email" margin="normal" />
        <TextField fullWidth label="Password" type="password" margin="normal" />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            background: "#ff7a45",
            "&:hover": { background: "#e96a3c" },
          }}
        >
          Login
        </Button>

        <Typography sx={{ mt: 2, fontSize: 14 }}>
          Don’t have an account?{" "}
          <NavLink
            to="/signup"
            style={{ color: "#ff7a45", textDecoration: "none" }}
          >
            Sign Up
          </NavLink>
        </Typography>
      </Paper>
    </Box>
  );
}
