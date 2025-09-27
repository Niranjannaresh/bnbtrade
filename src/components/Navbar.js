// import React from "react";
// import { AppBar, Toolbar, Button, Typography } from "@mui/material";
// import { Link as RouterLink } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <AppBar position="static" color="transparent" elevation={2}>
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           No Loss Crypto-Bot
//         </Typography>
//         <Button component={RouterLink} to="/" color="primary">Dashboard</Button>
//         <Button component={RouterLink} to="/start" color="primary">Start Bot</Button>
//         <Button component={RouterLink} to="/stop" color="primary">Stop Trading</Button>
//         <Button component={RouterLink} to="/balance" color="primary">Balances</Button>
//         <Button component={RouterLink} to="/history" color="primary">Trade History</Button>
//       </Toolbar>
//     </AppBar>
//   );
// }



import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

// Styled nav button
const NavButton = styled(Button)(({ theme, active }) => ({
  color: active ? "#fff" : "#e0f7fa",
  backgroundColor: active ? theme.palette.primary.main : "transparent",
  margin: theme.spacing(0, 0.5),
  borderRadius: 20,
  padding: "6px 16px",
  fontWeight: 600,
  textTransform: "none",
  "&:hover": {
    backgroundColor: active
      ? theme.palette.primary.dark
      : "rgba(255,255,255,0.15)",
  },
  transition: "all 0.3s ease",
}));

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Start Bot", path: "/start" },
    { label: "Stop Trading", path: "/stop" },
    { label: "Balances", path: "/balance" },
    { label: "Trade History", path: "/history" },
    { label: "Login", path: "/login" },
  ];

  return (
    <AppBar
      position="static"
      elevation={4}
      sx={{
        background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
        boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
      }}
    >
      <Toolbar>
        {/* Logo/Brand */}
        <Box display="flex" alignItems="center" flexGrow={1}>
          <IconButton edge="start" sx={{ color: "#ffeb3b", mr: 1 }}>
            {/* <MonetizationOnIcon /> */}
            <img
              src={`${process.env.PUBLIC_URL}/NoLossBot.png`}
              alt="No Loss Bot"
              style={{ width: 48, height: 48, borderRadius: "50%" }}
            />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: 0.5,
              color: "#fff",
              userSelect: "none",
            }}
          >
            No Loss Crypto-Bot
          </Typography>
        </Box>

        {/* Nav Links */}
        {navItems.map((item) => (
          <NavButton
            key={item.path}
            component={RouterLink}
            to={item.path}
            active={location.pathname === item.path ? 1 : 0}
          >
            {item.label}
          </NavButton>
        ))}
      </Toolbar>
    </AppBar>
  );
}
