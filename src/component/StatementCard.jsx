import { Avatar, Card, CardContent, CardHeader, Tooltip } from "@mui/material";
import React from "react";
import dateAsString from "../Utils/dateAsString";
import dateTimeAsString from "../Utils/dateTimeAsString";
import amountAsRupee from "../Utils/amountAsRupee";
export default function StatementCard({ data }) {
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
        <Card
          key={data.id}
          sx={{
            minWidth: 275,
            width: "fit-content",
            flexGrow: 1,
            flexBasis: 0,
            margin: "10px 20px",
            padding: "5px",
            textAlign: "left",
          }}
        >
          <CardHeader
            avatar={
              <Tooltip title="Recharge-Successful" placement="top-start">
                <Avatar sx={{ bgcolor: "green" }} aria-label="Recharge">
                  Re
                </Avatar>
              </Tooltip>
            }
            title={amountAsRupee(data.amount)}
            subheader={"cashback: " + amountAsRupee(data.cashback,0)}
          />
          <Tooltip
            title={dateTimeAsString(data.created)}
            placement="bottom-start"
          >
            <CardContent>
              <p>{dateAsString(data.created)}</p>
            </CardContent>
          </Tooltip>
        </Card>
      </>
    );
  }
  if (data.type === "CREDIT") {
    return (
      <>
        <Card
          key={data.id}
          sx={{
            minWidth: 275,
            width: "fit-content",
            flexGrow: 1,
            flexBasis: 0,
            margin: "10px 20px",
            padding: "5px",
            textAlign: "left",
          }}
        >
          <CardHeader
            avatar={
              <Tooltip title={"Credit " + tooltip} placement="top-start">
                <Avatar sx={{ bgcolor: color }} aria-label="Credit">
                  Cr
                </Avatar>
              </Tooltip>
            }
            title={amountAsRupee(data.amount)}
            subheader={"from: " + data.from}
          />
          <Tooltip
            title={dateTimeAsString(data.created)}
            placement="bottom-start"
          >
            <CardContent>
              <p>{dateAsString(data.created)}</p>
            </CardContent>
          </Tooltip>
        </Card>
      </>
    );
  }
  if (data.type === "DEBIT") {
    return (
      <>
        <Card
          key={data.id}
          sx={{
            minWidth: 275,
            width: "fit-content",
            flexGrow: 1,
            flexBasis: 0,
            margin: "10px 20px",
            padding: "5px",
            textAlign: "left",
          }}
        >
          <CardHeader
            avatar={
              <Tooltip title={"Debit " + tooltip} placement="top-start">
                <Avatar sx={{ bgcolor: color }} aria-label="Debit">
                  Dr
                </Avatar>
              </Tooltip>
            }
            title={amountAsRupee(data.amount)}
            subheader={"to: " + data.to}
          />
          <Tooltip
            title={dateTimeAsString(data.created)}
            placement="bottom-start"
          >
            <CardContent>
              <p>{dateAsString(data.created)}</p>
            </CardContent>
          </Tooltip>
        </Card>
      </>
    );
  }
}
