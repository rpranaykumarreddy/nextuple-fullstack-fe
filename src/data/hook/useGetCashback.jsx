import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getToken, getUser, showMessage } from "../store";
import { GLOBALS } from "../../GLOBALS";

export const getCashbackAuthData = {
  link: `${GLOBALS.serverHost}/wallet/cashback`,
  method: "GET",
};

export const useGetCashback = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const getCashback = async (
    month = new Date().getMonth() + 1,
    year = new Date().getFullYear()
  ) => {
    if (!user || !user.sub) {
      setError("Not logged in");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      setResponse(null);
      const response = await fetch(
        getCashbackAuthData.link + `?month=${month}&year=${year}`,
        {
          method: getCashbackAuthData.method,
          headers: {
            Authorization: `${token.tokenType} ${token.accessToken}`,
          },
        }
      );
      const json = await response.json();
      if (!response.ok) throw new Error(json.message);
      setError(null);
      setLoading(false);
      setResponse(json);
      dispatch(
        showMessage({
          message: `Cashbacks of ${month}/${year} is fetched`,
          severity: "success",
        })
      );
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return [error, isLoading, getCashback, response];
};
