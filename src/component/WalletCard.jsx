import {Avatar, Button, Card, CardContent, CardHeader, Divider, Stack} from "@mui/material";
import React from "react";
import WalletIcon from '@mui/icons-material/Wallet';
import dateTimeAsString from "../Utils/dateTimeAsString";
import TOTPEnableTool from "./TOTPEnableTool";
import WalletOpsTools from "./WalletOpsTools";
import AddCardIcon from "@mui/icons-material/AddCard";
import SendIcon from "@mui/icons-material/Send";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {useNavigate} from "react-router-dom";
import amountAsRupee from "../Utils/amountAsRupee";

export default function WalletCard({data}) {

    const navigate = useNavigate();

    const openLink = (value) => {
        navigate(value);
    };
    if (data) {
        return (
            <>
                <Card key={data.id} sx={{
                    minWidth: 275,
                    width: "fit-content",
                    flexGrow: 1,
                    flexBasis: 0,
                    margin: "10px 10px 20px 10px",
                    padding: '5px',
                    textAlign: "left"
                }}>
                    <Stack flexWrap="wrap"
                           justifyContent="center"
                           alignItems="center"
                           direction={{xs: 'column', sm: 'row'}}
                           spacing={{xs: 1, sm: 2, md: 4}}
                           divider={<><Divider flexItem/></>}>
                        <div><CardHeader
                            avatar={
                                <Avatar sx={{bgcolor: "#1976d2 "}} aria-label="Wallet">
                                    <WalletIcon/>
                                </Avatar>
                            }
                            title={"Balance: " + amountAsRupee(data.balance)}
                            subheader={"updated: " + dateTimeAsString(data.updated)}
                        />
                            <CardContent>
                                {data.totpEnabled ?
                                    <p>TOTP Enabled</p> :
                                    <TOTPEnableTool/>
                                }
                            </CardContent>
                        </div>
                        <div>
                            <CardContent>
                                <WalletOpsTools/>
                            </CardContent>
                        </div>
                        <div>
                            <CardContent>
                                <Stack spacing={2} direction="row">
                                    <Button fullWidth onClick={() => {
                                        openLink("/statement")
                                    }} sx={{display: "block"}}>
                                        <ReceiptLongIcon/>
                                        <br/>
                                        <h4>Statement</h4>
                                    </Button>
                                    <Button fullWidth onClick={() => {
                                        openLink("/cashback")
                                    }} sx={{display: "block"}}>
                                        <AccountBalanceWalletIcon/>
                                        <br/>
                                        <h4>Cashback</h4>
                                    </Button>
                                </Stack>
                            </CardContent>
                        </div>
                    </Stack>
                </Card>
                <h3>How to use:</h3>
                <p></p>
            </>
        );
    } else {
        return null;
    }
}