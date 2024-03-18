import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getToken, setToken, showMessage } from "../store";
import { GLOBALS } from "../../GLOBALS";

export const loginAuthData = {
  intialState: {
    username: "",
    password: "",
  },
  link: GLOBALS.serverHost + GLOBALS.link.auth.id + GLOBALS.link.auth.login,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(loginAuthData.intialState);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const token = useSelector(getToken);
  const login = async () => {
    if (token) {
      setError("Already logged in");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(loginAuthData.link, {
        method: loginAuthData.method,
        headers: loginAuthData.headers,
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.message);
      setData(loginAuthData.intialState);
      setError(null);
      setLoading(false);
      dispatch(setToken(json));
      dispatch(showMessage({ message: "Logged in", severity: "success" }));
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return [data, setData, error, isLoading, login];
};
