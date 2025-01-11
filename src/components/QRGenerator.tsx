"use client";

import { QRCodeSVG } from "qrcode.react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useState } from "react";

export default function QRGenerator() {
  const [tableNumber, setTableNumber] = useState("1");
  const menuUrl = `${window.location.origin}/menu?table=${tableNumber}`;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        maxWidth: 400,
        mx: "auto",
        my: 4,
        textAlign: "center",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Masa QR Kodu Oluşturucu
      </Typography>

      <TextField
        label="Masa Numarası"
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
        type="number"
        sx={{ mb: 3, mt: 2 }}
      />

      <Box sx={{ mb: 3 }}>
        <QRCodeSVG
          value={menuUrl}
          size={200}
          level="H"
          includeMargin
          imageSettings={{
            src: "/images/logo.png",
            x: undefined,
            y: undefined,
            height: 40,
            width: 40,
            excavate: true,
          }}
        />
      </Box>

      <Button
        variant="contained"
        onClick={() => {
          // QR kodu indirme fonksiyonu
          const svg = document.querySelector("svg");
          if (svg) {
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.onload = () => {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx?.drawImage(img, 0, 0);
              const pngFile = canvas.toDataURL("image/png");
              const downloadLink = document.createElement("a");
              downloadLink.download = `masa-${tableNumber}-qr.png`;
              downloadLink.href = pngFile;
              downloadLink.click();
            };
            img.src = "data:image/svg+xml;base64," + btoa(svgData);
          }
        }}
      >
        QR Kodu İndir
      </Button>

      <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
        Bu QR kod masa {tableNumber} için oluşturuldu.
        <br />
        Link: {menuUrl}
      </Typography>
    </Paper>
  );
}
