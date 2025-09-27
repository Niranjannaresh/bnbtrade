import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import NoLossBot from "./NoLossBot.png";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Simple validation
    if (!form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }
    // Aap yahan apni login API call kar sakte hain
    // Agar login sahi ho toh:
    // navigate("/");  // home par bhej do
    alert("Login Successful (demo)");
    navigate("/");
  };

  return (
    <Box>
      {/* AppBar with Logo */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Box flexGrow={1}>
            <img src={NoLossBot} alt="logo" width="150" />
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(120deg, #f8ffae 0%, #43c6ac 100%)",
        }}
      >
        <Card sx={{ minWidth: 350, borderRadius: 4, p: 3 }}>
          <CardContent>
            <Typography variant="h4" fontWeight={700} align="center" mb={3}>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((show) => !show)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {error && (
                <Typography color="error" fontSize={14} mt={1}>
                  {error}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                sx={{ mt: 3, fontWeight: "bold", py: 1.2 }}
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
