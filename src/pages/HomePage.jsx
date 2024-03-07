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
            <h1>Wallet</h1>
            {error && <Alert severity="error">{error}</Alert>}
            <WalletCard data={wallletData} getWalletDetails={getWalletDetails} isLoading={isLoading}/>
        </main>
    );
}