"use client";

import { Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (response.ok) {
      router.push("/login");
    }
  };

  return (
    <Button
      onClick={handleLogout}
      startIcon={<ExitToAppIcon />}
      sx={{
        position: "absolute",
        top: 20,
        right: 20,
      }}
    >
      Çıkış Yap
    </Button>
  );
}
