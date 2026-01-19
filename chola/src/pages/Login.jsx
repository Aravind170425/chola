import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const VALID_EMAIL = "chola@gmail.com";
  const VALID_PASSWORD = "chola@123";

  const handleLogin = () => {
    setError("");

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      // ✅ Store login state
      localStorage.setItem("isLoggedIn", "true");

      // ✅ Redirect to dashboard
      navigate("/dashboard");
    } else {
      setError("Wrong email or password ❌");
    }
  };

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

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            background: "#ff7a45",
            "&:hover": { background: "#e96a3c" },
          }}
          onClick={handleLogin}
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
