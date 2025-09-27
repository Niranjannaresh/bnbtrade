import React, { useState } from "react";
import axios from "axios";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // const response = await axios.post("http://localhost:8001/login", {
      //   username,
      //   password,
      // });
      if(username == "test" & password == "Admin"){
      // Save token to localStorage/sessionStorage
      // localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username);
      setSuccess("Login successful!");
      // Navigate("/");
      // <Link to="/">Login</Link>
       navigate("/");

      }
      // Redirect, fetch user data, etc. here if needed
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 350, margin: "auto", padding: "2rem" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer"
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <div style={{ color: "red", marginTop: "1rem" }}>{error}</div>}
        {success && <div style={{ color: "green", marginTop: "1rem" }}>{success}</div>}
      </form>
    </div>
  );
}

// // export default Login;



// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Card,
//   CardContent,
//   Table,
//   TableHead,
//   TableBody,
//   TableCell,
//   TableRow,
//   Chip,
//   Alert
// } from "@mui/material";
// import axios from "axios";
// import { green, red, orange } from "@mui/material/colors";

// export default function Login() {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get("http://localhost:8001/history")
//       .then(res => {
//         setHistory(res.data || []);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Error fetching trade history", err);
//         setHistory([]);
//         setLoading(false);
//       });
//   }, []);

//   // Action ka color decide karo
//   const getActionChip = (action) => {
//     let color = "default";
//     if (action.toLowerCase().includes("buy")) color = "success";
//     else if (action.toLowerCase().includes("sell")) color = "error";
//     return <Chip label={action} color={color} sx={{ fontWeight: 600 }} />;
//   };

//   return (
//     <Box p={3} display="flex" justifyContent="center">
//       <Card sx={{ width: "100%", maxWidth: 900, borderRadius: 3, boxShadow: 4 }}>
//         <CardContent>
//           <Typography variant="h5" align="center" fontWeight={700} gutterBottom>
//             📜 Trade History Login
//           </Typography>

//           {/* Loading State */}
//           {loading ? (
//             <Box display="flex" justifyContent="center" p={3}><CircularProgress /></Box>
//           ) : history.length === 0 ? (
//             <Alert severity="info" sx={{ mt: 2 }}>No trades yet.</Alert>
//           ) : (
//             <Table>
//               <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//                 <TableRow>
//                   <TableCell><b>#</b></TableCell>
//                   <TableCell><b>Date & Time</b></TableCell>
//                   <TableCell><b>Coin</b></TableCell>
//                   <TableCell><b>Action</b></TableCell>
//                   <TableCell align="right"><b>Quantity</b></TableCell>
//                   <TableCell align="right"><b>Price</b></TableCell>
//                   <TableCell align="right"><b>SL</b></TableCell>
//                   <TableCell align="right"><b>TP</b></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {history.map((t, i) => (
//                   <TableRow key={i}
//                     sx={{
//                       backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafafa",
//                       "&:hover": { backgroundColor: "#e3f2fd" }
//                     }}
//                   >
//                     <TableCell>{i + 1}</TableCell>
//                     <TableCell>{new Date(t.timestamp).toLocaleString()}</TableCell>
//                     <TableCell>
//                       <Chip label={t.coin} sx={{ fontWeight: "bold", background: "#eceff1" }} />
//                     </TableCell>
//                     <TableCell>{getActionChip(t.action)}</TableCell>
//                     <TableCell align="right">{t.quantity}</TableCell>
//                     <TableCell align="right">${Number(t.price || t.entryPrice).toFixed(4)}</TableCell>
//                     <TableCell align="right" sx={{ color: red[500] }}>
//                       ${Number(t.stopLoss).toFixed(4)}
//                     </TableCell>
//                     <TableCell align="right" sx={{ color: green[500] }}>
//                       ${Number(t.takeProfit).toFixed(4)}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }
