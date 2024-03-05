import React, {useEffect} from "react";
import {useGetStatement} from "../data/serverHooks";
import {Alert, Avatar, Button} from "@mui/material";
import StatementProcessor from "../component/StatementProcessor";
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from "@mui/material/IconButton";

export default function StatementPage() {
    const [error, isLoading, getStatement, response] = useGetStatement();
    useEffect(() => {
        getStatement();
    }, []);
    return (
        <main>
            <h1>Statement
                <IconButton color="primary" data-testid="refresh" aria-label="refresh" onClick={getStatement}
                            disabled={isLoading}>
                    <RefreshIcon/>
                </IconButton></h1>
            {error && <Alert severity="error">{error}</Alert>}
            <br/><br/>
            <StatementProcessor data={response} isLoading={isLoading}/>
        </main>
    );
}