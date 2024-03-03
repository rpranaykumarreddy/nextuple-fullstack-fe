import {Alert, Button, ButtonGroup, FormControl, FormHelperText, TextField} from "@mui/material";
import React from "react";
import {useRegister} from "../data/serverHooks";

export default function RegisterationForm({flipLogin}) {
    const [data, setData, error, isLoading, register, isUsernameAvailable, checkUsername] = useRegister()
    const submit = async () => {
        const response = await register();
        if (response) {
            flipLogin();
        }
    }
    return (
        <>
            <h2>Registration for Banking</h2>
            <br/>
            <div>
                {error && <Alert severity="error">{error}</Alert>}
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="username"
                        type="text"
                        variant="outlined"
                        value={data.username}
                        disabled={isLoading}
                        required
                        onBlur={checkUsername}
                        data-testid="username-input"
                        onChange={(e) => setData({...data, username: e.target.value})}
                    />
                    {isUsernameAvailable === false && <FormHelperText>
                        Username is already taken
                    </FormHelperText>}
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={data.email}
                        disabled={isLoading}
                        required
                        data-testid="email-input"
                        onChange={(e) => setData({...data, email: e.target.value})}
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
                        onChange={(e) => setData({...data, password: e.target.value})}
                    />
                </FormControl>

                <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth>
                    <Button onClick={submit} disabled={isLoading}>
                        Create Account
                    </Button>
                </ButtonGroup>
                <p>click here to <Button variant="text" onClick={flipLogin}>Login</Button></p>
            </div>
        </>
    );
}
