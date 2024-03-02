import {
  Alert,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  Modal,
  TextField,
} from "@mui/material";
import React from "react";
import dateAsString from "../Utils/dateAsString";
import WalletIcon from "@mui/icons-material/Wallet";
import dateTimeAsString from "../Utils/dateTimeAsString";
import {
  useConfirmTOTP,
  useGetInitTOTP,
  useRechargeWallet,
  useTransactions,
} from "../data/serverHooks";
import { useSelector } from "react-redux";

export default function TransactionTool({ open, onClose }) {
  const [
    error,
    isLoading,
    initTransaction,
    confirmTransaction,
    cancelTransaction,
    checkWallet,
    data,
    setData,
    isWalletExists,
  ] = useTransactions();
  const wallet = useSelector((state) => state.user.wallet);
  const [initDone, setInitDone] = React.useState(false);
  const [code, setCode] = React.useState(undefined);
  const initSubmit = async (e) => {
    e.preventDefault();
    const response = await initTransaction(data);
    if (response) {
      setInitDone(true);
    }
  };
  const confirmSubmit = async (e) => {
    e.preventDefault();
    const response = await confirmTransaction(code);
    console.log(response);
    if (response == "SUCCESS") {
      setInitDone(false);
      setCode(undefined);
      onClose();
    } else if (response == "TIMEOUT") {
      setInitDone(false);
      setCode(undefined);
    }
  };
  const cancelSubmit = async (e) => {
    e.preventDefault();
    const response = await cancelTransaction();
    if (response) {
      setInitDone(false);
      setCode(undefined);
      onClose();
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  let content = (
    <>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Reciever's username"
          type="text"
          variant="outlined"
          value={data.to}
          disabled={isLoading}
          required
          onBlur={checkWallet}
          onChange={(e) => setData((prev) => ({ ...prev, to: e.target.value }))}
        />
        {isWalletExists === false && (
          <FormHelperText>Wallet does not exist</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="amount"
          type="number"
          variant="outlined"
          value={data.amount}
          disabled={isLoading}
          required
          onChange={(e) =>
            setData((prev) => ({ ...prev, amount: e.target.value }))
          }
        />
      </FormControl>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        fullWidth
      >
        <Button onClick={initSubmit} disabled={isLoading || !data}>
          Initiate
        </Button>
      </ButtonGroup>
    </>
  );

  if (initDone) {
    content = (
      <>
        {wallet?.totpEnabled && (
          <FormControl fullWidth margin="normal">
            <TextField
              label="TOTP"
              type="number"
              variant="outlined"
              value={code}
              disabled={isLoading}
              required
              onChange={(e) => setCode(e.target.value)}
            />
          </FormControl>
        )}
        <ButtonGroup
          variant="contained"
          aria-slabel="outlined primary button group"
          fullWidth
        >
          <Button onClick={confirmSubmit} disabled={isLoading || !data}>
            Confirm
          </Button>
          <Button onClick={cancelSubmit} disabled={isLoading}>
            Cancel
          </Button>
        </ButtonGroup>
      </>
    );
  }

  return (
    <Modal
      open={open}
      aria-labelledby="Transaction Modal"
      aria-describedby="Helps in Transactions of Money"
    >
      <Box sx={style}>
        <h3>Transfer Money</h3>
        {error && <Alert severity="error">{error}</Alert>}
        {content}
      </Box>
    </Modal>
  );
}
