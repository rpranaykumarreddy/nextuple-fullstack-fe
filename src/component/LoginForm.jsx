import {Alert, Button, ButtonGroup, FormControl, TextField} from "@mui/material";
import React from "react";
import {useLogin} from "../data/serverHooks";

export default function LoginForm({flipLogin}) {
    const [data,setData,error,isLoading,login] = useLogin();
    return(
        <>
            <h2>Login to Internet Banking</h2>
            <br/>
            <div>
                    {error && <Alert severity="error">{error}</Alert>}
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Username or Email"
                            type="email"
                            variant="outlined"
                            value={data.username}
                            disabled={isLoading}
                            required
                            data-testid="email-input"
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
                            data-testid="password-input"
                            onChange={(e) => setData({...data,password:e.target.value})}
                        />
                    </FormControl>

                    <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth>
                        <Button onClick={login} disabled={isLoading}>
                            Login
                        </Button>
                    </ButtonGroup>
                <br/>
                <p>click here to <Button variant="text" onClick={flipLogin}>Register</Button></p>
            </div>
        </>
    );
}
