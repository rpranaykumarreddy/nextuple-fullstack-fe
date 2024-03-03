import {Alert, Box, Button, ButtonGroup, FormControl, Modal, TextField} from "@mui/material";
import React from "react";
import {useRechargeWallet} from "../data/serverHooks";

export default function RechargeTool({open, onClose}) {
    const [error,isLoading,rechargeWallet] = useRechargeWallet();
    const [data,setData] = React.useState({username:""});
    const submit = async (e) => {
         e.preventDefault();
         const response = await rechargeWallet(data);
         if(response){
             onClose();
         }
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
                    value={data}
                    disabled={isLoading}
                    required
                    data-testid="amount-input"
                    onChange={(e) => setData(e.target.value)}
                />
            </FormControl>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth>
                <Button onClick={submit} disabled={isLoading || !data}>
                    Confirm
                </Button>
            </ButtonGroup>
        </Box>
    </Modal>

    );
}