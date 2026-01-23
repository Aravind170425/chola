// Signup.jsx
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = () => {
    setLoading(true);
    setSuccess(false);

    // Fake API delay (2 seconds)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // Redirect after another 1.5s (so user sees success msg)
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }, 2000);
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
      <Paper
        sx={{
          p: 4,
          width: 400,
          borderRadius: 2,
        }}
        elevation={4}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Create Account
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Account created successfully! Redirecting to login…
          </Alert>
        )}

        <TextField
          fullWidth
          label="Business Name"
          margin="normal"
          disabled={loading}
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          disabled={loading}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          disabled={loading}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          margin="normal"
          disabled={loading}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleSignup}
          disabled={loading}
          sx={{
            mt: 2,
            background: "#ff7a45",
            "&:hover": { background: "#e96a3c" },
            height: 44,
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ color: "white", mr: 1 }} />
              Creating account...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>

        <Typography sx={{ mt: 2, fontSize: 14 }}>
          Already have an account?{" "}
          <NavLink
            to="/login"
            style={{ color: "#ff7a45", textDecoration: "none" }}
          >
            Login
          </NavLink>
        </Typography>
      </Paper>
    </Box>
  );
}
