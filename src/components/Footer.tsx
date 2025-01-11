"use client";

import { Container, Grid, Typography, Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

const StyledFooter = styled("footer")(({ theme }) => ({
  background: `linear-gradient(0deg, 
    rgba(139,92,246,0.15) 0%, 
    rgba(139,92,246,0.05) 100%
  )`,
  padding: theme.spacing(6, 0),
  marginTop: theme.spacing(6),
  borderTop: "1px solid rgba(139,92,246,0.2)",
  color: theme.palette.text.secondary,
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  color: theme.palette.primary.main,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    color: theme.palette.primary.dark,
    background: "rgba(139,92,246,0.1)",
  },
}));

export default function Footer() {
  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Sweet Cherry
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                En tatlı anlarınıza eşlik ediyoruz
              </Typography>
              <Box sx={{ mt: 2 }}>
                <SocialButton aria-label="facebook">
                  <Facebook />
                </SocialButton>
                <SocialButton aria-label="instagram">
                  <Instagram />
                </SocialButton>
                <SocialButton aria-label="twitter">
                  <Twitter />
                </SocialButton>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" color="primary" gutterBottom>
                İletişim
              </Typography>
              <Typography variant="body2" paragraph>
                Telefon: +90 555 123 45 67
              </Typography>
              <Typography variant="body2" paragraph>
                Email: info@sweatcherry.com
              </Typography>
              <Typography variant="body2">
                Adres: Tatlı Sokak No:1
                <br />
                Şeker Mahallesi, İstanbul
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Çalışma Saatleri
              </Typography>
              <Typography variant="body2" paragraph>
                Hafta içi: 09:00 - 22:00
              </Typography>
              <Typography variant="body2" paragraph>
                Hafta sonu: 10:00 - 23:00
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 2,
                  fontStyle: "italic",
                  opacity: 0.8,
                }}
              >
                © 2024 Sweet Cherry. Tüm hakları saklıdır.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </StyledFooter>
  );
}
