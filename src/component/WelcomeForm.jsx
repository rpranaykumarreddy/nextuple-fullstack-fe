import {Button} from "@mui/material";
import React from "react";
import {useLogout} from "../data/serverHooks";

export default function WelcomeForm({user, ...props}) {

    const logout = useLogout();
    return(
        <>
            <h2>Account</h2>
            <br/>
            <div>
                <p>Welcome {user.sub}!</p>
                <br/>
                <Button variant="contained" onClick={logout}>Logout</Button>
            </div>
        </>
    );
}
