import { Box, Typography, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";

export default function TransactionTimeoutProgress({ created, onTimeout }) {
  const [seconds, setSeconds] = useState(
    ((Date.parse(created) - Date.now()) / 1000 + 60).toFixed(0)
  );

  let timer = null;

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSecond) => {
        return prevSecond <= 1 ? 0 : prevSecond - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [created]);

  useEffect(() => {
    if (seconds <= 0) {
      clearInterval(timer);
      onTimeout();
    }
  }, [seconds]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          value={100 - ((60 - seconds) / 60) * 100}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {seconds}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
