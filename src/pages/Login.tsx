import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      navigate("/gpt");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          mb: 25,
          p: 4,
          borderRadius: "12px",
          backgroundColor: "#fff",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#d6336c", mb: 2 }}
        >
          Welcome Back
        </Typography>
        <Typography sx={{ color: "#666", mb: 3 }}>
          Enter your credentials to access your account.
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ borderRadius: "8px" }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ borderRadius: "8px" }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            backgroundColor: "#d6336c",
            "&:hover": { backgroundColor: "#c02d60" },
            fontWeight: "bold",
            py: 1.5,
            borderRadius: "8px",
          }}
          onClick={handleLogin}
        >
          Log In
        </Button>

        <Typography sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Button
            sx={{ color: "#d6336c", fontWeight: "bold" }}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
