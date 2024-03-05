import {Button, ButtonGroup, Stack} from "@mui/material";
import React,{useState} from "react";
import RechargeTool from "./RechargeTool";
import TransactionTool from "./TransactionTool";
import AddCardIcon from '@mui/icons-material/AddCard';
import SendIcon from '@mui/icons-material/Send';
export default function WalletOpsTools() {
    const [isRechargeModelOpen, setIsRechargeModelOpen] = useState(false);
    const [isTransferModelOpen, setIsTransferModelOpen] = useState(false);
    const opsDisabled = isRechargeModelOpen || isTransferModelOpen;
    return (
         <div>
             <Stack spacing={2} direction="row">
                 <Button fullWidth onClick={()=>{setIsRechargeModelOpen(true)}} disabled={opsDisabled} sx={{display:"block"}}>
                     <AddCardIcon />
                     <br/>
                     <h4>Recharge</h4>
                 </Button>
                 <Button fullWidth onClick={() => {
                     setIsTransferModelOpen(true)
                 }} disabled={opsDisabled} sx={{display: "block"}}>
                     <SendIcon/>
                     <br/>
                     <h4>Transfer</h4>
                 </Button>
             </Stack>
             <RechargeTool open={isRechargeModelOpen} onClose={()=>{setIsRechargeModelOpen(false)}}/>
             <TransactionTool open={isTransferModelOpen} onClose={()=>{setIsTransferModelOpen(false)}}/>
         </div>
    );
}