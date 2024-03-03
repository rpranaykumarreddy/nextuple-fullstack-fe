import React from "react";
import {useGetWalletDetails} from "../data/serverHooks";
import {Alert, Button} from "@mui/material";
import WalletCard from "../component/WalletCard";
import {useSelector} from "react-redux";
import {getWallet} from "../data/store";

export default function HomePage() {
    const [error,isLoading,getWalletDetails] = useGetWalletDetails();
    const wallletData = useSelector(getWallet);
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