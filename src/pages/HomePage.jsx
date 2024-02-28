import React from "react";
import {useGetStatement, useGetWalletDetails} from "../data/serverHooks";
import {Alert, Button} from "@mui/material";
import StatementProcessor from "../component/StatementProcessor";
import WalletCard from "../component/WalletCard";
import {useSelector} from "react-redux";

export default function HomePage() {
    const [error,isLoading,getWalletDetails] = useGetWalletDetails();
    const wallletData = useSelector(state => state.wallet);
    return (
        <main>
            <h1>Wallet</h1>
            {error && <Alert severity="error">{error}</Alert>}
            <Button variant={"contained"} onClick={getWalletDetails} disabled={isLoading}>Refresh</Button>
            <br/><br/>
            <WalletCard data={wallletData}/>
        </main>
    );
}