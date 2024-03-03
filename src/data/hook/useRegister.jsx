import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {getToken, showMessage} from "../store";

export  const checkUsernameAuthData={
    link: `http://localhost:8080/auth/check-username`,
    method: "GET",
}
export  const registerAuthData={
        intialState: {
            username: "",
            password: "",
            email: "",
        },
        link: `http://localhost:8080/auth/register`,
        method: "POST",
}
export const useRegister = () => {
    const dispatch = useDispatch();
    const [data,setData] = useState(registerAuthData.intialState);
    const [error,setError] = useState(null);
    const [isLoading,setLoading] = useState(false);
    const [isUsernameAvailable,setIsUsernameAvailable] = useState(null);
    const token = useSelector(getToken);

    const register = async () => {
        if(token) { setError("Already logged in. Clear cache"); return; }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(registerAuthData.link, {
                method: registerAuthData.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message);
            }
            setData(registerAuthData.intialState);
            setError(null);
            setLoading(false);
            setIsUsernameAvailable(null);
            dispatch(showMessage({message: json.message, severity: "success"}));
            return true;
        } catch (error) {
            console.error("Error in register",error.message);
            setError(error.message);
            setLoading(false);
            return false;
        }
    }
    const checkUsername = async () => {
        setError(null);
        try {
            if(data.username.trim() === "") {
                setError("Username is empty");
                return ;
            }
            const response = await fetch(`${checkUsernameAuthData.link}/${data.username}`, {
                method: checkUsernameAuthData.method,
            });
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message);
            }
            setIsUsernameAvailable(json);
        } catch (error) {
            setError(error.message);
        }
    }

    return [data,setData,error,isLoading,register,isUsernameAvailable,checkUsername];
}