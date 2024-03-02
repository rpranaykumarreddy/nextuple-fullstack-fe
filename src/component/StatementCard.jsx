import {Avatar, Card, CardContent, CardHeader, Tooltip} from "@mui/material";
import React from "react";
import dateAsString from "../Utils/dateAsString";
import dateTimeAsString from "../Utils/dateTimeAsString";
export default function StatementCard({data}) {
    let color;
    switch (data?.status) {
        case "SUCCESSFUL":
            color = "green";
            break;
        case "CANCELLED":
            color = "red";
            break;
        case "TIMEOUT":
            color = "orange";
            break;
        default:
            color = "#1976d2";
    }
    let tooltip;
    switch (data?.status) {
        case "SUCCESSFUL":
            tooltip = "Successful";
            break;
        case "CANCELLED":
            tooltip = "Cancelled";
            break;
        case "TIMEOUT":
            tooltip = "Timeout";
            break;
        default:
            tooltip = "Initiated";
    }

    if (!data || data == null) return null;

    if (data.type === "RECHARGE") {
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
                    <Tooltip title="Recharge-Successful" placement="top-start">
                        <CardHeader
                            avatar={
                                <Avatar sx={{bgcolor: "green"}} aria-label="Recharge">
                                    Re
                                </Avatar>
                            }
                            title={data.amount}
                            subheader={"cashback: " + data.cashback}
                        />
                    </Tooltip>
                    <Tooltip title={dateTimeAsString(data.created)} placement="bottom-start">
                        <CardContent>
                            <p>{dateAsString(data.created)}</p>
                        </CardContent>
                    </Tooltip>
                </Card>
            </>
        )
    }
    if (data.type === "CREDIT") {
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
                    <Tooltip title={"Credit " + tooltip} placement="top-start">
                        <CardHeader
                            avatar={
                                <Avatar sx={{bgcolor: color}} aria-label="Credit">
                                    Cr
                                </Avatar>
                            }
                            title={data.amount}
                            subheader={"from: " + data.from}
                        />
                    </Tooltip>
                    <Tooltip title={dateTimeAsString(data.created)} placement="bottom-start">
                        <CardContent>
                            <p>{dateAsString(data.created)}</p>
                        </CardContent>
                    </Tooltip>
                </Card>
            </>
        )
    }
    if (data.type === "DEBIT") {
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
                    <Tooltip title={"Debit " + tooltip} placement="top-start">
                        <CardHeader
                            avatar={
                                <Avatar sx={{bgcolor: color}} aria-label="Debit">
                                    Dr
                                </Avatar>
                            }
                            title={data.amount}
                            subheader={"to: " + data.to}
                        />
                    </Tooltip>
                    <Tooltip title={dateTimeAsString(data.created)} placement="bottom-start">
                        <CardContent>
                            <p>{dateAsString(data.created)}</p>
                        </CardContent>
                    </Tooltip>
                </Card>
            </>
        )
    }
}