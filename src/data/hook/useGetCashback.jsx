import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getToken, getUser, showMessage } from "../store";
import { GLOBALS } from "../../GLOBALS";

export const getCashbackAuthData = {
  link:
    GLOBALS.serverHost + GLOBALS.link.wallet.id + GLOBALS.link.wallet.cashback,
  method: "GET",
};

export const useGetCashback = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [page, setPage] = useState(1);
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  useEffect(() => {
    const getCashback = async () => {
      if (!user || !user.sub) {
        setError("Not logged in");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          getCashbackAuthData.link + `?page=${page - 1}`,
          {
            method: getCashbackAuthData.method,
            headers: {
              Authorization: `${token.tokenType} ${token.accessToken}`,
            },
          }
        );
        const json = await response.json();
        if (!response.ok) throw new Error(json.message);
        console.log(json);
        setError(null);
        setLoading(false);
        setResponse(json);
        dispatch(
          showMessage({
            message: `Page ${page} of cashbacks`,
            severity: "success",
          })
        );
      } catch (error) {
        setError(error.message);
        setLoading(false);
        setResponse(null);
      }
    };
    getCashback();
  }, [page]);

  return [error, isLoading, response, page, setPage];
};
