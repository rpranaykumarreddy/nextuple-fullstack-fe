import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {setToken, showMessage} from "../store";

export const loginAuthData={
    intialState: {
        username: "",
        password: "",
    },
    link: `http://localhost:8080/auth/login`,
    method: "POST",
}

export const useLogin = () => {
    const dispatch = useDispatch();
    const [data,setData] = useState(loginAuthData.intialState);
    const [error,setError] = useState(null);
    const [isLoading,setLoading] = useState(false);
    const token = useSelector((state) => state.token);
    const login = async () => {
        if(token) { setError("Already logged in"); return; }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(loginAuthData.link, {
                method: loginAuthData.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message);
            }
            setData(loginAuthData.intialState);
            setError(null);
            setLoading(false);
            dispatch(setToken(json));
            dispatch(showMessage({message: "Logged in", severity: "success"}));
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }
    return [data,setData,error,isLoading,login];
}