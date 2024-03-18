import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getToken, getUser, showMessage } from "../store";
import { GLOBALS } from "../../GLOBALS";

export const getStatementAuthData = {
  link:
    GLOBALS.serverHost + GLOBALS.link.wallet.id + GLOBALS.link.wallet.statement,
  method: "GET",
};

export const useGetStatement = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState(null);
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  useEffect(() => {
    const getStatement = async () => {
      if (!user || !user.sub) {
        setError("Not logged in");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          getStatementAuthData.link + `?page=${page - 1}`,
          {
            method: getStatementAuthData.method,
            headers: {
              Authorization: `${token.tokenType} ${token.accessToken}`,
            },
          }
        );
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json.message);
        }
        console.log(json);
        setError(null);
        setLoading(false);
        setResponse(json);
        dispatch(
          showMessage({
            message: `Page ${page} of statement`,
            severity: "success",
          })
        );
      } catch (error) {
        setError(error.message);
        setLoading(false);
        setResponse(null);
      }
    };
    getStatement();
  }, [page]);
  return [error, isLoading, response, page, setPage];
};
