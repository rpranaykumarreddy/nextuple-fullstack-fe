import {Alert, Avatar, Button, ButtonGroup, Card, CardContent, CardHeader, FormControl, TextField} from "@mui/material";
import React from "react";
import dateAsString from "../Utils/dateAsString";
import WalletIcon from '@mui/icons-material/Wallet';
import dateTimeAsString from "../Utils/dateTimeAsString";
import {useConfirmTOTP, useGetInitTOTP, useRechargeWallet} from "../data/serverHooks";
import {useSelector} from "react-redux";
import RechargeTool from "./RechargeTool";
import TransactionTool from "./TransactionTool";
export default function WalletOpsTools() {
    const [isRechargeModelOpen, setIsRechargeModelOpen] = React.useState(false);
    const [isTransferModelOpen, setIsTransferModelOpen] = React.useState(false);
    const opsDisabled = isRechargeModelOpen || isTransferModelOpen;
    return (
         <div>
             <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth>
                 <Button onClick={()=>{setIsRechargeModelOpen(true)}} disabled={opsDisabled}>
                     Recharge
                 </Button>
                 <Button onClick={()=>{setIsTransferModelOpen(true)}} disabled={opsDisabled}>
                     Transfer
                 </Button>
             </ButtonGroup>
             <RechargeTool open={isRechargeModelOpen} onClose={()=>{setIsRechargeModelOpen(false)}}/>
             <TransactionTool open={isTransferModelOpen} onClose={()=>{setIsTransferModelOpen(false)}}/>
         </div>
    );
}