import {Alert, Box, Button, ButtonGroup, FormControl,Stack, Modal, TextField} from "@mui/material";
import React, { useState } from "react";
import { useGetInitTOTP } from "../data/serverHooks";
import { useSelector } from "react-redux";
import { getWallet } from "../data/store";
export default function TOTPEnableTool() {
  const [error, isLoading, getInitTOTP, QRCode, confirmTOTP] = useGetInitTOTP();
  const [open, setClose] = useState(false);
  const [data, setData] = React.useState(null);
  const wallet = useSelector(getWallet);
  if (!wallet || wallet?.balance === undefined) {
    return null;
  }
  const submit = async (e) => {
    e.preventDefault();
    await confirmTOTP(data);
    setClose(false);
  };
  const intiate = async ()=>{
    setClose(true);
    await getInitTOTP();
  }
  const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
  };
  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <div>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          fullWidth
        >
          <Button onClick={intiate} disabled={isLoading}>
            Enable TOTP
          </Button>
        </ButtonGroup>
      </div>
      <Modal
        open={QRCode && open}
        aria-labelledby="Recharge Modal"
        aria-describedby="Helps in recharge of Wallet"
      >
        <Box sx={style}>
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={QRCode?.message} alt="QRCode" width="150px" />
            </div>
            <FormControl fullWidth margin="normal">
              <TextField
                label="TOTP"
                type="number"
                variant="outlined"
                value={data}
                disabled={isLoading}
                required
                data-testid="totp-input"
                onChange={(e) => setData(e.target.value)}
              />
            </FormControl>
            <Stack spacing={2} direction="row">
                <Button variant="contained" fullWidth onClick={submit} disabled={isLoading || !data}>
                    Confirm
                </Button>
                <Button variant="contained" fullWidth onClick={()=>{setClose(false);}} >
                    Cancel
                </Button>
            </Stack>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
