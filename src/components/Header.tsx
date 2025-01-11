"use client";

import {
  AppBar,
  Toolbar,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  IconButton,
  Badge,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/context/LanguageContext";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "transparent",
  boxShadow: "none",
  backdropFilter: "blur(10px)",
  position: "sticky",
  background: `linear-gradient(180deg, 
    rgba(139,92,246,0.15) 0%, 
    rgba(139,92,246,0.05) 50%, 
    transparent 100%
  )`,
}));

const StyledSelect = styled(Select<string>)(({ theme }) => ({
  color: theme.palette.primary.main,
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  fontSize: "0.9rem",
  marginLeft: theme.spacing(2),
}));

export default function Header() {
  const [language, setLanguage] = useState("tr");
  const theme = useTheme();

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value as Language);
  };

  return (
    <StyledAppBar>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={50}
            style={{ objectFit: "contain" }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="primary" sx={{ mr: 2 }}>
            <Badge badgeContent={0} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <StyledSelect
            value={language}
            onChange={handleLanguageChange}
            variant="outlined"
            size="small"
          >
            <MenuItem value="tr">TR</MenuItem>
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="ar">AR</MenuItem>
          </StyledSelect>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}
