
// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Card,
//   Chip,
//   Divider,
//   Grid,
//   MenuItem,
//   Alert,
//   Paper,
//   LinearProgress,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow
// } from "@mui/material";
// import { green, red, blue, orange, yellow } from "@mui/material/colors";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import StopIcon from "@mui/icons-material/Stop";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import TrendingDownIcon from "@mui/icons-material/TrendingDown";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import HistoryIcon from "@mui/icons-material/History";
// import EmergencyIcon from "@mui/icons-material/Warning";
// import axios from "axios";

// export default function StartStopBot() {
//   const [coin, setCoin] = useState("BTCUSDT");
//   const [usdtAmount, setUsdtAmount] = useState(50);
//   const [response, setResponse] = useState(null);
//   const [message, setMessage] = useState("");
//   const [stats, setStats] = useState({
//     dailyTradeCount: 0,
//     maxTradesPerDay: 8,
//     dailyPnL: 0,
//     botActive: false,
//     insertedAmount: 0
//   });
//   const [position, setPosition] = useState(null);
//   const [balance, setBalance] = useState([]);
//   const [tradeHistory, setTradeHistory] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const WHITELISTED_COINS = [
//     "BTCUSDT", "ETHUSDT", "BNBUSDT", "ADAUSDT", 
//     "SOLUSDT", "XRPUSDT", "DOTUSDT", "DOGEUSDT"
//   ];

//   const startBot = async () => {
//     setLoading(true);
//     try {
//       if (usdtAmount < 50 || usdtAmount > 1000) {
//         setMessage("Amount must be between $50 and $1000");
//         setLoading(false);
//         return;
//       }

//       const res = await axios.post("http://localhost:8001/start", { 
//         coin, 
//         usdtAmount: parseFloat(usdtAmount) 
//       });
//       setResponse(res.data);
//       setStats(prev => ({ ...prev, botActive: true }));
//       setMessage("✅ LIVE Trading Started with Real Funds!");
      
//       // Refresh data
//       fetchStats();
//       fetchPosition();
//       fetchBalance();
//     } catch (error) {
//       setMessage("❌ Error starting bot: " + (error.response?.data?.error || error.message));
//     }
//     setLoading(false);
//   };

//   const stopBot = async () => {
//     setLoading(true);
//     try {
//       await axios.post("http://localhost:8001/stop");
//       setMessage("🛑 Bot Stopped");
//       setStats(prev => ({ ...prev, botActive: false }));
//     } catch (error) {
//       setMessage("❌ Error stopping bot");
//     }
//     setLoading(false);
//   };

//   const emergencySell = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.post("http://localhost:8001/emergency-sell");
//       setMessage("🚨 Emergency Sell Executed: " + res.data.message);
//       fetchPosition();
//       fetchBalance();
//     } catch (error) {
//       setMessage("❌ Emergency sell failed");
//     }
//     setLoading(false);
//   };

//   const emergencyStopAll = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.post("http://localhost:8001/emergency-stop-all");
//       setMessage("🛑 ALL TRADING STOPPED: " + res.data.message);
//       setStats(prev => ({ ...prev, botActive: false }));
//       fetchPosition();
//       fetchBalance();
//     } catch (error) {
//       setMessage("❌ Emergency stop failed");
//     }
//     setLoading(false);
//   };

//   const fetchStats = async () => {
//     try {
//       const res = await axios.get("http://localhost:8001/stats");
//       setStats(res.data);
//     } catch (error) {
//       console.error("Error fetching stats:", error);
//     }
//   };

//   const fetchPosition = async () => {
//     try {
//       const res = await axios.get("http://localhost:8001/position");
//       setPosition(res.data.position);
//     } catch (error) {
//       console.error("Error fetching position:", error);
//     }
//   };

//   const fetchBalance = async () => {
//     try {
//       const res = await axios.get("http://localhost:8001/balance");
//       setBalance(res.data);
//     } catch (error) {
//       console.error("Error fetching balance:", error);
//     }
//   };

//   const fetchTradeHistory = async () => {
//     try {
//       const res = await axios.get("http://localhost:8001/history");
//       setTradeHistory(res.data);
//     } catch (error) {
//       console.error("Error fetching trade history:", error);
//     }
//   };

//   useEffect(() => {
//     if (stats.botActive) {
//       const interval = setInterval(() => {
//         fetchStats();
//         fetchPosition();
//         fetchBalance();
//         fetchTradeHistory();
//       }, 3000);
//       return () => clearInterval(interval);
//     }
//   }, [stats.botActive]);

//   useEffect(() => {
//     // Initial data load
//     fetchStats();
//     fetchPosition();
//     fetchBalance();
//     fetchTradeHistory();
//   }, []);

//   const calculateProfitLoss = () => {
//     if (!tradeHistory.length) return { totalProfit: 0, totalLoss: 0, netPnl: 0 };
    
//     let totalProfit = 0;
//     let totalLoss = 0;
    
//     tradeHistory.forEach(trade => {
//       if (trade.action === "sell" && trade.pnlPercent) {
//         const pnl = (trade.pnlPercent / 100) * (trade.price * trade.quantity);
//         if (pnl > 0) totalProfit += pnl;
//         else totalLoss += Math.abs(pnl);
//       }
//     });
    
//     return {
//       totalProfit,
//       totalLoss,
//       netPnl: totalProfit - totalLoss
//     };
//   };

//   const { totalProfit, totalLoss, netPnl } = calculateProfitLoss();

//   return (
//     <Box p={3}>
//       <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4 }}>
//         <Box display="flex" justifyContent="center" mb={2}>
//           <Chip
//             label={stats.botActive ? "LIVE TRADING ACTIVE" : "BOT STOPPED"}
//             color={stats.botActive ? "success" : "error"}
//             sx={{ 
//               fontWeight: 700, 
//               fontSize: "1.1rem", 
//               px: 3, 
//               py: 2,
//               background: stats.botActive ? 
//                 'linear-gradient(45deg, #00c853 30%, #00e676 90%)' :
//                 'linear-gradient(45deg, #ff5252 30%, #ff867f 90%)'
//             }}
//             icon={stats.botActive ? <PlayArrowIcon /> : <StopIcon />}
//             variant="filled"
//           />
//         </Box>

//         <Typography variant="h4" fontWeight={700} align="center" sx={{ color: blue[700], mb: 1 }}>
//           ⚡ Binance Scalping Bot
//         </Typography>
        
//         <Typography variant="subtitle1" align="center" sx={{ color: blue[500], mb: 3 }}>
//           0.3% Target | 0.25% Stop Loss | Multi-Timeframe Analysis
//         </Typography>

//         <Divider sx={{ my: 2 }} />

//         <Grid container spacing={3}>
//           {/* Control Panel */}
//           <Grid item xs={12} md={6}>
//             <Card variant="outlined" sx={{ p: 3, borderRadius: 2, minHeight: 320 }}>
//               <Typography variant="h6" fontWeight={600} sx={{ color: blue[700], mb: 2 }}>
//                 🎮 Trading Controls
//               </Typography>
              
//               <TextField 
//                 select
//                 label="Coin Pair" 
//                 value={coin} 
//                 onChange={e => setCoin(e.target.value)} 
//                 fullWidth 
//                 sx={{ mb: 2 }}
//               >
//                 {WHITELISTED_COINS.map((coinPair) => (
//                   <MenuItem key={coinPair} value={coinPair}>
//                     {coinPair}
//                   </MenuItem>
//                 ))}
//               </TextField>
              
//               <TextField 
//                 label="USDT Amount" 
//                 type="number" 
//                 value={usdtAmount} 
//                 onChange={e => setUsdtAmount(e.target.value)} 
//                 fullWidth 
//                 sx={{ mb: 2 }}
//                 helperText="Min: $50 | Max: $1000"
//                 error={usdtAmount < 50 || usdtAmount > 1000}
//               />

//               {loading && <LinearProgress sx={{ mb: 2 }} />}

//               <Box mt={2} display="flex" gap={1} flexWrap="wrap">
//                 <Button 
//                   variant="contained" 
//                   startIcon={<PlayArrowIcon />} 
//                   onClick={startBot}
//                   sx={{ 
//                     bgcolor: green[700], 
//                     "&:hover": { bgcolor: green[800] },
//                     flex: 1,
//                     minWidth: 120
//                   }} 
//                   disabled={stats.botActive || loading}
//                 >
//                   Start Bot
//                 </Button>
                
//                 <Button 
//                   variant="contained" 
//                   color="error" 
//                   startIcon={<StopIcon />} 
//                   onClick={stopBot}
//                   sx={{ flex: 1, minWidth: 120 }}
//                   disabled={!stats.botActive || loading}
//                 >
//                   Stop Bot
//                 </Button>
                
//                 <Button 
//                   variant="outlined" 
//                   color="warning" 
//                   startIcon={<EmergencyIcon />} 
//                   onClick={emergencySell}
//                   sx={{ flex: 1, minWidth: 140 }}
//                   disabled={!position || loading}
//                 >
//                   Emergency Sell
//                 </Button>
                
//                 <Button 
//                   variant="outlined" 
//                   color="error" 
//                   startIcon={<EmergencyIcon />} 
//                   onClick={emergencyStopAll}
//                   sx={{ flex: 1, minWidth: 160 }}
//                   disabled={loading}
//                 >
//                   Stop ALL Trading
//                 </Button>
//               </Box>

//               {message && (
//                 <Alert 
//                   severity={message.includes("✅") ? "success" : message.includes("❌") ? "error" : "info"} 
//                   sx={{ mt: 2 }}
//                 >
//                   {message}
//                 </Alert>
//               )}

//               {position && (
//                 <Alert severity="info" sx={{ mt: 2 }}>
//                   <strong>Current Position:</strong> {position.quantity} {position.coin} @ ${position.entryPrice}
//                 </Alert>
//               )}
//             </Card>
//           </Grid>

//           {/* Statistics Panel */}
//           <Grid item xs={12} md={6}>
//             <Card variant="outlined" sx={{ p: 3, borderRadius: 2, minHeight: 320 }}>
//               <Typography variant="h6" fontWeight={600} sx={{ color: blue[700], mb: 2 }}>
//                 📊 Trading Statistics
//               </Typography>
              
//               <Grid container spacing={1}>
//                 <Grid item xs={6}>
//                   <Typography variant="body2"><b>Trades Today:</b></Typography>
//                   <Chip 
//                     label={`${stats.dailyTradeCount}/${stats.maxTradesPerDay}`} 
//                     color={stats.dailyTradeCount >= stats.maxTradesPerDay ? "error" : "primary"}
//                     size="small"
//                   />
//                 </Grid>
                
//                 <Grid item xs={6}>
//                   <Typography variant="body2"><b>Daily PnL:</b></Typography>
//                   <Chip 
//                     label={`$${stats.dailyPnL?.toFixed(2) || '0.00'}`} 
//                     color={stats.dailyPnL >= 0 ? "success" : "error"}
//                     size="small"
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <Divider sx={{ my: 1 }} />
//                 </Grid>

//                 <Grid item xs={6}>
//                   <Typography variant="body2" color={green[800]}>
//                     <TrendingUpIcon fontSize="small" /> <b>Profit:</b>
//                   </Typography>
//                   <Typography variant="h6" color={green[800]}>
//                     +${totalProfit.toFixed(2)}
//                   </Typography>
//                 </Grid>

//                 <Grid item xs={6}>
//                   <Typography variant="body2" color={red[800]}>
//                     <TrendingDownIcon fontSize="small" /> <b>Loss:</b>
//                   </Typography>
//                   <Typography variant="h6" color={red[800]}>
//                     -${totalLoss.toFixed(2)}
//                   </Typography>
//                 </Grid>

//                 <Grid item xs={12}>
//                   <Divider sx={{ my: 1 }} />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <Typography variant="h6" fontWeight={700} 
//                     color={netPnl >= 0 ? green[800] : red[800]}
//                     sx={{ textAlign: 'center' }}
//                   >
//                     Net P/L: ${netPnl.toFixed(2)} USDT
//                   </Typography>
//                 </Grid>

//                 <Grid item xs={12}>
//                   <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
//                     Strategy: 0.3% Target | 0.25% Stop Loss
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Card>
//           </Grid>

//           {/* Balance Panel */}
//           <Grid item xs={12} md={6}>
//             <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
//               <Typography variant="h6" fontWeight={600} sx={{ color: blue[700], mb: 2 }}>
//                 💰 Account Balance
//               </Typography>
              
//               <TableContainer>
//                 <Table size="small">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Asset</TableCell>
//                       <TableCell align="right">Available</TableCell>
//                       <TableCell align="right">Locked</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {balance.slice(0, 5).map((asset, index) => (
//                       <TableRow key={index}>
//                         <TableCell>{asset.asset}</TableCell>
//                         <TableCell align="right">{parseFloat(asset.free).toFixed(4)}</TableCell>
//                         <TableCell align="right">{parseFloat(asset.locked).toFixed(4)}</TableCell>
//                       </TableRow>
//                     ))}
//                     {balance.length > 5 && (
//                       <TableRow>
//                         <TableCell colSpan={3} align="center">
//                           <Typography variant="body2" color="text.secondary">
//                             + {balance.length - 5} more assets
//                           </Typography>
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Card>
//           </Grid>

//           {/* Recent Trades */}
//           <Grid item xs={12} md={6}>
//             <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
//               <Typography variant="h6" fontWeight={600} sx={{ color: blue[700], mb: 2 }}>
//                 📋 Recent Trades
//               </Typography>
              
//               <TableContainer sx={{ maxHeight: 200 }}>
//                 <Table size="small" stickyHeader>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Action</TableCell>
//                       <TableCell>Coin</TableCell>
//                       <TableCell align="right">Price</TableCell>
//                       <TableCell align="right">P/L%</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {tradeHistory.slice(-5).reverse().map((trade, index) => (
//                       <TableRow key={index}>
//                         <TableCell>
//                           <Chip 
//                             label={trade.action} 
//                             size="small" 
//                             color={trade.action === 'buy' ? 'success' : 'error'}
//                           />
//                         </TableCell>
//                         <TableCell>{trade.coin}</TableCell>
//                         <TableCell align="right">${trade.price}</TableCell>
//                         <TableCell align="right">
//                           <Typography 
//                             color={trade.pnlPercent >= 0 ? green[800] : red[800]}
//                             fontWeight="bold"
//                           >
//                             {trade.pnlPercent ? trade.pnlPercent.toFixed(2) + '%' : '-'}
//                           </Typography>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                     {tradeHistory.length === 0 && (
//                       <TableRow>
//                         <TableCell colSpan={4} align="center">
//                           <Typography variant="body2" color="text.secondary">
//                             No trades yet
//                           </Typography>
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Card>
//           </Grid>
//         </Grid>
//       </Card>
//     </Box>
//   );
// }








import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  Chip,
  Divider,
  Grid,
  MenuItem,
  Alert,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { green, red, blue } from "@mui/material/colors";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import EmergencyIcon from "@mui/icons-material/Warning";
import axios from "axios";

export default function StartStopBot() {
  const [coin, setCoin] = useState("BTCUSDT");
  const [usdtAmount, setUsdtAmount] = useState(50);
  const [strategyMode, setStrategyMode] = useState("all"); // New: track mode
  const [response, setResponse] = useState(null);
  const [message, setMessage] = useState("");
  const [stats, setStats] = useState({
    dailyTradeCount: 0,
    maxTradesPerDay: 8,
    dailyPnL: 0,
    botActive: false,
    insertedAmount: 0
  });
  const [position, setPosition] = useState(null);
  const [balance, setBalance] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const WHITELISTED_COINS = [
    "BTCUSDT", "ETHUSDT", "BNBUSDT", "ADAUSDT", 
    "SOLUSDT", "XRPUSDT", "DOTUSDT", "DOGEUSDT"
  ];

  const STRATEGY_MODES = [
    { value: "all", label: "Multi-Timeframe (Original)" },
    { value: "scalping", label: "5-Min Scalping Strategy" }
  ];

  const startBot = async () => {
    setLoading(true);
    try {
      if (usdtAmount < 50 || usdtAmount > 1000) {
        setMessage("Amount must be between $50 and $1000");
        setLoading(false);
        return;
      }

      const res = await axios.post("http://localhost:8001/start", { 
        coin, 
        usdtAmount: parseFloat(usdtAmount),
        mode: strategyMode // send mode here
      });
      setResponse(res.data);
      setStats(prev => ({ ...prev, botActive: true }));
      setMessage(`✅ LIVE Trading Started with Real Funds! Mode: ${strategyMode}`);
      
      // Refresh data
      fetchStats();
      fetchPosition();
      fetchBalance();
      fetchTradeHistory();
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
      setStats(prev => ({ ...prev, botActive: false }));
    } catch (error) {
      setMessage("❌ Error stopping bot");
    }
    setLoading(false);
  };

  const emergencySell = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8001/emergency-sell");
      setMessage("🚨 Emergency Sell Executed: " + res.data.message);
      fetchPosition();
      fetchBalance();
    } catch (error) {
      setMessage("❌ Emergency sell failed");
    }
    setLoading(false);
  };

  const emergencyStopAll = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8001/emergency-stop-all");
      setMessage("🛑 ALL TRADING STOPPED: " + res.data.message);
      setStats(prev => ({ ...prev, botActive: false }));
      fetchPosition();
      fetchBalance();
    } catch (error) {
      setMessage("❌ Emergency stop failed");
    }
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:8001/stats");
      setStats(res.data);
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

  React.useEffect(() => {
    if (stats.botActive) {
      const interval = setInterval(() => {
        fetchStats();
        fetchPosition();
        fetchBalance();
        fetchTradeHistory();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [stats.botActive]);

  React.useEffect(() => {
    fetchStats();
    fetchPosition();
    fetchBalance();
    fetchTradeHistory();
  }, []);

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

  return (
    <Box p={3}>
      <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4 }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <Chip
            label={stats.botActive ? "LIVE TRADING ACTIVE" : "BOT STOPPED"}
            color={stats.botActive ? "success" : "error"}
            sx={{ 
              fontWeight: 700, 
              fontSize: "1.1rem", 
              px: 3, 
              py: 2,
              background: stats.botActive ? 
                'linear-gradient(45deg, #00c853 30%, #00e676 90%)' :
                'linear-gradient(45deg, #ff5252 30%, #ff867f 90%)'
            }}
            icon={stats.botActive ? <PlayArrowIcon /> : <StopIcon />}
            variant="filled"
          />
        </Box>

        <Typography variant="h4" fontWeight={700} align="center" sx={{ color: blue[700], mb: 1 }}>
          ⚡ Binance Scalping Bot
        </Typography>
        
        <Typography variant="subtitle1" align="center" sx={{ color: blue[500], mb: 3 }}>
          0.3% Target | 0.25% Stop Loss | Multi-Timeframe Analysis
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={3}>
          {/* Control Panel */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ p: 3, borderRadius: 2, minHeight: 320 }}>
              <Typography variant="h6" fontWeight={600} sx={{ color: blue[700], mb: 2 }}>
                🎮 Trading Controls
              </Typography>
              
              <TextField 
                select
                label="Coin Pair" 
                value={coin} 
                onChange={e => setCoin(e.target.value)} 
                fullWidth 
                sx={{ mb: 2 }}
              >
                {WHITELISTED_COINS.map((coinPair) => (
                  <MenuItem key={coinPair} value={coinPair}>
                    {coinPair}
                  </MenuItem>
                ))}
              </TextField>
              
              <TextField 
                label="USDT Amount" 
                type="number" 
                value={usdtAmount} 
                onChange={e => setUsdtAmount(e.target.value)} 
                fullWidth 
                sx={{ mb: 2 }}
                helperText="Min: $50 | Max: $1000"
                error={usdtAmount < 50 || usdtAmount > 1000}
              />

              {/* New Mode Selector */}
              <TextField
                select
                label="Strategy Mode"
                value={strategyMode}
                onChange={e => setStrategyMode(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              >
                {STRATEGY_MODES.map((mode) => (
                  <MenuItem key={mode.value} value={mode.value}>
                    {mode.label}
                  </MenuItem>
                ))}
              </TextField>

              {loading && <LinearProgress sx={{ mb: 2 }} />}

              <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                <Button 
                  variant="contained" 
                  startIcon={<PlayArrowIcon />} 
                  onClick={startBot}
                  sx={{ 
                    bgcolor: green[700], 
                    "&:hover": { bgcolor: green[800] },
                    flex: 1,
                    minWidth: 120
                  }} 
                  disabled={stats.botActive || loading}
                >
                  Start Bot
                </Button>
                
                <Button 
                  variant="contained" 
                  color="error" 
                  startIcon={<StopIcon />} 
                  onClick={stopBot}
                  sx={{ flex: 1, minWidth: 120 }}
                  disabled={!stats.botActive || loading}
                >
                  Stop Bot
                </Button>
                
                <Button 
                  variant="outlined" 
                  color="warning" 
                  startIcon={<EmergencyIcon />} 
                  onClick={emergencySell}
                  sx={{ flex: 1, minWidth: 140 }}
                  disabled={!position || loading}
                >
                  Emergency Sell
                </Button>
                
                <Button 
                  variant="outlined" 
                  color="error" 
                  startIcon={<EmergencyIcon />} 
                  onClick={emergencyStopAll}
                  sx={{ flex: 1, minWidth: 160 }}
                  disabled={loading}
                >
                  Stop ALL Trading
                </Button>
              </Box>

              {message && (
                <Alert 
                  severity={message.includes("✅") ? "success" : message.includes("❌") ? "error" : "info"} 
                  sx={{ mt: 2 }}
                >
                  {message}
                </Alert>
              )}

              {position && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  <strong>Current Position:</strong> {position.quantity} {position.coin} @ ${position.entryPrice}
                </Alert>
              )}
            </Card>
          </Grid>

          {/* Statistics Panel */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ p: 3, borderRadius: 2, minHeight: 320 }}>
              <Typography variant="h6" fontWeight={600} sx={{ color: blue[700], mb: 2 }}>
                📊 Trading Statistics
              </Typography>
              
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="body2"><b>Trades Today:</b></Typography>
                  <Chip 
                    label={`${stats.dailyTradeCount}/${stats.maxTradesPerDay}`} 
                    color={stats.dailyTradeCount >= stats.maxTradesPerDay ? "error" : "primary"}
                    size="small"
                  />
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="body2"><b>Daily PnL:</b></Typography>
                  <Chip 
                    label={`$${stats.dailyPnL?.toFixed(2) || '0.00'}`} 
                    color={stats.dailyPnL >= 0 ? "success" : "error"}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" color={green[800]}>
                    <TrendingUpIcon fontSize="small" /> <b>Profit:</b>
                  </Typography>
                  <Typography variant="h6" color={green[800]}>
                    +${totalProfit.toFixed(2)}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" color={red[800]}>
                    <TrendingDownIcon fontSize="small" /> <b>Loss:</b>
                  </Typography>
                  <Typography variant="h6" color={red[800]}>
                    -${totalLoss.toFixed(2)}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" fontWeight={700} 
                    color={netPnl >= 0 ? green[800] : red[800]}
                    sx={{ textAlign: 'center' }}
                  >
                    Net P/L: ${netPnl.toFixed(2)} USDT
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    Strategy: {strategyMode === "all" ? "Multi-Timeframe" : "5-Min Scalping"} | 0.3% Target | 0.25% Stop Loss
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/* Balance Panel */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight={600} sx={{ color: blue[700], mb: 2 }}>
                💰 Account Balance
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
                    {balance.slice(0, 5).map((asset, index) => (
                      <TableRow key={index}>
                        <TableCell>{asset.asset}</TableCell>
                        <TableCell align="right">{parseFloat(asset.free).toFixed(4)}</TableCell>
                        <TableCell align="right">{parseFloat(asset.locked).toFixed(4)}</TableCell>
                      </TableRow>
                    ))}
                    {balance.length > 5 && (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          <Typography variant="body2" color="text.secondary">
                            + {balance.length - 5} more assets
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>

          {/* Recent Trades */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight={600} sx={{ color: blue[700], mb: 2 }}>
                📋 Recent Trades
              </Typography>
              
              <TableContainer sx={{ maxHeight: 200 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Action</TableCell>
                      <TableCell>Coin</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">P/L%</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tradeHistory.slice(-5).reverse().map((trade, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Chip 
                            label={trade.action} 
                            size="small" 
                            color={trade.action === 'buy' ? 'success' : 'error'}
                          />
                        </TableCell>
                        <TableCell>{trade.coin}</TableCell>
                        <TableCell align="right">${trade.price}</TableCell>
                        <TableCell align="right">
                          <Typography 
                            color={trade.pnlPercent >= 0 ? green[800] : red[800]}
                            fontWeight="bold"
                          >
                            {trade.pnlPercent ? trade.pnlPercent.toFixed(2) + '%' : '-'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                    {tradeHistory.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          <Typography variant="body2" color="text.secondary">
                            No trades yet
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
