import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import amountAsRupee, { sortAmount } from "../Utils/amountAsRupee";
import dateTimeAsString from "../Utils/dateTimeAsString";
import { Card, Pagination, Stack, Skeleton } from "@mui/material";
import { sortDate } from "../Utils/dateAsString";

export default function CashbackProcessor({ data, isLoading, page, setPage }) {
  const [totalData, setTotalData] = useState([]);
  useEffect(() => {
    if (data === undefined || data == null) return;
    const totalData = data.recharges;
    totalData.sort((a, b) => new Date(b.created) - new Date(a.created));
    setTotalData(totalData);
  }, [data]);

  if (data === undefined || data == null) return null;

  const columns = [
    { field: "cashback", headerName: "Cashback", flex: 1, sortable: false },
    { field: "amount", headerName: "Recharge", flex: 1, sortable: false },
    { field: "createdAt", headerName: "DateTime", flex: 1, sortable: false },
  ];

  const rows = totalData.map((transaction) => {
    return {
      id: transaction.id,
      cashback: amountAsRupee(transaction.cashback, 0),
      amount: amountAsRupee(transaction.amount),
      createdAt: dateTimeAsString(transaction.created),
    };
  });

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      {totalData.length === 0 ? (
        <p>No Cashbacks</p>
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
          <Stack
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <div style={{ width: "100%" }}>
              {isLoading ? (
                <>
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height="50vh"
                    data-testid="loading"
                    sx={{ bgcolor: "grey.300" }}
                  />
                </>
              ) : (
                <DataGrid
                  sx={{
                    margin: 1,
                    borderRadius: 1,
                  }}
                  rows={rows}
                  columns={columns}
                  hideFooter={true}
                />
              )}
            </div>
            <Pagination
              count={data.totalPages}
              page={page}
              onChange={handlePageChange}
            />
          </Stack>
        </Card>
      )}
    </>
  );
}
