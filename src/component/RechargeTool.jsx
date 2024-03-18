import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useRechargeWallet } from "../data/serverHooks";

export default function RechargeTool({ open, onClose }) {
  const [error, isLoading, rechargeWallet, clearRecharge] = useRechargeWallet();
  const [amount, setAmount] = useState(0);
  const submit = async (e) => {
    e.preventDefault();
    const response = await rechargeWallet(amount);
    if (response) {
      setAmount(0);
      onClose();
    }
  };
  const handleAmount = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const fixedValue = Math.floor(Number(value) * 100) / 100;
    setAmount(fixedValue);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setAmount(0);
    clearRecharge();
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
  return (
    <Modal
      open={open}
      aria-labelledby="Recharge Modal"
      aria-describedby="Helps in recharge of Wallet"
    >
      <Box sx={style}>
        <h3>Recharge Wallet</h3>
        {error && <Alert severity="error">{error}</Alert>}
        <FormControl fullWidth margin="normal">
          <TextField
            label="amount"
            type="number"
            variant="outlined"
            value={Number(amount).toString()}
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
            onClick={submit}
            disabled={isLoading || !(amount > 0)}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
