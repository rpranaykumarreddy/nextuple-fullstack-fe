import {
  Alert,
  Button,
  ButtonGroup,
  FormControl,
  TextField,
} from "@mui/material";
import React from "react";
import { useLogin } from "../data/serverHooks";

export default function LoginForm({ flipLogin }) {
  const [data, setData, error, isLoading, login] = useLogin();
  const handleUsernameOrEmail = (e) => {
    const value = e.target.value.toLowerCase();
    setData({ ...data, username: value });
  };
  return (
    <>
      <h2>Login to Internet Banking</h2>
      <br />
      <div>
        {error && <Alert severity="error">{error}</Alert>}
        <FormControl fullWidth margin="normal">
          <TextField
            error={error && error.includes("Username or Email")}
            label="Username or Email"
            type="email"
            variant="outlined"
            value={data.username}
            disabled={isLoading}
            required
            data-testid="email-input"
            onChange={handleUsernameOrEmail}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            error={error && error.includes("Password")}
            label="Password"
            type="password"
            variant="outlined"
            value={data.password}
            disabled={isLoading}
            required
            data-testid="password-input"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </FormControl>

        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          fullWidth
        >
          <Button
            onClick={login}
            disabled={
              isLoading ||
              !data ||
              data.username.trim() == "" ||
              data.password == ""
            }
          >
            Login
          </Button>
        </ButtonGroup>
        <br />
        <p>
          click here to{" "}
          <Button variant="text" onClick={flipLogin}>
            Register
          </Button>
        </p>
      </div>
    </>
  );
}
