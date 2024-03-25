import {
    Alert,
    Box,
    Button,
    ButtonGroup,
    Stack,
    Modal,
} from "@mui/material";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {getWallet} from "../data/store";
import {useGetDisableTOTP} from "../data/hook/useGetDisableTOTP";

export default function TOTPDisableTool() {
    const [error, isLoading, getDisableTOTP] = useGetDisableTOTP();
    const [open, setClose] = useState(false);
    const wallet = useSelector(getWallet);
    if (!wallet || wallet?.balance === undefined) {
        return null;
    }
    const submit = async (e) => {
        e.preventDefault();
        const response = await getDisableTOTP();
        if (response)
            setClose(false);
    };
    const intiate = async () => {
        setClose(true);
    };
    const handleClose = (e) => {
        e.preventDefault();
        setClose(false);
    };
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };
    return (
        <div>
            {error && (
                <>
                    <Alert severity="error">{error}</Alert>
                    <br/>
                </>
            )}
            <div>
                <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                    fullWidth
                >
                    <Button onClick={intiate} disabled={isLoading}>
                        Disable TOTP
                    </Button>
                </ButtonGroup>
            </div>
            <Modal
                open={open}
                aria-labelledby="Disable TOTP Modal"
                aria-describedby="Helps in disabling TOTP of Wallet"
            >
                <Box sx={style}>
                    <div>
                        <h3>Are you sure you want to disable TOTP?</h3>
                        <br/>
                        <p>Disabling TOTP will result in less secure transactions</p>
                        <br/>
                        <Stack spacing={2} direction="row">
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={submit}
                                data-testid="disable-totp-but"
                                disabled={isLoading}
                            >
                                Disable TOTP
                            </Button>
                            <Button variant="contained"
                                    data-testid="disable-totp-cancel-but" fullWidth onClick={handleClose}>
                                Cancel
                            </Button>
                        </Stack>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
