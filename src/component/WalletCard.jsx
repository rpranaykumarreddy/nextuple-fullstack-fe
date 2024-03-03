import {Avatar, Card, CardContent, CardHeader} from "@mui/material";
import React from "react";
import WalletIcon from '@mui/icons-material/Wallet';
import dateTimeAsString from "../Utils/dateTimeAsString";
import TOTPEnableTool from "./TOTPEnableTool";
import WalletOpsTools from "./WalletOpsTools";
export default function WalletCard({data}) {

    if (data) {
        return (
            <>
                <Card key={data.id} sx={{
                    minWidth: 275,
                    width: "fit-content",
                    flexGrow: 1,
                    flexBasis: 0,
                    margin: "10px 20px",
                    padding: '5px',
                    textAlign: "left"
                }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{bgcolor: "#1976d2 "}} aria-label="Wallet">
                                <WalletIcon/>
                            </Avatar>
                        }
                        title={data.balance}
                        subheader={"updated: " + dateTimeAsString(data.updated)}
                    />
                    <CardContent>
                        {data.totpEnabled ?
                            <p>TOTP Enabled</p> :
                            <TOTPEnableTool/>
                        }
                        <br/>
                        <WalletOpsTools/>
                    </CardContent>
                </Card>
            </>
        );
    } else {
        return null;
    }
}