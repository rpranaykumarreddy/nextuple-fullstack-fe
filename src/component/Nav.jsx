import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

export default function Nav() {
  const [linkValue, setValue] = useState("user");
  const location = useLocation();

  useEffect(() => {
    let path = location.pathname;
    if (path[0] === "/") path = path.slice(1);
    if (path[path.length - 1] === "/") path = path.slice(0, -1);
    setValue(path);
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        backgroundColor: "#111",
      }}
      value={linkValue}
      onChange={handleChange}
    >
      <BottomNavigationAction
        component={Link}
        to="/user"
        label="Account"
        value="user"
        icon={<AccountCircleIcon />}
        sx={{
          color:
            linkValue === "user" ? "#1976d2 !important" : "#fff !important",
        }}
      />
      <BottomNavigationAction
        component={Link}
        to="/"
        label="Home"
        value=""
        icon={<AccountBalanceWalletIcon />}
        sx={{
          color: linkValue === "" ? "#1976d2 !important" : "#fff !important",
        }}
      />
      <BottomNavigationAction
        component={Link}
        to="/statement"
        label="Statement"
        value="statement"
        icon={<ReceiptLongIcon />}
        sx={{
          color:
            linkValue === "statement"
              ? "#1976d2 !important"
              : "#fff !important",
        }}
      />
    </BottomNavigation>
  );
}
