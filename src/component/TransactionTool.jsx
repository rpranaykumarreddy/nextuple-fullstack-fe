import {Alert, Box, Button, ButtonGroup, FormControl, FormHelperText, Modal, TextField} from "@mui/material";
import React, {useState} from "react";
import {useTransactions} from "../data/serverHooks";
import {useSelector} from "react-redux";
import {getWallet} from "../data/store";

export default function TransactionTool({open, onClose}) {
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
                    onChange={(e) => setData((prev) => ({...prev, to: e.target.value}))}
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
                    data-testid="amount-input"
                    onChange={(e) =>
                        setData((prev) => ({...prev, amount: e.target.value}))
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
    let contentConfirm = (
        <>
            {wallet.totpEnabled &&
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
            }
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

    return (
        <Modal
            open={open}
            aria-labelledby="Transaction Modal"
            aria-describedby="Helps in Transactions of Money"
        >
            <Box sx={style}>
                <h3>Transfer Money</h3>
                {error && <Alert severity="error">{error}</Alert>}
                {initDone && contentConfirm}
                {!initDone && contentInit}
            </Box>
        </Modal>
    );
}
