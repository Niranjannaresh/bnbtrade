import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Chip,
  Alert
} from "@mui/material";
import axios from "axios";
import { green, red, orange } from "@mui/material/colors";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8001/history")
      .then(res => {
        setHistory(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching trade history", err);
        setHistory([]);
        setLoading(false);
      });
  }, []);

  // Action ka color decide karo
  const getActionChip = (action) => {
    let color = "default";
    if (action.toLowerCase().includes("buy")) color = "success";
    else if (action.toLowerCase().includes("sell")) color = "error";
    return <Chip label={action} color={color} sx={{ fontWeight: 600 }} />;
  };

  return (
    <Box p={3} display="flex" justifyContent="center">
      <Card sx={{ width: "100%", maxWidth: 900, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h5" align="center" fontWeight={700} gutterBottom>
            📜 Trade History
          </Typography>

          {/* Loading State */}
          {loading ? (
            <Box display="flex" justifyContent="center" p={3}><CircularProgress /></Box>
          ) : history.length === 0 ? (
            <Alert severity="info" sx={{ mt: 2 }}>No trades yet.</Alert>
          ) : (
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell><b>#</b></TableCell>
                  <TableCell><b>Date & Time</b></TableCell>
                  <TableCell><b>Coin</b></TableCell>
                  <TableCell><b>Action</b></TableCell>
                  <TableCell align="right"><b>Quantity</b></TableCell>
                  <TableCell align="right"><b>Price</b></TableCell>
                  <TableCell align="right"><b>SL</b></TableCell>
                  <TableCell align="right"><b>TP</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((t, i) => (
                  <TableRow key={i}
                    sx={{
                      backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafafa",
                      "&:hover": { backgroundColor: "#e3f2fd" }
                    }}
                  >
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{new Date(t.timestamp).toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip label={t.coin} sx={{ fontWeight: "bold", background: "#eceff1" }} />
                    </TableCell>
                    <TableCell>{getActionChip(t.action)}</TableCell>
                    <TableCell align="right">{t.quantity}</TableCell>
                    <TableCell align="right">${Number(t.price || t.entryPrice).toFixed(4)}</TableCell>
                    <TableCell align="right" sx={{ color: red[500] }}>
                      ${Number(t.stopLoss).toFixed(4)}
                    </TableCell>
                    <TableCell align="right" sx={{ color: green[500] }}>
                      ${Number(t.takeProfit).toFixed(4)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
