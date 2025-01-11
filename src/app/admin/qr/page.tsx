"use client";

import { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";

export default function QRAdminPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setIsMounted(true);
    // Get the current URL without the /admin/qr part
    const baseUrl = window.location.origin;
    setUrl(baseUrl);
  }, []);

  if (!isMounted) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          QR Kod Yönetimi
        </Typography>

        <Box
          sx={{
            p: 4,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <QRCodeSVG value={url} size={256} level="H" includeMargin />
        </Box>

        <Typography variant="body1" color="text.secondary">
          Bu QR kodu menüye erişmek için kullanabilirsiniz
        </Typography>
      </Box>
    </Container>
  );
}
