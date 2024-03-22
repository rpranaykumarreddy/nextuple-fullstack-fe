import {
  Alert,
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import React from "react";
import { useRegister } from "../data/serverHooks";

export default function RegisterationForm({ flipLogin }) {
  const [
    data,
    setData,
    error,
    isLoading,
    register,
    isUsernameAvailable,
    checkUsername,
  ] = useRegister();
  const submit = async () => {
    const response = await register();
    if (response) {
      flipLogin();
    }
  };
  const handleUsername = (e) => {
    const value = e.target.value.toLowerCase();
    setData({ ...data, username: value });
  };
  const handleEmail = (e) => {
    const value = e.target.value.toLowerCase();
    setData({ ...data, email: value });
  };
  return (
    <>
      <h2>Registration for Internet Banking</h2>
      <br />
      <div>
        {error && <Alert severity="error">{error}</Alert>}
        <FormControl fullWidth margin="normal">
          <TextField
            error={
              isUsernameAvailable === false ||
              (error && error.includes("Username"))
            }
            label="Username"
            type="text"
            variant="outlined"
            value={data.username}
            disabled={isLoading}
            required
            onBlur={checkUsername}
            data-testid="username-input"
            helperText={
              isUsernameAvailable === false && "Username is already taken"
            }
            onChange={handleUsername}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            error={error && error.includes("Email")}
            label="Email"
            type="email"
            variant="outlined"
            value={data.email}
            disabled={isLoading}
            required
            data-testid="email-input"
            onChange={handleEmail}
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
            onClick={submit}
            disabled={
              isLoading ||
              !data ||
              data.username.trim() == "" ||
              data.email.trim() == "" ||
              data.password == ""
            }
          >
            Create Account
          </Button>
        </ButtonGroup>
        <p>
          click here to{" "}
          <Button variant="text" onClick={flipLogin}>
            Login
          </Button>
        </p>
      </div>
    </>
  );
}
