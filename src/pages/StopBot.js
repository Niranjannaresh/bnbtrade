import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import axios from "axios";

export default function StopBot() {
  const [message, setMessage] = useState("");

  const stopBot = async () => {
    try {
      const res = await axios.post("http://localhost:8001/stop");
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5">Stop Trading Bot</Typography>
      <Box mt={2}>
        <Button variant="contained" color="error" onClick={stopBot}>
          Stop Trading
        </Button>
      </Box>
      {message && <Typography mt={2}>{message}</Typography>}
    </Box>
  );
}
