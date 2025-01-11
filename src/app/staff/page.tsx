"use client";

import { useState, useEffect } from "react";
import { Container, Paper, Typography, Box, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NotificationService } from "@/services/NotificationService";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoneIcon from "@mui/icons-material/Done";
import LogoutButton from "@/components/LogoutButton";

interface CallRequest {
  tableNumber: string;
  timestamp: Date;
  status: "pending" | "completed";
}

const NotificationCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  backgroundColor: "#FFFFFF",
  borderRadius: "16px",
  transition: "all 0.3s ease",
  border: "1px solid rgba(139,92,246,0.1)",
  boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
  overflow: "hidden",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    width: "4px",
    background: "linear-gradient(180deg, #8B5CF6, #A78BFA)",
    borderRadius: "4px",
  },
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 24px rgba(139,92,246,0.1)",
  },
}));

export default function StaffPanel() {
  const [calls, setCalls] = useState<CallRequest[]>([]);

  useEffect(() => {
    // İlk yüklemede mevcut çağrıları al
    const loadActiveCalls = async () => {
      try {
        const activeCalls = await NotificationService.getActiveCalls();
        const formattedCalls = activeCalls.map((call) => ({
          tableNumber: call.table_number,
          timestamp: new Date(call.timestamp),
          status: call.status as "pending" | "completed",
        }));
        setCalls(formattedCalls);
      } catch (error) {
        console.error("Error loading active calls:", error);
      }
    };

    loadActiveCalls();

    // Realtime subscription
    console.log("Setting up waiter calls subscription");
    const subscription = NotificationService.subscribeToWaiterCalls(
      (payload) => {
        console.log("Received waiter call:", payload);
        if (payload.new && "table_number" in payload.new) {
          const newCall = {
            tableNumber: payload.new.table_number,
            timestamp: new Date(payload.new.timestamp),
            status: payload.new.status as "pending" | "completed",
          };
          setCalls((prev) => [...prev, newCall]);
        }
      }
    );

    return () => {
      console.log("Cleaning up subscription");
      subscription.unsubscribe();
    };
  }, []);

  const handleComplete = async (tableNumber: string) => {
    await NotificationService.completeCall(tableNumber);
    setCalls((prev) => prev.filter((call) => call.tableNumber !== tableNumber));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <LogoutButton />
      <Box
        sx={{
          mb: 5,
          textAlign: "center",
          background:
            "linear-gradient(180deg, rgba(139,92,246,0.1) 0%, rgba(255,255,255,0) 100%)",
          py: 4,
          borderRadius: "20px",
          border: "1px solid rgba(139,92,246,0.2)",
        }}
      >
        <RestaurantIcon
          sx={{
            fontSize: 40,
            color: "primary.main",
            mb: 2,
            filter: "drop-shadow(0 0 10px rgba(139,92,246,0.3))",
          }}
        />
        <Typography
          variant="h4"
          color="primary"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.8rem", sm: "2.2rem" },
            textShadow: "0 2px 10px rgba(139,92,246,0.2)",
            letterSpacing: "0.5px",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -10,
              left: "50%",
              transform: "translateX(-50%)",
              width: "60px",
              height: "3px",
              background:
                "linear-gradient(90deg, transparent, #8B5CF6, transparent)",
              borderRadius: "2px",
            },
          }}
        >
          Garson Çağrı Paneli
        </Typography>
      </Box>

      {calls.map((call) => (
        <NotificationCard key={call.tableNumber + call.timestamp.toString()}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={7}>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "primary.main",
                    mb: 1,
                  }}
                >
                  Masa {call.tableNumber}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessTimeIcon
                    sx={{ fontSize: 18, color: "text.secondary" }}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {new Date(call.timestamp).toLocaleTimeString("tr-TR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={() => handleComplete(call.tableNumber)}
                startIcon={<DoneIcon />}
                sx={{
                  borderRadius: "12px",
                  textTransform: "none",
                  px: 3,
                  py: 1,
                  background: "linear-gradient(45deg, #22C55E, #16A34A)",
                  boxShadow: "0 4px 12px rgba(34,197,94,0.2)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #16A34A, #15803D)",
                    boxShadow: "0 6px 16px rgba(34,197,94,0.3)",
                  },
                }}
              >
                Tamamlandı
              </Button>
            </Grid>
          </Grid>
        </NotificationCard>
      ))}

      {calls.length === 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: "16px",
            border: "1px dashed rgba(139,92,246,0.2)",
            mt: 4,
          }}
        >
          <RestaurantIcon
            sx={{
              fontSize: 60,
              color: "text.secondary",
              mb: 2,
              opacity: 0.5,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontWeight: 500,
            }}
          >
            Aktif çağrı bulunmuyor
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
            sx={{
              mt: 1,
              opacity: 0.7,
            }}
          >
            Yeni çağrılar geldiğinde burada görünecek
          </Typography>
        </Paper>
      )}
    </Container>
  );
}
