"use client";

import {
  Card,
  CardMedia,
  Typography,
  Container,
  Grid,
  Collapse,
  IconButton,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useState, Suspense } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import WaiterCallButton from "@/components/WaiterCallButton";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { categories } from "@/data/menuData";

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: "20px",
  cursor: "pointer",
  transition: "all 0.3s ease-in-out",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    margin: "0 auto 16px auto",
  },
}));

const CategoryHeader = styled("div")(({ theme }) => ({
  position: "relative",
  height: "200px",
  [theme.breakpoints.down("sm")]: {
    height: "150px",
  },
}));

const CategoryOverlay = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  background:
    "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
  padding: theme.spacing(3),
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const MenuItemCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  borderRadius: "15px",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  [theme.breakpoints.down("sm")]: {
    margin: theme.spacing(1),
  },
}));

const LogoContainer = styled("div")({
  textAlign: "center",
  padding: "3rem 0",
  marginBottom: "0rem",
  position: "relative",
  width: "100%",
  minHeight: "220px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: `
    linear-gradient(180deg, 
      rgba(139,92,246,0.3) 0%, 
      rgba(139,92,246,0.1) 30%,
      rgba(255,255,255,0) 100%
    )
  `,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `
      linear-gradient(90deg, 
        transparent,
        rgba(139,92,246,0.9),
        rgba(167,139,250,0.9),
        rgba(139,92,246,0.9),
        transparent
      )
    `,
    boxShadow: "0 0 20px rgba(139,92,246,0.5)",
  },
});

function MenuContent() {
  const searchParams = useSearchParams();
  const tableNumber = searchParams.get("table") || "1";
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <>
      <Header />
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          background: `
            linear-gradient(180deg, 
              rgba(139,92,246,0.15) 0%, 
              rgba(139,92,246,0.05) 30%, 
              rgba(255,255,255,0) 500px
            )
          `,
        }}
      >
        <LogoContainer>
          <Box sx={{ position: "relative", mb: 3 }}>
            <Image
              src="/images/logo.png"
              alt="Cadının Evi"
              width={300}
              height={150}
              priority
              style={{
                filter: "drop-shadow(0 0 15px rgba(139,92,246,0.5))",
                marginTop: "1rem",
              }}
            />
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              color: "text.secondary",
              fontStyle: "italic",
              fontSize: "1.2rem",
              textShadow: "0 0 20px rgba(139,92,246,0.3)",
              position: "relative",
            }}
          >
            mutlu olun diye
          </Typography>
        </LogoContainer>

        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Grid container spacing={2}>
            {categories.map((category) => (
              <Grid item xs={12} key={category.id}>
                <StyledCard onClick={() => handleCategoryClick(category.id)}>
                  <CategoryHeader>
                    <CardMedia
                      component="img"
                      height="200"
                      image={category.image}
                      alt={category.title}
                      sx={{
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <CategoryOverlay>
                      <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                          fontWeight: "bold",
                          fontSize: { xs: "1.2rem", sm: "1.5rem" },
                          textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
                        }}
                      >
                        {category.title}
                      </Typography>
                      <IconButton
                        sx={{ color: "white" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryClick(category.id);
                        }}
                      >
                        {expandedCategory === category.id ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </CategoryOverlay>
                  </CategoryHeader>

                  <Collapse in={expandedCategory === category.id}>
                    {category.items.map((item) => (
                      <MenuItemCard key={item.id}>
                        <Grid
                          container
                          spacing={2}
                          sx={{
                            p: { xs: 1, sm: 2 },
                          }}
                        >
                          <Grid
                            item
                            xs={4}
                            sm={3}
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={150}
                              height={150}
                              quality={100}
                              style={{
                                borderRadius: "10px",
                                objectFit: "cover",
                                width: "100%",
                                height: "auto",
                                aspectRatio: "1/1",
                                maxWidth: "150px",
                                maxHeight: "150px",
                              }}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={8}
                            sm={9}
                            sx={{
                              pl: { xs: 2, sm: 3 },
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              variant="h6"
                              component="h3"
                              gutterBottom
                              sx={{
                                fontSize: { xs: "1rem", sm: "1.25rem" },
                                mb: 1,
                              }}
                            >
                              {item.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                fontSize: { xs: "0.8rem", sm: "1rem" },
                                mb: 1,
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {item.description}
                            </Typography>
                            <Typography
                              variant="h6"
                              color="primary"
                              sx={{
                                fontWeight: "bold",
                                fontSize: { xs: "1rem", sm: "1.25rem" },
                              }}
                            >
                              {item.price.toFixed(2)} TL
                            </Typography>
                          </Grid>
                        </Grid>
                      </MenuItemCard>
                    ))}
                  </Collapse>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>
      <WaiterCallButton tableNumber={tableNumber} />
      <Footer />
    </>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MenuContent />
    </Suspense>
  );
}
