import React, {useEffect} from "react";
import {useGetStatement} from "../data/serverHooks";
import {Alert, Button} from "@mui/material";
import StatementProcessor from "../component/StatementProcessor";

export default function StatementPage() {
    const [error,isLoading,getStatement,response] = useGetStatement();
    return (
        <main>
            <h1>Statement</h1>
            {error && <Alert severity="error">{error}</Alert>}
            <Button variant={"contained"} onClick={getStatement} disabled={isLoading}>Refresh</Button>
            <br/><br/>
            <StatementProcessor data={response} isLoading={isLoading}/>
        </main>
    );
}