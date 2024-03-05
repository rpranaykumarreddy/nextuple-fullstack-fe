import React, {useEffect} from "react";
import {useGetWalletDetails} from "../data/serverHooks";
import {Alert, Button} from "@mui/material";
import WalletCard from "../component/WalletCard";
import {useSelector} from "react-redux";
import {getWallet} from "../data/store";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function HomePage() {
    const [error, isLoading, getWalletDetails] = useGetWalletDetails();
    const wallletData = useSelector(getWallet);
    useEffect(() => {
        getWalletDetails();
    }, []);
    return (
        <main>
            <h1>Wallet
                <IconButton color="primary" data-testid="refresh" aria-label="refresh" onClick={getWalletDetails}
                            disabled={isLoading}>
                    <RefreshIcon/>
                </IconButton></h1>
            {error && <Alert severity="error">{error}</Alert>}
            <br/><br/>
            <WalletCard data={wallletData}/>
        </main>
    );
}