import React, { useEffect } from "react";
import { useGetStatement } from "../data/serverHooks";
import {
  Alert,
  Autocomplete,
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import StatementProcessor from "../component/StatementProcessor";

export default function StatementPage() {
  const [error, isLoading, response, page, setPage] = useGetStatement();
  return (
    <main>
      <h1>Statement</h1>
      {error && <Alert severity="error">{error}</Alert>}
      <StatementProcessor
        data={response}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
      />
    </main>
  );
}
