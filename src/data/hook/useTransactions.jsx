import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getToken, getUser, setWallet, showMessage } from "../store";
import { GLOBALS } from "../../GLOBALS";

export const initTransactionAuthData = {
  intialState: {
    to: "",
    amount: 0,
  },
  link: `${GLOBALS.serverHost}/transaction/init`,
  method: "POST",
};
export const confirmTransactionAuthData = {
  link: `${GLOBALS.serverHost}/transaction/confirm`,
  method: "POST",
};
export const cancelTransactionAuthData = {
  link: `${GLOBALS.serverHost}/transaction/cancel`,
  method: "POST",
};
export const checkWalletAuthData = {
  link: `${GLOBALS.serverHost}/transaction/check-wallet`,
  method: "GET",
};

export const useTransactions = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(initTransactionAuthData.intialState);
  const [isWalletExists, setIsWalletExists] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [expire, setExpire] = useState(null);
  const token = useSelector(getToken);
  const user = useSelector(getUser);

  const initTransaction = async () => {
    if (!user || !user.sub) {
      setError("Not logged in");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(initTransactionAuthData.link, {
        method: initTransactionAuthData.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token.tokenType} ${token.accessToken}`,
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      console.log(json);
      setError(null);
      setTransactionId(json.transactionId);
      setExpire(json.expire);
      setLoading(false);
      dispatch(
        showMessage({ message: "Transaction initiated", severity: "info" })
      );
      return true;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      return false;
    }
  };

  const confirmTransaction = async (code) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${confirmTransactionAuthData.link}/${transactionId}?code=${code}`,
        {
          method: confirmTransactionAuthData.method,
          headers: {
            Authorization: `${token.tokenType} ${token.accessToken}`,
          },
        }
      );
      const json = await response.json();
      let returnMsg = "SUCCESS";
      if (!response.ok) {
        console.log(json);
        if (json.message !== "Transaction timeout") {
          console.log(json.message);
          throw new Error(json.message);
        } else {
          returnMsg = "TIMEOUT";
        }
      }
      if (returnMsg === "TIMEOUT") {
        dispatch(
          showMessage({ message: "Transaction timeout", severity: "warning" })
        );
      } else {
        setData(initTransactionAuthData.intialState);
        dispatch(setWallet(json));
        dispatch(
          showMessage({
            message: "Transaction Successful",
            severity: "success",
          })
        );
      }
      setError(null);
      setLoading(false);
      setIsWalletExists(false);
      setTransactionId(null);
      return returnMsg;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      return "ERROR";
    }
  };

  const cancelTransaction = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${cancelTransactionAuthData.link}/${transactionId}`,
        {
          method: cancelTransactionAuthData.method,
          headers: {
            Authorization: `${token.tokenType} ${token.accessToken}`,
          },
        }
      );
      const json = await response.json();
      if (!response.ok) {
        console.log(json);
        throw new Error(json.message);
      }
      setError(null);
      setLoading(false);
      setData(initTransactionAuthData.intialState);
      setIsWalletExists(false);
      setTransactionId(null);
      dispatch(
        showMessage({ message: "Transaction cancelled", severity: "info" })
      );
      return true;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      return false;
    }
  };

  const checkWallet = async () => {
    setError(null);
    try {
      if (data.to.trim() === "") {
        setError("Receiver's username cannot be empty");
        return;
      }
      const response = await fetch(`${checkWalletAuthData.link}/${data.to}`, {
        method: checkWalletAuthData.method,
        headers: {
          Authorization: `${token.tokenType} ${token.accessToken}`,
        },
      });
      const json = await response.json();
      if (!response.ok) {
        console.log(json);
        throw new Error(json.message);
      }
      setIsWalletExists(json);
    } catch (error) {
      setError(error.message);
    }
  };
  const clearTrans = () => {
    setError(null);
    setLoading(false);
    setData(initTransactionAuthData.intialState);
    setIsWalletExists(null);
    setTransactionId(null);
    setExpire(null);
  };

  return [
    error,
    isLoading,
    initTransaction,
    confirmTransaction,
    cancelTransaction,
    checkWallet,
    expire,
    data,
    setData,
    isWalletExists,
    clearTrans,
  ];
};
