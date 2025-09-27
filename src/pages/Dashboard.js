
// import React from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   AppBar,
//   Toolbar,
//   Button,
//   Chip,
// } from "@mui/material";
// import LivePrices from "../LivePrices";
// import { green, red } from "@mui/material/colors";

// export default function Dashboard() {
//   // Example: Bot status (you can make this dynamic from backend later)
//   const botActive = true; // Replace with API fetched state

//   return (
//     <Box
//       sx={{
//         background: "linear-gradient(180deg, #f0f9ff 0%, #e6fffa 100%)",
//         minHeight: "100vh",
//       }}
//     >


//       {/* ====== Welcome Section ====== */}
//       <Box px={{ xs: 2, sm: 4 }} py={4}>
//         <Card
//           elevation={4}
//           sx={{
//             borderRadius: 3,
//             p: 3,
//             textAlign: "center",
//             background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
//           }}
//         >
//           <CardContent>
//             <Typography
//               variant="h4"
//               fontWeight={700}
//               gutterBottom
//               sx={{ color: "#0d47a1" }}
//             >
//               Welcome to No Loss Crypto-Bot 🚀
//             </Typography>
//             <Typography variant="body1" color="text.secondary">
//               Start or stop the bot, check live balances, view trade history,
//               and monitor profit/loss in real-time with advanced AI-powered
//               strategies.
//             </Typography>
//           </CardContent>
//         </Card>
//       </Box>

//       {/* ====== Live Prices Section ====== */}
//       <Box px={{ xs: 1, sm: 3, md: 5 }} pb={6}>
//         <LivePrices />
//       </Box>
//     </Box>
//   );
// }




import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Button,
  Chip,
  Grid,
  Paper,
  Divider,
  Alert,
  LinearProgress,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from "@mui/material";
import LivePrices from "../LivePrices";
import { green, red, blue, orange } from "@mui/material/colors";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HistoryIcon from "@mui/icons-material/History";
import EmergencyIcon from "@mui/icons-material/Warning";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Dashboard() {
  const [botActive, setBotActive] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [signals, setSignals] = useState({});
  const [stats, setStats] = useState({
    dailyTradeCount: 0,
    maxTradesPerDay: 8,
    dailyPnL: 0,
    insertedAmount: 0
  });
  const [position, setPosition] = useState(null);
  const [balance, setBalance] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:8001/stats");
      setStats(res.data);
      setBotActive(res.data.botActive);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchPosition = async () => {
    try {
      const res = await axios.get("http://localhost:8001/position");
      setPosition(res.data.position);
    } catch (error) {
      console.error("Error fetching position:", error);
    }
  };

  const fetchBalance = async () => {
    try {
      const res = await axios.get("http://localhost:8001/balance");
      setBalance(res.data);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const fetchTradeHistory = async () => {
    try {
      const res = await axios.get("http://localhost:8001/history");
      setTradeHistory(res.data);
    } catch (error) {
      console.error("Error fetching trade history:", error);
    }
  };

  const fetchSignals = async () => {
    try {
      // This would connect to your WebSocket or API endpoint for signals
      // For now, we'll simulate some signals
      const sampleSignals = {
        BTCUSDT: {
          '1m': { action: 'buy', strength: 3 },
          '3m': { action: 'buy', strength: 2 },
          '5m': { action: 'hold', strength: 0 }
        },
        ETHUSDT: {
          '1m': { action: 'sell', strength: 2 },
          '3m': { action: 'hold', strength: 0 },
          '5m': { action: 'sell', strength: 3 }
        }
      };
      setSignals(sampleSignals);
    } catch (error) {
      console.error("Error fetching signals:", error);
    }
  };

  const startBot = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8001/start", { 
        coin: "BTCUSDT", 
        usdtAmount: 100 
      });
      setMessage("✅ Trading Bot Started");
      fetchStats();
    } catch (error) {
      setMessage("❌ Error starting bot: " + (error.response?.data?.error || error.message));
    }
    setLoading(false);
  };

  const stopBot = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8001/stop");
      setMessage("🛑 Bot Stopped");
      fetchStats();
    } catch (error) {
      setMessage("❌ Error stopping bot");
    }
    setLoading(false);
  };

  const refreshAllData = () => {
    fetchStats();
    fetchPosition();
    fetchBalance();
    fetchTradeHistory();
    fetchSignals();
  };

  useEffect(() => {
    refreshAllData();
    
    // Set up interval for real-time updates if bot is active
    let interval;
    if (botActive) {
      interval = setInterval(refreshAllData, 5000);
    }
    
    return () => clearInterval(interval);
  }, [botActive]);

  const calculateProfitLoss = () => {
    if (!tradeHistory.length) return { totalProfit: 0, totalLoss: 0, netPnl: 0 };
    
    let totalProfit = 0;
    let totalLoss = 0;
    
    tradeHistory.forEach(trade => {
      if (trade.action === "sell" && trade.pnlPercent) {
        const pnl = (trade.pnlPercent / 100) * (trade.price * trade.quantity);
        if (pnl > 0) totalProfit += pnl;
        else totalLoss += Math.abs(pnl);
      }
    });
    
    return {
      totalProfit,
      totalLoss,
      netPnl: totalProfit - totalLoss
    };
  };

  const { totalProfit, totalLoss, netPnl } = calculateProfitLoss();

  const renderSignalChip = (action, strength) => {
    let color = "default";
    let variant = "outlined";
    
    if (action === "buy") {
      color = "success";
      variant = strength >= 2 ? "filled" : "outlined";
    } else if (action === "sell") {
      color = "error";
      variant = strength >= 2 ? "filled" : "outlined";
    }
    
    return (
      <Chip 
        label={`${action.toUpperCase()} (${strength})`} 
        color={color}
        variant={variant}
        size="small"
      />
    );
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #f0f9ff 0%, #e6fffa 100%)",
        minHeight: "100vh",
      }}
    >
      <AppBar position="static" sx={{ background: "linear-gradient(90deg, #1976d2 0%, #2196f3 100%)" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ⚡ Crypto Trading Bot Dashboard
          </Typography>
          <IconButton color="inherit" onClick={refreshAllData}>
            <RefreshIcon />
          </IconButton>
          <Chip 
            label={botActive ? "LIVE" : "STOPPED"} 
            color={botActive ? "success" : "default"}
            sx={{ color: "white", ml: 2 }}
          />
        </Toolbar>
      </AppBar>

      {/* ====== Welcome Section ====== */}
      <Box px={{ xs: 2, sm: 4 }} py={4}>
        <Card
          elevation={4}
          sx={{
            borderRadius: 3,
            p: 3,
            textAlign: "center",
            background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              fontWeight={700}
              gutterBottom
              sx={{ color: "#0d47a1" }}
            >
              Welcome to Crypto Trading Bot 🚀
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Advanced AI-powered trading with multi-timeframe analysis and risk management
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
              <Button 
                variant="contained" 
                startIcon={<PlayArrowIcon />} 
                onClick={startBot}
                disabled={botActive || loading}
                sx={{ bgcolor: green[700] }}
              >
                Start Bot
              </Button>
              <Button 
                variant="contained" 
                color="error" 
                startIcon={<StopIcon />} 
                onClick={stopBot}
                disabled={!botActive || loading}
              >
                Stop Bot
              </Button>
            </Box>

            {loading && <LinearProgress sx={{ mt: 2 }} />}
            {message && (
              <Alert severity={message.includes("✅") ? "success" : "error"} sx={{ mt: 2 }}>
                {message}
              </Alert>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* ====== Stats Overview ====== */}
      <Box px={{ xs: 2, sm: 4 }} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" color="primary">
                Trades Today
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {stats.dailyTradeCount}/{stats.maxTradesPerDay}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: green[700] }}>
                Profit
              </Typography>
              <Typography variant="h4" fontWeight="bold" sx={{ color: green[700] }}>
                +${totalProfit.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: red[700] }}>
                Loss
              </Typography>
              <Typography variant="h4" fontWeight="bold" sx={{ color: red[700] }}>
                -${totalLoss.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: netPnl >= 0 ? green[700] : red[700] }}>
                Net P/L
              </Typography>
              <Typography 
                variant="h4" 
                fontWeight="bold" 
                sx={{ color: netPnl >= 0 ? green[700] : red[700] }}
              >
                ${netPnl.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* ====== Tabs Section ====== */}
      <Box sx={{ width: '100%', px: { xs: 2, sm: 4 } }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="Trading Signals" />
            <Tab label="Live Prices" />
            <Tab label="Portfolio" />
            <Tab label="Trade History" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h5" gutterBottom>
            Multi-Timeframe Trading Signals
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Real-time signals across 1m, 3m, and 5m timeframes
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {Object.entries(signals).map(([symbol, timeframes]) => (
              <Grid item xs={12} md={6} key={symbol}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {symbol}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={1}>
                      {Object.entries(timeframes).map(([timeframe, data]) => (
                        <Grid item xs={4} key={timeframe}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                              {timeframe}
                            </Typography>
                            {renderSignalChip(data.action, data.strength)}
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <LivePrices />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h5" gutterBottom>
            Portfolio Overview
          </Typography>
          
          {position && (
            <Alert severity="info" sx={{ mb: 2 }}>
              <strong>Current Position:</strong> {position.quantity} {position.coin} at ${position.entryPrice}
            </Alert>
          )}
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Account Balance
                  </Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Asset</TableCell>
                          <TableCell align="right">Available</TableCell>
                          <TableCell align="right">Locked</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {balance.filter(a => parseFloat(a.free) > 0 || parseFloat(a.locked) > 0)
                          .slice(0, 5).map((asset, index) => (
                          <TableRow key={index}>
                            <TableCell>{asset.asset}</TableCell>
                            <TableCell align="right">{parseFloat(asset.free).toFixed(4)}</TableCell>
                            <TableCell align="right">{parseFloat(asset.locked).toFixed(4)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Trading Statistics
                  </Typography>
                  <Typography variant="body2">
                    <strong>Daily Trades:</strong> {stats.dailyTradeCount}/{stats.maxTradesPerDay}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Daily PnL:</strong> ${stats.dailyPnL?.toFixed(2) || '0.00'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Total Invested:</strong> ${stats.insertedAmount || '0.00'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Strategy:</strong> 0.3% Target / 0.25% Stop Loss
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h5" gutterBottom>
            Trade History
          </Typography>
          
          {tradeHistory.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No trades yet
            </Typography>
          ) : (
            <TableContainer component={Paper} elevation={2}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Coin</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">P/L%</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tradeHistory.slice().reverse().map((trade, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {new Date(trade.timestamp).toLocaleTimeString()}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={trade.action} 
                          size="small" 
                          color={trade.action === 'buy' ? 'success' : 'error'}
                        />
                      </TableCell>
                      <TableCell>{trade.coin}</TableCell>
                      <TableCell align="right">${trade.price?.toFixed(2)}</TableCell>
                      <TableCell align="right">{trade.quantity?.toFixed(4)}</TableCell>
                      <TableCell align="right">
                        <Typography 
                          color={trade.pnlPercent >= 0 ? green[700] : red[700]}
                          fontWeight="bold"
                        >
                          {trade.pnlPercent ? trade.pnlPercent.toFixed(2) + '%' : '-'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TabPanel>
      </Box>
    </Box>
  );
}