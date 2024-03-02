import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {getToken, getUser, setStatement, showMessage} from "../store";

export  const getStatementAuthData={
    link: `http://localhost:8080/wallet/statement`,
    method: "GET",
}

export const useGetStatement = () => {
    const dispatch = useDispatch();
    const [error,setError] = useState(null);
    const [isLoading,setLoading] = useState(false);
    const [response,setResponse] = useState(useSelector((state) => state.statement));
    const token = useSelector(getToken);
    const user = useSelector(getUser);
    const getStatement = async () => {
        if(!user || !user.sub) {
            setError("Not logged in");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(getStatementAuthData.link, {
                method: getStatementAuthData.method,
                headers: {
                    'Authorization': `${token.tokenType} ${token.accessToken}`,
                },
            });
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message);
            }
            setError(null);
            setLoading(false);
            setResponse(json);
            dispatch(setStatement(json));
            dispatch(showMessage({message: "Statement fetched", severity: "success"}));
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }
    return [error,isLoading,getStatement,response];
}