import { useDispatch, useSelector } from "react-redux";
import {
  clearStatement,
  clearToken,
  clearUser,
  clearWallet,
  getToken,
  showMessage,
  setToken,
} from "../store";
import { GLOBALS } from "../../GLOBALS";

export const regenerateAuthData = {
  link: `${GLOBALS.serverHost}/auth/regenerate`,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
export const useLogout = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);

  const regenerate = async (
    msg = "Session token regenrated",
    severity = "success"
  ) => {
    try {
      const response = await fetch(regenerateAuthData.link, {
        method: regenerateAuthData.method,
        headers: {
          Authorization: `${token.tokenType} ${token.accessToken}`,
        },
      });
      if (!response.ok) throw new Error(json.message);
      const json = await response.json();
      dispatch(setToken(json));
      dispatch(showMessage({ message: msg, severity: severity }));
    } catch (error) {
      dispatch(clearToken());
      dispatch(clearUser());
      dispatch(clearStatement());
      dispatch(clearWallet());
      dispatch(
        showMessage({
          message: `Unable to regenerae token ${error.message}`,
          severity: "error",
        })
      );
    }
  };
  const logout = (msg = "Logged out", severity = "success") => {
    if (token) {
      dispatch(clearToken());
      dispatch(clearUser());
      dispatch(clearStatement());
      dispatch(clearWallet());
      dispatch(showMessage({ message: msg, severity: severity }));
    } else {
      dispatch(
        showMessage({
          message: "No token, Refresh the page",
          severity: "error",
        })
      );
    }
  };
  return [regenerate, logout];
};
