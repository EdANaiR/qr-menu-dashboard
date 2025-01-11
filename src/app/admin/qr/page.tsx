"use client";

import QRGenerator from "@/components/QRGenerator";
import { Container, Typography } from "@mui/material";

export default function QRPage() {
  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          my: 4,
          color: "primary.main",
        }}
      >
        QR Kod Yönetimi
      </Typography>
      <QRGenerator />
    </Container>
  );
}
