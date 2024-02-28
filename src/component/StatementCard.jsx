import {Avatar, Card, CardContent, CardHeader, IconButton, Stack, Typography} from "@mui/material";
import React from "react";
import ReplayIcon from '@mui/icons-material/Replay';
import dateAsString from "../Utils/dateAsString";
import AddCardIcon from '@mui/icons-material/AddCard';
export default function StatementCard({data}) {
    /*
      "credits": [
        {
            "type": "CREDIT",
            "id": "65de15fc6e6cd619ce9d55d2",
            "from": "user2",
            "amount": 40000,
            "status": "SUCCESSFUL",
            "created": "2024-02-27T22:33:56.125"
        }
    ],
    "debits": [
        {
            "type": "DEBIT",
            "id": "65de16236e6cd619ce9d55d3",
            "to": "user2",
            "amount": 20000,
            "status": "CANCELLED",
            "created": "2024-02-27T22:34:35.384"
        }
    ],
    "recharges": [
        {
            "type": "RECHARGE",
            "id": "65de15c36e6cd619ce9d55cf",
            "amount": 30000.3,
            "cashback": 79,
            "created": "2024-02-27T22:32:59.033"
        }
    ]
     */
    if(data==undefined || data==null) return null;
    if(data.type == "RECHARGE") {
        return (
            <>
                <Card key={data.id} sx={{minWidth: 275, width:"fit-content", flexGrow: 1, flexBasis: 0, margin:"10px 20px", padding: '5px',textAlign:"left" }}>
                <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: "#1976d2 " }} aria-label="Recharge">
                                Re
                            </Avatar>
                        }
                        title={data.amount}
                        subheader={"cashback: "+data.cashback}
                    />
                    <CardContent>
                        <p>{dateAsString(data.created)}</p>
                    </CardContent>
                </Card>
            </>
        )
    }
    if(data.type == "CREDIT") {
        return (
            <>
                <Card key={data.id} sx={{ minWidth: 275, width:"fit-content",flexGrow: 1, flexBasis: 0,   margin:"10px 20px" ,padding: '5px',textAlign:"left" }}>
                <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: "green" }} aria-label="Credit">
                                Cr
                            </Avatar>
                        }
                        title={data.amount}
                        subheader={"from: "+data.from}
                    />
                    <CardContent>
                        <p>{dateAsString(data.created)}</p>
                    </CardContent>
                </Card>
            </>
        )
    }
    if(data.type == "DEBIT") {
        return (
            <>
                <Card key={data.id} sx={{ minWidth: 275, width:"fit-content",flexGrow: 1, flexBasis: 0, margin:"10px 20px",padding: '5px',textAlign:"left" }}>
                <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: "red" }} aria-label="Debit">
                                Dr
                            </Avatar>
                        }
                        title={data.amount}
                        subheader={"to: "+data.to}
                    />
                    <CardContent>
                        <p>{dateAsString(data.created)}</p>
                    </CardContent>
                </Card>
            </>
        )
    }
}