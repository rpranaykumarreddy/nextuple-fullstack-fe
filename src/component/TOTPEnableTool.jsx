import {Alert, Avatar, Button, ButtonGroup, Card, CardContent, CardHeader, FormControl, TextField} from "@mui/material";
import React from "react";
import dateAsString from "../Utils/dateAsString";
import WalletIcon from '@mui/icons-material/Wallet';
import dateTimeAsString from "../Utils/dateTimeAsString";
import {useConfirmTOTP, useGetInitTOTP} from "../data/serverHooks";
import {useSelector} from "react-redux";
import RechargeTool from "./RechargeTool";
export default function TOTPEnableTool() {
   const [error,isLoading,getInitTOTP,QRCode, confirmTOTP] = useGetInitTOTP();
   const [data,setData] = React.useState(null);
   const wallet = useSelector(state => state.wallet);
   if(!wallet || (wallet?.balance === undefined)){
         return null;
   }
   const submit = (e) => {
         e.preventDefault();
         confirmTOTP(data);
   }
   let content = null;
   if(QRCode){
       content= (
           <div>
               <div style={{display:'flex', justifyContent:'center'}}>
                    <img src={QRCode?.message} alt="QRCode" width="150px"/>
               </div>
               <FormControl fullWidth margin="normal">
                   <TextField
                       label="TOTP"
                       type="number"
                       variant="outlined"
                       value={data}
                       disabled={isLoading}
                       required
                       onChange={(e) => setData(e.target.value)}
                   />
               </FormControl>
               <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth>
                   <Button onClick={submit} disabled={isLoading || !data}>
                       Confirm
                   </Button>
               </ButtonGroup>
           </div>
       )
   } else {
       content = (
               <div>
                   <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth>
                       <Button onClick={getInitTOTP} disabled={isLoading}>
                           Enable TOTP
                       </Button>
                   </ButtonGroup>
               </div>
       )
   }
    return (
         <div>
             {error && <Alert severity="error">{error}</Alert>}
              {content}
         </div>
    );
}