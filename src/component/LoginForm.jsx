import {Alert, Button, ButtonGroup, FormControl, FormHelperText, TextField} from "@mui/material";
import React from "react";
import {useLogin} from "../data/serverHooks";

export default function LoginForm({flipLogin, ...props}) {
    const [data,setData,error,isLoading,login] = useLogin();
    return(
        <>
            <h2>Login to Banking</h2>
            <br/>
            <div>
                <form onSubmit={(e) => e.preventDefault()}>
                    {error && <Alert severity="error">{error}</Alert>}
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={data.username}
                            disabled={isLoading}
                            required
                            onChange={(e) => setData({...data,username:e.target.value})}
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={data.password}
                            disabled={isLoading}
                            required
                            onChange={(e) => setData({...data,password:e.target.value})}
                        />
                    </FormControl>

                    <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth>
                        <Button onClick={login} disabled={isLoading}>
                            Log In User
                        </Button>
                    </ButtonGroup>
                </form>
                <br/>
                <p>click here to <Button variant="text" onClick={flipLogin}>Register</Button></p>
            </div>
        </>
    );
}
