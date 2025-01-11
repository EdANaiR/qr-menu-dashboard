"use client";

import { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        router.push("/staff");
      } else {
        setError("Kullanıcı adı veya şifre hatalı");
      }
    } catch (error) {
      setError("Giriş yapılırken bir hata oluştu");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "16px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "primary.main",
            borderRadius: "50%",
            p: 2,
            mb: 2,
          }}
        >
          <LockOutlinedIcon sx={{ color: "white" }} />
        </Box>

        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Personel Girişi
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Şifre"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: "8px", py: 1.5 }}
          >
            Giriş Yap
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
