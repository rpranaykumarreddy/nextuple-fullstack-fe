import {Alert, Button, ButtonGroup, FormControl, TextField} from "@mui/material";
import React from "react";
import { useGetInitTOTP} from "../data/serverHooks";
import {useSelector} from "react-redux";
import {getWallet} from "../data/store";
export default function TOTPEnableTool() {
   const [error,isLoading,getInitTOTP,QRCode, confirmTOTP] = useGetInitTOTP();
   const [data,setData] = React.useState(null);
   const wallet = useSelector(getWallet);
   if(!wallet || (wallet?.balance === undefined)){
         return null;
   }
   const submit = async (e) => {
         e.preventDefault();
         await confirmTOTP(data);
   }
   let content ;
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
                       data-testid="totp-input"
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