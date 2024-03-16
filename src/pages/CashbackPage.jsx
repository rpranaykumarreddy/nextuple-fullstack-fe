import React, { useState } from "react";
import { useGetCashback } from "../data/serverHooks";
import { Alert } from "@mui/material";
import CashbackProcessor from "../component/CashbackProcessor";

export default function CashbackPage() {
  const [error, isLoading, response, page, setPage] = useGetCashback();
  return (
    <main>
      <h1>Cashbacks</h1>
      {error && <Alert severity="error">{error}</Alert>}
      <br />
      <CashbackProcessor
        data={response}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
      />
    </main>
  );
}
