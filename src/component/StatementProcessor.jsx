import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import amountAsRupee, { sortAmount } from "../Utils/amountAsRupee";
import dateTimeAsString from "../Utils/dateTimeAsString";
import { Card } from "@mui/material";
import { sortDate } from "../Utils/dateAsString";

export default function StatementProcessor({ data, isLoading }) {
  const [totalData, setTotalData] = useState([]);
  useEffect(() => {
    if (data === undefined || data == null) return;
    const totalData = [...data.credits, ...data.debits, ...data.recharges];
    totalData.sort((a, b) => new Date(b.created) - new Date(a.created));
    setTotalData(totalData);
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (data === undefined || data == null) return null;
  console.log("statement data", data);

  const columns = [
    { field: "type", headerName: "Type", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    { field: "fromTo", headerName: "From / To", flex: 1 },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      sortComparator: (v1, v2) => sortAmount(v1, v2),
    },
    {
      field: "createdAt",
      headerName: "DateTime",
      flex: 1,
      sortComparator: (v1, v2) => sortDate(v1, v2),
    },
  ];
  const capitalizeFirstLetter = (string) => {
    if (string == "INIT") return "Initiated";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  const rows = totalData.map((transaction) => {
    if (transaction.type === "RECHARGE") {
      return {
        id: transaction.id,
        type: "Recharge",
        status: "Successful",
        fromTo: "Self",
        amount: amountAsRupee(transaction.amount),
        createdAt: dateTimeAsString(transaction.created),
      };
    } else if (transaction.type === "CREDIT") {
      return {
        id: transaction.id,
        type: "Credit",
        status: capitalizeFirstLetter(transaction.status),
        fromTo: transaction.from,
        amount: amountAsRupee(transaction.amount),
        createdAt: dateTimeAsString(transaction.created),
      };
    } else if (transaction.type === "DEBIT") {
      return {
        id: transaction.id,
        type: "Debit",
        status: capitalizeFirstLetter(transaction.status),
        fromTo: transaction.to,
        amount: amountAsRupee(transaction.amount),
        createdAt: dateTimeAsString(transaction.created),
      };
    }
  });
  return (
    <>
      {totalData.length === 0 ? (
        <p>No Transactions in this period</p>
      ) : (
        <Card
          sx={{
            width: "95vw",
            padding: 1,
            margin: "auto",
            display: "flex",
            flexDirection: "row",
            height: "fit-content",
            alignContent: "center",
            justifyContent: "space-evenly",
            alignItems: "center",
            "@media (max-width: 900px)": {
              flexWrap: "wrap",
            },
          }}
        >
          <div style={{ width: "100%" }}>
            <DataGrid
              sx={{
                margin: 1,
                borderRadius: 1,
              }}
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
        </Card>
      )}
    </>
  );
}
