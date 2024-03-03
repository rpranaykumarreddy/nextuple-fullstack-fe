import { Button, ButtonGroup} from "@mui/material";
import React,{useState} from "react";
import RechargeTool from "./RechargeTool";
import TransactionTool from "./TransactionTool";
export default function WalletOpsTools() {
    const [isRechargeModelOpen, setIsRechargeModelOpen] = useState(false);
    const [isTransferModelOpen, setIsTransferModelOpen] = useState(false);
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