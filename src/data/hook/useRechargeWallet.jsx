import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getToken, getUser, setWallet, showMessage } from "../store";
import { GLOBALS } from "../../GLOBALS";

export const rechargeWalletAuthData = {
  link: `${GLOBALS.serverHost}/recharge`,
  method: "POST",
};

export const useRechargeWallet = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const rechargeWallet = async (amount) => {
    if (!user || !user.sub) {
      setError("Not logged in");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${rechargeWalletAuthData.link}?amount=${amount}`,
        {
          method: rechargeWalletAuthData.method,
          headers: {
            Authorization: `${token.tokenType} ${token.accessToken}`,
          },
        }
      );
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      setError(null);
      setLoading(false);
      dispatch(setWallet(json));
      dispatch(
        showMessage({
          message: "Wallet recharged with a cashback",
          severity: "success",
        })
      );
      return true;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      return false;
    }
  };

  const clearRecharge = () => {
    setError(null);
    setLoading(false);
  };
  return [error, isLoading, rechargeWallet, clearRecharge];
};
