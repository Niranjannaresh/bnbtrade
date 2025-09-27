import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  AppBar,
  Toolbar,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import NoLossBot from "./NoLossBot.png";

export default function TradeStats() {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/tradeCounts")
      .then(res => res.json())
      .then(data => {
        setCounts(data.data || {});
        setLoading(false);
      });
  }, []);

  return (
    <Box>
      {/* TOP APP BAR */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Box flexGrow={1}>
            <img
              src={NoLossBot}
              className="App-logo"
              alt="logo"
              width="150"
              height="auto"
            />
          </Box>
          <Button
            variant="outlined"
            color="primary"
            component={RouterLink}
            to="/"
            sx={{ ml: 2, fontWeight: 600 }}
          >
            Home
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{
        mt: 6,
        display: "flex",
        justifyContent: "center",
        minHeight: 400,
      }}>
        <Card elevation={6} sx={{
          p: 3,
          minWidth: 450,
          background: "linear-gradient(120deg, #f8ffae 0%, #43c6ac 100%)",
          borderRadius: 4,
        }}>
          <Typography
            variant="h4"
            align="center"
            fontWeight={700}
            gutterBottom
            color="text.primary"
            sx={{ letterSpacing: 1 }}
          >
            📈 Trade Counts (Buy/Sell)
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress size={32} />
            </Box>
          ) : (
            <Paper sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Symbol</b></TableCell>
                    <TableCell align="right"><b>Buy Count</b></TableCell>
                    <TableCell align="right"><b>Sell Count</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(counts).map(([symbol, { buy, sell }]) => (
                    <TableRow key={symbol}>
                      <TableCell>{symbol}</TableCell>
                      <TableCell align="right">{buy}</TableCell>
                      <TableCell align="right">{sell}</TableCell>
                    </TableRow>
                  ))}
                  {Object.keys(counts).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No trades yet!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Paper>
          )}
        </Card>
      </Box>
    </Box>
  );
}
