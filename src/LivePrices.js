
// // import React, { useEffect, useState } from "react";
// // import { io } from "socket.io-client";
// // import {
// //   Box,
// //   Card,
// //   Typography,
// //   Grid,
// //   CircularProgress,
// //   Chip,
// //   Tooltip,
// //   Fade,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   OutlinedInput,
// // } from "@mui/material";
// // import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
// // import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
// // import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
// // import { green, red, grey, blue, orange } from "@mui/material/colors";

// // // SOCKET_URL with bot port
// // const SOCKET_URL = "http://localhost:8001";

// // // Coin icon mapping
// // const coinMeta = {
// //   BTCUSDT: { name: "Bitcoin", icon: <CurrencyBitcoinIcon sx={{ color: "#f2a900" }} /> },
// //   ETHUSDT: { name: "Ethereum", icon: <CurrencyExchangeIcon sx={{ color: "#627eea" }} /> },
// //   BNBUSDT: { name: "Binance Coin", icon: <CurrencyExchangeIcon sx={{ color: "#f3ba2f" }} /> },
// //   THETAUSDT: { name: "Theta", icon: <CurrencyExchangeIcon sx={{ color: blue[500] }} /> },
// //   TRXUSDT: { name: "Tron", icon: <CurrencyExchangeIcon sx={{ color: red[400] }} /> },
// //   XRPUSDT: { name: "Ripple", icon: <CurrencyExchangeIcon sx={{ color: blue[700] }} /> },
// //   DOGEUSDT: { name: "Doge", icon: <CurrencyExchangeIcon sx={{ color: orange[500] }} /> },
// //   LTCUSDT: { name: "Litecoin", icon: <CurrencyExchangeIcon sx={{ color: grey[700] }} /> },
// //   SOLUSDT: { name: "Solana", icon: <CurrencyExchangeIcon sx={{ color: "#5BC6E2" }} /> },
// //   FILUSDT: { name: "Filecoin", icon: <CurrencyExchangeIcon sx={{ color: "#009688" }} /> },
// // };

// // // Signal chip styling
// // function getActionStyle(action) {
// //   switch (action) {
// //     case "buy":
// //       return { bg: green[500], color: "#fff", text: "Buy" };
// //     case "sell":
// //       return { bg: red[500], color: "#fff", text: "Sell" };
// //     case "hold":
// //     default:
// //       return { bg: grey[400], color: "#fff", text: "Hold" };
// //   }
// // }

// // export default function LivePrices() {
// //   const allCoins = [
// //     "BTCUSDT",
// //     "BNBUSDT",
// //     "ETHUSDT",
// //     "THETAUSDT",
// //     "TRXUSDT",
// //     "XRPUSDT",
// //     "FILUSDT",
// //     "SOLUSDT",
// //     "LTCUSDT",
// //     "DOGEUSDT", // ✅ Typo fix
// //   ];

// //   const timeframesOrder = ["1m", "3m", "5m", "15m", "30m", "1h"];

// //   const [selectedCoins, setSelectedCoins] = useState(["BTCUSDT", "ETHUSDT"]);
// //   const [multiSignals, setMultiSignals] = useState({});
// //   const [prices, setPrices] = useState({});
// //   const [loading, setLoading] = useState(true);

// //   // Handle select change
// //   const handleCoinChange = (event) => {
// //     setSelectedCoins(typeof event.target.value === "string" ? event.target.value.split(",") : event.target.value);
// //   };

// //   // Socket: live subscribe
// //   useEffect(() => {
// //     setLoading(true);
// //     const socket = io(SOCKET_URL);

// //     socket.emit("subscribe", selectedCoins);

// //     socket.on("priceUpdate", ({ symbol, price }) => {
// //       setPrices(prev => ({ ...prev, [symbol]: price }));
// //     });

// //     socket.on("multiTimeFrameSignals", ({ symbol, frames }) => {
// //       setMultiSignals((prev) => ({ ...prev, [symbol]: frames }));
// //       setLoading(false);
// //     });

// //     return () => socket.disconnect();
// //   }, [selectedCoins]);

// //   return (
// //     <Box sx={{
// //       mt: { xs: 2, sm: 4, md: 6 },
// //       px: 2,
// //       pb: 6,
// //       display: "flex",
// //       flexDirection: "column",
// //       alignItems: "center",
// //       minHeight: 400,
// //       background: "linear-gradient(90deg, #fffbe6 0%, #e0f7fa 100%)"
// //     }}>
// //       {/* Select coins */}
// //       <Card elevation={8} sx={{
// //         p: 3, minWidth: 300, maxWidth: 500, borderRadius: 4, mb: 3,
// //         background: "linear-gradient(100deg, #f3e7e9 0%, #e3eeff 100%)",
// //         boxShadow: "0 4px 24px 0 rgba(60,150,185,0.13)"
// //       }}>
// //         <FormControl sx={{ width: "100%" }}>
// //           <InputLabel>Select Coin(s)</InputLabel>
// //           <Select
// //             multiple
// //             value={selectedCoins}
// //             onChange={handleCoinChange}
// //             input={<OutlinedInput label="Select Coin(s)" />}
// //             renderValue={selected => (
// //               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
// //                 {selected.map((coin) =>
// //                   <Chip key={coin} label={coinMeta[coin]?.name || coin} sx={{ fontWeight: 600 }} />
// //                 )}
// //               </Box>
// //             )}
// //             MenuProps={{ PaperProps: { sx: { maxHeight: 330 } } }}
// //           >
// //             {allCoins.map((coin) => (
// //               <MenuItem key={coin} value={coin}>
// //                 <Box display="flex" alignItems="center" gap={1}>
// //                   {coinMeta[coin]?.icon || <MonetizationOnIcon />}
// //                   <Typography fontWeight={500}>{coinMeta[coin]?.name || coin}</Typography>
// //                 </Box>
// //               </MenuItem>
// //             ))}
// //           </Select>
// //         </FormControl>
// //       </Card>

// //       {/* Main coins dashboard */}
// //       <Grid container spacing={4} justifyContent="center">
// //         {selectedCoins.map((symbol) => {
// //           const frames = multiSignals[symbol];
// //           const livePrice = prices[symbol];
// //           return (
// //             <Grid item xs={12} sm={10} md={6} lg={5} key={symbol}>
// //               <Fade in={true} timeout={1200}>
// //                 <Card
// //                   elevation={10}
// //                   sx={{
// //                     borderRadius: 4,
// //                     px: { xs: 1.5, sm: 2.5 },
// //                     py: { xs: 2, sm: 2.5 },
// //                     minHeight: 290,
// //                     background: "linear-gradient(117deg, #ece9f7 0%, #baeaff 100%)",
// //                     boxShadow: "0 8px 36px 0 rgba(50,120,255,0.14)"
// //                   }}
// //                 >
// //                   <Box display="flex" alignItems="center" gap={2} mb={2}>
// //                     <Box>
// //                       {coinMeta[symbol]?.icon || <MonetizationOnIcon fontSize="large" color="action" />}
// //                     </Box>
// //                     <Box>
// //                       <Typography variant="h6" fontWeight={600} sx={{ color: "primary.main" }}>
// //                         {coinMeta[symbol]?.name || symbol}
// //                       </Typography>
// //                       <Typography variant="body2" color="text.secondary">
// //                         <b>{symbol}</b>
// //                       </Typography>
// //                     </Box>
// //                   </Box>
// //                   {/* Live price as chip */}
// //                   <Box mb={2}>
// //                     <Chip
// //                       label={
// //                         livePrice !== undefined
// //                           ? `Live Price $${Number(livePrice).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
// //                           : <CircularProgress size={18} />
// //                       }
// //                       color="primary"
// //                       sx={{
// //                         fontSize: "1.15rem",
// //                         fontWeight: 700,
// //                         px: 2.5,
// //                         py: 1,
// //                         bgcolor: "#8ad7ff",
// //                         color: "#00416a",
// //                         boxShadow: 1,
// //                         borderRadius: 2,
// //                       }}
// //                     />
// //                   </Box>
// //                   {/* Multi-timeframe signals grid */}
// //                   {frames ? (
// //                     <Grid container spacing={2}>
// //                       {timeframesOrder.map((tfLabel) => {
// //                         const data = frames[tfLabel];
// //                         if (!data) return null;
// //                         const { combined } = data;
// //                         const style = getActionStyle(combined.action);
// //                         return (
// //                           <Grid item xs={6} sm={4} md={2} key={tfLabel}>
// //                             <Card
// //                               variant="outlined"
// //                               sx={{
// //                                 borderRadius: 2,
// //                                 p: 1.5,
// //                                 textAlign: "center",
// //                                 boxShadow: 2,
// //                                 background: "linear-gradient(90deg, #f5f9ff 60%, #b3d1fc 100%)",
// //                                 "&:hover": { boxShadow: 8, background: "#e3f2fd" }
// //                               }}
// //                             >
// //                               <Typography fontWeight={700} fontSize={"1.06rem"}>
// //                                 {tfLabel}
// //                               </Typography>
// //                               <Tooltip title={combined.reason} arrow>
// //                                 <Chip
// //                                   label={style.text}
// //                                   sx={{
// //                                     bgcolor: style.bg,
// //                                     color: style.color,
// //                                     fontWeight: 600,
// //                                     mt: 0.5,
// //                                     px: 1.2,
// //                                     fontSize: "1.02rem",
// //                                   }}
// //                                 />
// //                               </Tooltip>
// //                             </Card>
// //                           </Grid>
// //                         );
// //                       })}
// //                     </Grid>
// //                   ) : (
// //                     <Box py={3} display="flex" flexDirection="column" alignItems="center">
// //                       <CircularProgress size={22} />
// //                       <Typography align="center" sx={{ mt: 1 }} color="text.secondary">
// //                         Loading signals...
// //                       </Typography>
// //                     </Box>
// //                   )}
// //                 </Card>
// //               </Fade>
// //             </Grid>
// //           );
// //         })}
// //       </Grid>
// //     </Box>
// //   );
// // }



// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const SOCKET_URL = "http://localhost:8001";

// function LiveSignalExample() {
//   const [multiSignals, setMultiSignals] = useState({});

//   useEffect(() => {
//     const socket = io(SOCKET_URL);

//     socket.emit("subscribe", ["BTCUSDT", "ETHUSDT"]); // example

//     socket.on("multiTimeFrameSignals", ({ symbol, frames }) => {
//       setMultiSignals(prev => ({ ...prev, [symbol]: frames }));
//     });

//     return () => socket.disconnect();
//   }, []);

//   return (
//     <div>
//       {Object.entries(multiSignals).map(([symbol, frames]) => (
//         <div key={symbol}>
//           <h3>{symbol}</h3>
//           {Object.entries(frames).map(([tf, { combined }]) => (
//             <div key={tf}>
//               <strong>{tf}:</strong> {combined.action} ({combined.reason})
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default LiveSignalExample;



// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// import {
//   Box,
//   Card,
//   Chip,
//   CircularProgress,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   OutlinedInput,
//   Select,
//   Tooltip,
//   Typography,
//   Fade,
// } from "@mui/material";

// import {
//   CurrencyBitcoin as CurrencyBitcoinIcon,
//   CurrencyExchange as CurrencyExchangeIcon,
//   MonetizationOn as MonetizationOnIcon,
// } from "@mui/icons-material";

// import { green, red, grey, blue, orange } from "@mui/material/colors";

// const SOCKET_URL = "http://localhost:8001"; // update as per your backend URL

// const coinMeta = {
//   BTCUSDT: { name: "Bitcoin", icon: <CurrencyBitcoinIcon sx={{ color: "#f2a900" }} /> },
//   ETHUSDT: { name: "Ethereum", icon: <CurrencyExchangeIcon sx={{ color: "#627eea" }} /> },
//   BNBUSDT: { name: "Binance Coin", icon: <CurrencyExchangeIcon sx={{ color: "#f3ba2f" }} /> },
//   THETAUSDT: { name: "Theta", icon: <CurrencyExchangeIcon sx={{ color: blue[500] }} /> },
//   TRXUSDT: { name: "Tron", icon: <CurrencyExchangeIcon sx={{ color: red[400] }} /> },
//   XRPUSDT: { name: "Ripple", icon: <CurrencyExchangeIcon sx={{ color: blue[700] }} /> },
//   DOGEUSDT: { name: "Doge", icon: <CurrencyExchangeIcon sx={{ color: orange[500] }} /> },
//   LTCUSDT: { name: "Litecoin", icon: <CurrencyExchangeIcon sx={{ color: grey[700] }} /> },
//   SOLUSDT: { name: "Solana", icon: <CurrencyExchangeIcon sx={{ color: "#5BC6E2" }} /> },
//   FILUSDT: { name: "Filecoin", icon: <CurrencyExchangeIcon sx={{ color: "#009688" }} /> },
// };

// const allCoins = Object.keys(coinMeta);

// const timeframesOrder = ["1m", "3m", "5m", "15m", "30m", "1h"];

// function getActionStyle(action) {
//   switch (action) {
//     case "buy":
//       return { bg: green[500], color: "#fff", text: "Buy" };
//     case "sell":
//       return { bg: red[500], color: "#fff", text: "Sell" };
//     case "hold":
//     default:
//       return { bg: grey[400], color: "#fff", text: "Hold" };
//   }
// }

// export default function LivePrices() {
//   const [selectedCoins, setSelectedCoins] = useState(["BTCUSDT", "ETHUSDT"]);
//   const [multiSignals, setMultiSignals] = useState({});
//   const [prices, setPrices] = useState({});
//   const [loading, setLoading] = useState(true);

//   const handleCoinChange = (event) => {
//     setSelectedCoins(typeof event.target.value === "string" ? event.target.value.split(",") : event.target.value);
//   };

//   useEffect(() => {
//     setLoading(true);
//     const socket = io(SOCKET_URL);

//     socket.emit("subscribe", selectedCoins);

//     socket.on("priceUpdate", ({ symbol, price }) => {
//       setPrices(prev => ({ ...prev, [symbol]: price }));
//     });

//     socket.on("multiTimeFrameSignals", ({ symbol, frames }) => {
//       setMultiSignals(prev => ({ ...prev, [symbol]: frames }));
//       setLoading(false);
//     });

//     return () => socket.disconnect();
//   }, [selectedCoins]);

//   return (
//     <Box
//       sx={{
//         mt: { xs: 2, sm: 4, md: 6 },
//         px: 2,
//         pb: 6,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         minHeight: 400,
//         background: "linear-gradient(90deg, #fffbe6 0%, #e0f7fa 100%)",
//       }}
//     >
//       {/* Select Coins */}
//       <Card
//         elevation={8}
//         sx={{
//           p: 3,
//           minWidth: 300,
//           maxWidth: 500,
//           borderRadius: 4,
//           mb: 3,
//           background: "linear-gradient(100deg, #f3e7e9 0%, #e3eeff 100%)",
//           boxShadow: "0 4px 24px 0 rgba(60,150,185,0.13)",
//         }}
//       >
//         <FormControl sx={{ width: "100%" }}>
//           <InputLabel>Select Coin(s)</InputLabel>
//           <Select
//             multiple
//             value={selectedCoins}
//             onChange={handleCoinChange}
//             input={<OutlinedInput label="Select Coin(s)" />}
//             renderValue={(selected) => (
//               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                 {selected.map((coin) => (
//                   <Chip key={coin} label={coinMeta[coin]?.name || coin} sx={{ fontWeight: 600 }} />
//                 ))}
//               </Box>
//             )}
//             MenuProps={{ PaperProps: { sx: { maxHeight: 330 } } }}
//           >
//             {allCoins.map((coin) => (
//               <MenuItem key={coin} value={coin}>
//                 <Box display="flex" alignItems="center" gap={1}>
//                   {coinMeta[coin]?.icon || <MonetizationOnIcon />}
//                   <Typography fontWeight={500}>{coinMeta[coin]?.name || coin}</Typography>
//                 </Box>
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Card>

//       {/* Coins Dashboard */}
//       <Grid container spacing={4} justifyContent="center">
//         {selectedCoins.map((symbol) => {
//           const frames = multiSignals[symbol];
//           const livePrice = prices[symbol];
//           return (
//             <Grid item xs={12} sm={10} md={6} lg={5} key={symbol}>
//               <Fade in timeout={1200}>
//                 <Card
//                   elevation={10}
//                   sx={{
//                     borderRadius: 4,
//                     px: { xs: 1.5, sm: 2.5 },
//                     py: { xs: 2, sm: 2.5 },
//                     minHeight: 290,
//                     background: "linear-gradient(117deg, #ece9f7 0%, #baeaff 100%)",
//                     boxShadow: "0 8px 36px 0 rgba(50,120,255,0.14)",
//                   }}
//                 >
//                   <Box display="flex" alignItems="center" gap={2} mb={2}>
//                     <Box>{coinMeta[symbol]?.icon || <MonetizationOnIcon fontSize="large" color="action" />}</Box>
//                     <Box>
//                       <Typography variant="h6" fontWeight={600} sx={{ color: "primary.main" }}>
//                         {coinMeta[symbol]?.name || symbol}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         <b>{symbol}</b>
//                       </Typography>
//                     </Box>
//                   </Box>

//                   {/* Live Price */}
//                   <Box mb={2}>
//                     <Chip
//                       label={
//                         livePrice !== undefined
//                           ? `Live Price $${Number(livePrice).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
//                           : <CircularProgress size={18} />
//                       }
//                       color="primary"
//                       sx={{
//                         fontSize: "1.15rem",
//                         fontWeight: 700,
//                         px: 2.5,
//                         py: 1,
//                         bgcolor: "#8ad7ff",
//                         color: "#00416a",
//                         boxShadow: 1,
//                         borderRadius: 2,
//                       }}
//                     />
//                   </Box>

//                   {/* Multi-Timeframe Signals */}
//                   {frames ? (
//                     <Grid container spacing={2}>
//                       {timeframesOrder.map((tfLabel) => {
//                         const data = frames[tfLabel];
//                         if (!data) return null;
//                         const { combined } = data;
//                         const style = getActionStyle(combined.action);
//                         return (
//                           <Grid item xs={6} sm={4} md={2} key={tfLabel}>
//                             <Card
//                               variant="outlined"
//                               sx={{
//                                 borderRadius: 2,
//                                 p: 1.5,
//                                 textAlign: "center",
//                                 boxShadow: 2,
//                                 background: "linear-gradient(90deg, #f5f9ff 60%, #b3d1fc 100%)",
//                                 "&:hover": { boxShadow: 8, background: "#e3f2fd" },
//                               }}
//                             >
//                               <Typography fontWeight={700} fontSize={"1.06rem"}>
//                                 {tfLabel}
//                               </Typography>
//                               <Tooltip title={combined.reason} arrow>
//                                 <Chip
//                                   label={style.text}
//                                   sx={{
//                                     bgcolor: style.bg,
//                                     color: style.color,
//                                     fontWeight: 600,
//                                     mt: 0.5,
//                                     px: 1.2,
//                                     fontSize: "1.02rem",
//                                   }}
//                                 />
//                               </Tooltip>
//                             </Card>
//                           </Grid>
//                         );
//                       })}
//                     </Grid>
//                   ) : (
//                     <Box py={3} display="flex" flexDirection="column" alignItems="center">
//                       <CircularProgress size={22} />
//                       <Typography align="center" sx={{ mt: 1 }} color="text.secondary">
//                         Loading signals...
//                       </Typography>
//                     </Box>
//                   )}
//                 </Card>
//               </Fade>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </Box>
//   );
// }










// import React, { useEffect, useState, useRef } from "react";
// import { io } from "socket.io-client";

// import {
//   Box,
//   Card,
//   Chip,
//   CircularProgress,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   OutlinedInput,
//   Select,
//   Tooltip,
//   Typography,
//   Fade,
//   LinearProgress,
//   Skeleton
// } from "@mui/material";

// import {
//   CurrencyBitcoin as CurrencyBitcoinIcon,
//   CurrencyExchange as CurrencyExchangeIcon,
//   MonetizationOn as MonetizationOnIcon,
// } from "@mui/icons-material";

// import { green, red, grey, blue, orange } from "@mui/material/colors";

// import { ResponsiveContainer, LineChart, Line } from 'recharts';

// const SOCKET_URL = "http://localhost:8001";

// const coinMeta = {
//   BTCUSDT: { name: "Bitcoin", icon: <CurrencyBitcoinIcon sx={{ color: "#f2a900" }} /> },
//   ETHUSDT: { name: "Ethereum", icon: <CurrencyExchangeIcon sx={{ color: "#627eea" }} /> },
//   // ... other coins
// };
// const allCoins = Object.keys(coinMeta);
// const timeframesOrder = ["1m", "3m", "5m", "15m", "30m", "1h"];

// function getActionStyle(action) {
//   switch (action) {
//     case "buy": return { bg: green[600], color: "#fff", text: "Buy" };
//     case "sell": return { bg: red[600], color: "#fff", text: "Sell" };
//     default: return { bg: grey[500], color: "#fff", text: "Hold" };
//   }
// }

// export default function LivePrices() {
//   const [selectedCoins, setSelectedCoins] = useState(() => {
//     const saved = localStorage.getItem("selectedCoins");
//     return saved ? JSON.parse(saved) : ["BTCUSDT", "ETHUSDT"];
//   });
//   const [multiSignals, setMultiSignals] = useState({});
//   const [prices, setPrices] = useState({});
//   const [priceHistory, setPriceHistory] = useState({});
//   const [loading, setLoading] = useState(true);
//   const lastPricesRef = useRef({});

//   const handleCoinChange = (e) => {
//     const val = typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value;
//     setSelectedCoins(val);
//     localStorage.setItem("selectedCoins", JSON.stringify(val));
//   };

//   useEffect(() => {
//     setLoading(true);
//     const socket = io(SOCKET_URL);
//     socket.emit("subscribe", selectedCoins);

//     socket.on("priceUpdate", ({ symbol, price }) => {
//       setPrices(prev => {
//         const prevPrice = lastPricesRef.current[symbol];
//         lastPricesRef.current[symbol] = price;
//         return { ...prev, [symbol]: price };
//       });
//       setPriceHistory(prev => {
//         const history = prev[symbol] || [];
//         const newHistory = [...history.slice(-29), { price, time: Date.now() }];
//         return { ...prev, [symbol]: newHistory };
//       });
//     });

//     socket.on("multiTimeFrameSignals", ({ symbol, frames }) => {
//       setMultiSignals(prev => ({ ...prev, [symbol]: frames }));
//       setLoading(false);
//     });

//     return () => socket.disconnect();
//   }, [selectedCoins]);

//   // Animate price change color
//   const getPriceChangeColor = (symbol) => {
//     if (!lastPricesRef.current[symbol]) return "inherit";
//     const prev = lastPricesRef.current[symbol];
//     const curr = prices[symbol];
//     if (!prev) return "inherit";
//     if (curr > prev) return "#4caf50"; // green
//     if (curr < prev) return "#f44336"; // red
//     return "inherit";
//   };

//   return (
//     <Box sx={{ mt: 4, px: 2, pb: 6, minHeight: 400 }}>
//       {/* Select Coins */}
//       <Card sx={{ p: 3, maxWidth: 500, mx: "auto", mb: 3 }}>
//         <FormControl fullWidth>
//           <InputLabel>Select Coin(s)</InputLabel>
//           <Select
//             multiple
//             value={selectedCoins}
//             onChange={handleCoinChange}
//             input={<OutlinedInput label="Select Coin(s)" />}
//             renderValue={(selected) => (
//               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                 {selected.map(coin => <Chip key={coin} label={coinMeta[coin]?.name || coin} />)}
//               </Box>
//             )}
//           >
//             {allCoins.map(coin => (
//               <MenuItem key={coin} value={coin}>
//                 <Box display="flex" alignItems="center" gap={1}>
//                   {coinMeta[coin]?.icon || <MonetizationOnIcon />}
//                   <Typography>{coinMeta[coin]?.name || coin}</Typography>
//                 </Box>
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Card>

//       {/* Coins Dashboard */}
//       <Grid container spacing={4} justifyContent="center">
//         {selectedCoins.map(symbol => {
//           const frames = multiSignals[symbol];
//           const livePrice = prices[symbol];
//           const histData = priceHistory[symbol] || [];

//           return (
//             <Grid item xs={12} sm={10} md={6} lg={5} key={symbol}>
//               <Fade in timeout={1200}>
//                 <Card sx={{ borderRadius: 3, p: 2, minHeight: 320, boxShadow: 3 }}>
//                   <Box display="flex" alignItems="center" gap={2} mb={2}>
//                     <Box>{coinMeta[symbol]?.icon}</Box>
//                     <Box>
//                       <Typography variant="h6" fontWeight={600} color="primary.main">
//                         {coinMeta[symbol]?.name || symbol}
//                       </Typography>
//                       <Typography color="text.secondary"><b>{symbol}</b></Typography>
//                     </Box>
//                   </Box>

//                   {/* Animated Live Price */}
//                   <Box mb={2}>
//                     {livePrice !== undefined ? (
//                       <Chip
//                         label={`$${livePrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
//                         sx={{
//                           fontSize: 18,
//                           fontWeight: "bold",
//                           backgroundColor: getPriceChangeColor(symbol),
//                           color: "#fff",
//                           transition: "background-color 0.4s ease",
//                           px: 3,
//                           py: 1,
//                           borderRadius: 2,
//                         }}
//                       />
//                     ) : (
//                       <CircularProgress size={20} />
//                     )}
//                   </Box>

//                   {/* Sparkline mini chart */}
//                   <Box mb={2} height={60}>
//                     {histData.length > 1 ? (
//                       <ResponsiveContainer width="100%" height="100%">
//                         <LineChart data={histData}>
//                           <Line
//                             type="monotone"
//                             dataKey="price"
//                             stroke="#1976d2"
//                             strokeWidth={2}
//                             dot={false}
//                           />
//                         </LineChart>
//                       </ResponsiveContainer>
//                     ) : (
//                       <Skeleton variant="rectangular" width="100%" height="60px" />
//                     )}
//                   </Box>

//                   {/* Multi-Timeframe Signal Bars */}
//                   {frames ? (
//                     <Grid container spacing={1}>
//                       {timeframesOrder.map(tfLabel => {
//                         const frameData = frames[tfLabel];
//                         if (!frameData) return null;
//                         const { combined } = frameData;
//                         const style = getActionStyle(combined.action);

//                         // Map signal to numeric for progress bar example
//                         const progressVal = combined.action === "buy" ? 100 :
//                           combined.action === "sell" ? 0 : 50;

//                         return (
//                           <Grid item xs={6} sm={4} md={2} key={tfLabel}>
//                             <Tooltip title={`${combined.action.toUpperCase()}: ${combined.reason}`} arrow>
//                               <Box>
//                                 <Typography fontWeight={700} fontSize={14} mb={0.3} textAlign="center">{tfLabel}</Typography>
//                                 <Chip
//                                   label={style.text}
//                                   sx={{
//                                     bgcolor: style.bg,
//                                     color: style.color,
//                                     fontWeight: 600,
//                                     width: "100%",
//                                     mb: 0.5,
//                                   }}
//                                 />
//                                 <LinearProgress
//                                   variant="determinate"
//                                   value={progressVal}
//                                   sx={{ borderRadius: 1, height: 8 }}
//                                   color={combined.action === "buy" ? "success" : combined.action === "sell" ? "error" : "inherit"}
//                                 />
//                               </Box>
//                             </Tooltip>
//                           </Grid>
//                         );
//                       })}
//                     </Grid>
//                   ) : (
//                     <Box py={2} display="flex" flexDirection="column" alignItems="center">
//                       <CircularProgress size={24} />
//                       <Typography color="text.secondary" mt={1}>Loading signals...</Typography>
//                     </Box>
//                   )}
//                 </Card>
//               </Fade>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </Box>
//   );
// }










import React, { useState, useMemo, useEffect, useRef } from "react";
import { io } from "socket.io-client";

import {
  Box,
  Card,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Tooltip,
  Typography,
  Fade,
  IconButton,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import {
  CurrencyBitcoin as CurrencyBitcoinIcon,
  CurrencyExchange as CurrencyExchangeIcon,
  MonetizationOn as MonetizationOnIcon,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";

import { green, red, grey, blue, orange } from "@mui/material/colors";

const SOCKET_URL = "http://localhost:8001";

const coinMeta = {
  BTCUSDT: { name: "Bitcoin", icon: <CurrencyBitcoinIcon sx={{ color: "#f2a900" }} /> },
  ETHUSDT: { name: "Ethereum", icon: <CurrencyExchangeIcon sx={{ color: "#627eea" }} /> },
  BNBUSDT: { name: "Binance Coin", icon: <CurrencyExchangeIcon sx={{ color: "#f3ba2f" }} /> },
  THETAUSDT: { name: "Theta", icon: <CurrencyExchangeIcon sx={{ color: blue[500] }} /> },
  TRXUSDT: { name: "Tron", icon: <CurrencyExchangeIcon sx={{ color: red[400] }} /> },
  XRPUSDT: { name: "Ripple", icon: <CurrencyExchangeIcon sx={{ color: blue[700] }} /> },
  DOGEUSDT: { name: "Doge", icon: <CurrencyExchangeIcon sx={{ color: orange[500] }} /> },
  LTCUSDT: { name: "Litecoin", icon: <CurrencyExchangeIcon sx={{ color: grey[700] }} /> },
  SOLUSDT: { name: "Solana", icon: <CurrencyExchangeIcon sx={{ color: "#5BC6E2" }} /> },
  FILUSDT: { name: "Filecoin", icon: <CurrencyExchangeIcon sx={{ color: "#009688" }} /> },
};

const allCoins = Object.keys(coinMeta);
const timeframesOrder = ["1m", "3m", "5m", "15m", "30m", "1h"];

export default function LivePrices() {
  const [mode, setMode] = useState("light");
  const [selectedCoins, setSelectedCoins] = useState(["BTCUSDT", "ETHUSDT"]);
  const [multiSignals, setMultiSignals] = useState({});
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  const toggleDarkMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#1976d2" : "#90caf9",
          },
          secondary: {
            main: mode === "light" ? "#f50057" : "#f48fb1",
          },
          background: {
            default: mode === "light" ? "#fafafa" : "#121212",
            paper: mode === "light" ? "#fff" : "#1e1e1e",
          },
          text: {
            primary: mode === "light" ? "#000" : "#fff",
          },
        },
      }),
    [mode]
  );

  const getActionStyle = (action) => {
    switch (action) {
      case "buy":
        return { bg: green[600], color: "#fff", text: "Buy" };
      case "sell":
        return { bg: red[600], color: "#fff", text: "Sell" };
      default:
        return { bg: grey[500], color: "#fff", text: "Hold" };
    }
  };

  // Socket Connection
  useEffect(() => {
    setLoading(true);
    const socket = io(SOCKET_URL);

    socket.emit("subscribe", selectedCoins);

    socket.on("priceUpdate", ({ symbol, price }) => {
      setPrices((prev) => ({ ...prev, [symbol]: price }));
    });

    socket.on("multiTimeFrameSignals", ({ symbol, frames }) => {
      setMultiSignals((prev) => ({ ...prev, [symbol]: frames }));
      setLoading(false);
    });

    return () => socket.disconnect();
  }, [selectedCoins]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          mt: { xs: 2, sm: 4, md: 6 },
          px: 2,
          pb: 6,
          minHeight: 400,
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        {/* Dark Mode Toggle */}
        <Box textAlign="right" mb={1}>
          <IconButton onClick={toggleDarkMode} color="inherit">
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>

        {/* Select Coins */}
        <Card
          elevation={8}
          sx={{
            p: 3,
            minWidth: 300,
            maxWidth: 500,
            mx: "auto",
            mb: 3,
            bgcolor: "background.paper",
            boxShadow: 3,
            borderRadius: 3,
          }}
        >
          <FormControl sx={{ width: "100%" }}>
            <InputLabel>Select Coin(s)</InputLabel>
            <Select
              multiple
              value={selectedCoins}
              onChange={(e) =>
                setSelectedCoins(
                  typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value
                )
              }
              input={<OutlinedInput label="Select Coin(s)" />}
              sx={{ color: "text.primary" }}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((coin) => (
                    <Chip key={coin} label={coinMeta[coin]?.name || coin} />
                  ))}
                </Box>
              )}
            >
              {allCoins.map((coin) => (
                <MenuItem key={coin} value={coin}>
                  <Box display="flex" alignItems="center" gap={1}>
                    {coinMeta[coin]?.icon || <MonetizationOnIcon />}
                    <Typography>{coinMeta[coin]?.name || coin}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Card>

        {/* Coins Dashboard */}
        <Grid container spacing={4} justifyContent="center">
          {selectedCoins.map((symbol) => {
            const frames = multiSignals[symbol];
            const livePrice = prices[symbol];
            return (
              <Grid item xs={12} sm={10} md={6} lg={5} key={symbol}>
                <Fade in timeout={1200}>
                  <Card
                    elevation={6}
                    sx={{
                      borderRadius: 3,
                      px: { xs: 1.5, sm: 2.5 },
                      py: { xs: 2, sm: 2.5 },
                      minHeight: 290,
                      bgcolor: "background.paper",
                      color: "text.primary",
                      boxShadow: 3,
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Box>{coinMeta[symbol]?.icon}</Box>
                      <Box>
                        <Typography variant="h6" fontWeight={600} color="primary.main">
                          {coinMeta[symbol]?.name || symbol}
                        </Typography>
                        <Typography color="text.secondary">
                          <b>{symbol}</b>
                        </Typography>
                      </Box>
                    </Box>

                    {/* Live Price */}
                    <Box mb={2}>
                      <Chip
                        label={
                          livePrice !== undefined
                            ? `Live Price $${Number(livePrice).toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                              })}`
                            : <CircularProgress size={18} />
                        }
                        color="primary"
                        sx={{ fontSize: "1.15rem", fontWeight: 700, px: 2, py: 1, borderRadius: 2 }}
                      />
                    </Box>

                    {/* Multi-Timeframe Signals */}
                    {frames ? (
                      <Grid container spacing={2}>
                        {timeframesOrder.map((tfLabel) => {
                          const data = frames[tfLabel];
                          if (!data) return null;
                          const { combined } = data;
                          const style = getActionStyle(combined.action);
                          return (
                            <Grid item xs={6} sm={4} md={2} key={tfLabel}>
                              <Card
                                variant="outlined"
                                sx={{
                                  borderRadius: 2,
                                  p: 1.5,
                                  textAlign: "center",
                                  boxShadow: 2,
                                  background:
                                    mode === "light"
                                      ? "linear-gradient(90deg, #f5f9ff 60%, #b3d1fc 100%)"
                                      : "linear-gradient(90deg, #2c2c2c 60%, #3d3d3d 100%)",
                                  "&:hover": { boxShadow: 6 },
                                  color: style.color,
                                  bgcolor: style.bg,
                                  fontWeight: 600,
                                }}
                              >
                                <Typography fontWeight={700} fontSize={"1.06rem"}>
                                  {tfLabel}
                                </Typography>
                                <Tooltip title={combined.reason} arrow>
                                  <Typography>{style.text}</Typography>
                                </Tooltip>
                              </Card>
                            </Grid>
                          );
                        })}
                      </Grid>
                    ) : (
                      <Box py={3} display="flex" flexDirection="column" alignItems="center">
                        <CircularProgress size={22} />
                        <Typography sx={{ mt: 1 }} color="text.secondary">
                          Loading signals...
                        </Typography>
                      </Box>
                    )}
                  </Card>
                </Fade>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

