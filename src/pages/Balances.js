import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Alert,
  Chip,
} from "@mui/material";
import axios from "axios";
import { green, deepOrange } from "@mui/material/colors";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

// Icon mapping for known assets
const assetIcons = {
  BTC: <CurrencyBitcoinIcon sx={{ color: "#f2a900" }} />,
  ETH: <CurrencyExchangeIcon sx={{ color: "#627eea" }} />,
  BNB: <CurrencyExchangeIcon sx={{ color: "#f3ba2f" }} />,
  USDT: <MonetizationOnIcon sx={{ color: "#26a17b" }} />,
};

export default function Balances() {
  const [balances, setBalances] = useState([]);
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const fetchBalancesAndPrices = async () => {
      try {
        // Fetch balances
        const res = await axios.get("http://localhost:8001/balance");
        if (Array.isArray(res.data)) {
          setBalances(res.data);

          // Fetch live USDT prices for all assets
          const priceRes = await axios.get(
            "https://api.binance.com/api/v3/ticker/price"
          );
          const priceMap = {};
          priceRes.data.forEach((p) => {
            priceMap[p.symbol] = parseFloat(p.price);
          });
          setPrices(priceMap);

          // Calculate total value in USDT
          let total = 0;
          res.data.forEach((b) => {
            const pair = b.asset + "USDT";
            if (b.asset === "USDT") {
              total += parseFloat(b.free) + parseFloat(b.locked);
            } else if (priceMap[pair]) {
              total +=
                (parseFloat(b.free) + parseFloat(b.locked)) * priceMap[pair];
            }
          });
          setTotalValue(total);
        } else {
          setBalances([]);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching balances:", err);
        setErrorMsg("Unable to fetch balances");
        setLoading(false);
      }
    };

    fetchBalancesAndPrices();
  }, []);

  return (
    <Box p={3} display="flex" justifyContent="center">
      <Card
        sx={{
          width: "100%",
          maxWidth: 800,
          borderRadius: 3,
          boxShadow: 6,
        }}
      >
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom fontWeight={700}>
            📊 Account Balances
          </Typography>

          {/* Portfolio Value */}
          {!loading && !errorMsg && balances.length > 0 && (
            <Box
              sx={{
                textAlign: "center",
                mb: 2,
                fontWeight: "bold",
                fontSize: "1.2rem",
                color: green[700],
              }}
            >
              💰 Portfolio Value: ${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </Box>
          )}

          {/* Loading State */}
          {loading ? (
            <Box display="flex" justifyContent="center" p={3}>
              <CircularProgress />
            </Box>
          ) : errorMsg ? (
            <Alert severity="error">{errorMsg}</Alert>
          ) : balances.length === 0 ? (
            <Alert severity="info">No balances available</Alert>
          ) : (
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell><b>Asset</b></TableCell>
                  <TableCell align="right"><b>Free</b></TableCell>
                  <TableCell align="right"><b>Locked</b></TableCell>
                  <TableCell align="right"><b>Price (USDT)</b></TableCell>
                  <TableCell align="right"><b>Total Value (USDT)</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {balances.map((b, i) => {
                  const free = parseFloat(b.free);
                  const locked = parseFloat(b.locked);
                  const total = free + locked;
                  const pair = b.asset + "USDT";
                  const price =
                    b.asset === "USDT" ? 1 : prices[pair] || 0;
                  const totalValue = total * price;

                  return (
                    <TableRow
                      key={i}
                      sx={{
                        backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafafa",
                        "&:hover": { backgroundColor: "#e3f2fd" },
                      }}
                    >
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          {assetIcons[b.asset] || <MonetizationOnIcon />}
                          <Chip
                            label={b.asset}
                            sx={{
                              fontWeight: "bold",
                              backgroundColor: "#eceff1",
                            }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ color: green[600] }}>
                        {free.toFixed(6)}
                      </TableCell>
                      <TableCell align="right" sx={{ color: deepOrange[500] }}>
                        {locked.toFixed(6)}
                      </TableCell>
                      <TableCell align="right">
                        ${price.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        ${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
