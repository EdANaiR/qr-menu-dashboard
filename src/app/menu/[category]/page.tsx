"use client";

import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "next/navigation";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "20px",
  transition: "all 0.3s ease-in-out",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.12)",
  },
}));

const menuItems = {
  tatlilar: [
    {
      id: "1",
      name: "Çikolatalı Sufle",
      description:
        "Sıcak çikolatalı sufle, vanilya dondurması ile servis edilir",
      price: 45.9,
      image: "/images/sufle.jpg",
    },
    {
      id: "2",
      name: "Çikolatalı Sufle",
      description:
        "Sıcak çikolatalı sufle, vanilya dondurması ile servis edilir",
      price: 45.9,
      image: "/images/sufle.jpg",
    },
    // Diğer tatlılar...
  ],
  // Diğer kategoriler...
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const items = menuItems[category as keyof typeof menuItems] || [];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          mb: 5,
          textAlign: "center",
          fontWeight: "bold",
          color: "text.primary",
        }}
      >
        {category.toUpperCase()}
      </Typography>

      <Grid container spacing={4}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <StyledCard>
              <CardMedia
                component="img"
                height="240"
                image={item.image}
                alt={item.name}
                sx={{
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                }}
              />
              <CardContent sx={{ p: 3 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: "bold" }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, lineHeight: 1.6 }}
                >
                  {item.description}
                </Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  {item.price.toFixed(2)} TL
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
