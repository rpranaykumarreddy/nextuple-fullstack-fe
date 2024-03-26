import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import React from "react";
import WalletIcon from "@mui/icons-material/Wallet";
import dateTimeAsString from "../Utils/dateTimeAsString";
import TOTPEnableTool from "./TOTPEnableTool";
import WalletOpsTools from "./WalletOpsTools";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useNavigate } from "react-router-dom";
import amountAsRupee from "../Utils/amountAsRupee";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import TOTPDisableTool from "./TOTPDisableTool";

export default function WalletCard({ data, getWalletDetails, isLoading }) {
  const navigate = useNavigate();

  const openLink = (value) => {
    navigate(value);
  };
  if (data) {
    return (
      <>
        <Box
          key={data.id}
          sx={{
            minWidth: 275,
            width: "90%",
            maxWidth: "1000px",
            flexGrow: 1,
            flexBasis: 0,
            margin: "10px 10px 20px 10px",
            padding: "5px",
            textAlign: "left",
          }}
        >
          <Stack
            flexWrap="wrap"
            justifyContent="space-evenly"
            alignItems="center"
            direction={{
              xs: "column",
              md: "row",
            }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            divider={
              <>
                <Divider flexItem />
              </>
            }
          >
            <Box sx={{ maxWidth: "300px" }}>
              <CardContent sx={{ maxWidth: "90vw" }}>
                <WalletOpsTools />
              </CardContent>
            </Box>
            <Box sx={{ maxWidth: "300px" }}>
              <CardHeader
                sx={{ maxWidth: "90vw" }}
                avatar={
                  <Avatar sx={{ bgcolor: "#b72467" }} aria-label="Wallet">
                    <WalletIcon />
                  </Avatar>
                }
                title={
                  <h4>
                    <span style={{ overflowWrap: "anywhere" }}>
                      Balance: {amountAsRupee(data.balance)}
                    </span>
                    <IconButton
                      color="primary"
                      sx={{
                        fontSize: "inherit",
                      }}
                      data-testid="refresh"
                      aria-label="refresh"
                      onClick={getWalletDetails}
                      disabled={isLoading}
                    >
                      <RefreshIcon />
                    </IconButton>
                  </h4>
                }
                subheader={"updated: " + dateTimeAsString(data.updated)}
              />
              <CardContent sx={{ maxWidth: "90vw" }}>
                {data.totpEnabled ? <TOTPDisableTool /> : <TOTPEnableTool />}
              </CardContent>
            </Box>
            <Box sx={{ maxWidth: "300px" }}>
              <CardContent sx={{ maxWidth: "90vw" }}>
                <Stack spacing={2} direction="row">
                  <Button
                    fullWidth
                    onClick={() => {
                      openLink("/statement");
                    }}
                    sx={{ display: "block" }}
                  >
                    <ReceiptLongIcon />
                    <br />
                    <h4>Statement</h4>
                  </Button>
                  <Button
                    fullWidth
                    onClick={() => {
                      openLink("/cashback");
                    }}
                    sx={{ display: "block" }}
                  >
                    <AccountBalanceWalletIcon />
                    <br />
                    <h4>Cashback</h4>
                  </Button>
                </Stack>
              </CardContent>
            </Box>
          </Stack>
          <Box sx={{ textAlign: "left", mt: 5 }}>
            <h2>How Internet Banking it works</h2>
            <br />
            <ul>
              <li>
                On recharge you can get upto 1% of the amount as cashback.
              </li>
              <li>You can recharge with upto ₹1,00,000.</li>
              <li>You can transfer with upto ₹1,00,00,000.</li>
              <li>
                Enable TOTP using Google/Microsoft authenticator app for a
                secure transfers.
              </li>
              <li>Click on statement to view all transactions.</li>
              <li>Click on cashbacks to view cashbacks for each recharge.​</li>
              <li>
                You can find the logout option by clicking on the profile icon
                on Top Right.
              </li>
            </ul>
          </Box>
        </Box>
      </>
    );
  } else {
    return null;
  }
}
