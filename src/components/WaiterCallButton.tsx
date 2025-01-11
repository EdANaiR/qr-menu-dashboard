"use client";

import { Button } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NotificationService } from "@/services/NotificationService";
import { useState } from "react";

interface Props {
  tableNumber: string;
}

export default function WaiterCallButton({ tableNumber }: Props) {
  const [isRequested, setIsRequested] = useState(false);

  const handleCallWaiter = async () => {
    try {
      await NotificationService.callWaiter(tableNumber);
      setIsRequested(true);
      setTimeout(() => setIsRequested(false), 60000); // 1 dakika sonra tekrar aktif et
    } catch (error) {
      console.error("Garson çağırma hatası:", error);
    }
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<NotificationsIcon />}
      onClick={handleCallWaiter}
      disabled={isRequested}
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        borderRadius: "50px",
      }}
    >
      {isRequested ? "Garson Yolda" : "Garson Çağır"}
    </Button>
  );
}
