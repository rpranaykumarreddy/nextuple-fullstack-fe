import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useTransactions } from "../data/serverHooks";
import { useSelector } from "react-redux";
import { getWallet } from "../data/store";
import TransactionTimeoutProgress from "./TransactionTimeoutProgress";
import { initTransactionAuthData } from "../data/serverHooks";
export default function TransactionTool({ open, onClose }) {
  const [
    error,
    isLoading,
    initTransaction,
    confirmTransaction,
    cancelTransaction,
    checkWallet,
    expire,
    data,
    setData,
    isWalletExists,
    clearTrans,
  ] = useTransactions();
  const wallet = useSelector(getWallet);
  const [initDone, setInitDone] = useState(false);
  const [code, setCode] = useState(undefined);
  const initSubmit = async (e) => {
    const response = await initTransaction(data);
    if (response) {
      setInitDone(true);
    }
  };
  const confirmSubmit = async (e) => {
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
    const response = await cancelTransaction();
    if (response) {
      setInitDone(false);
      setCode(undefined);
      onClose();
    }
  };
  const handleAmount = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const fixedValue = Math.floor(Number(value) * 100) / 100;
    setData((prev) => ({ ...prev, amount: fixedValue }));
  };
  const handleTimeout = async () => {
    const response = await confirmTransaction(10000000);
    if (response) {
      setInitDone(false);
      setCode(undefined);
    }
  };
  const handleClose = (e) => {
    e.preventDefault();
    clearTrans();
    onClose();
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
  let contentInit = (
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
          data-testid="to-input"
          onChange={(e) => setData((prev) => ({ ...prev, to: e.target.value }))}
        />
        {isWalletExists === false && (
          <FormHelperText>Wallet does not exist</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Amount"
          type="number"
          variant="outlined"
          value={Number(data.amount).toString()}
          disabled={isLoading}
          required
          data-testid="amount-input"
          onChange={handleAmount}
        />
      </FormControl>
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          fullWidth
          onClick={initSubmit}
          disabled={isLoading || !data}
        >
          Initiate
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={handleClose}
          disabled={isLoading || !data}
        >
          Close
        </Button>
      </Stack>
    </>
  );
  let contentConfirm = (
    <>
      <br />
      <TransactionTimeoutProgress expire={expire} onTimeout={handleTimeout} />
      <p>
        To: <b>{data.to}</b>
      </p>
      <p>
        Amount: <b>{data.amount}</b>
      </p>

      {wallet.totpEnabled ? (
        <FormControl fullWidth margin="normal">
          <TextField
            label="TOTP"
            type="number"
            variant="outlined"
            value={code}
            disabled={isLoading}
            required
            data-testid="code-input"
            onChange={(e) => setCode(e.target.value)}
          />
        </FormControl>
      ) : (
        <br />
      )}
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          fullWidth
          onClick={confirmSubmit}
          disabled={isLoading || !data}
        >
          Confirm
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={cancelSubmit}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </Stack>
    </>
  );

  return (
    <Modal
      open={open}
      aria-labelledby="Transaction Modal"
      aria-describedby="Helps in Transactions of Money"
    >
      <Box sx={style}>
        <h3>Transfer Money</h3>
        {error && <Alert severity="error">{error}</Alert>}
        {!initDone && contentInit}
        {initDone && contentConfirm}
      </Box>
    </Modal>
  );
}
