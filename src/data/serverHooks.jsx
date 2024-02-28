
import {useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {
    clearStatement,
    clearToken,
    clearTransaction,
    clearUser,
    clearWallet,
    enableTOTP,
    setStatement,
    setToken,
    setWallet
} from "./store";

const serverURL = "http://localhost:8080";
const loginAuthData={
    intialState: {
        username: "",
        password: "",
    },
    link: `${serverURL}/auth/login`,
    method: "POST",
}
const registerAuthData={
    intialState: {
        username: "",
        password: "",
        email: "",
    },
    link: `${serverURL}/auth/register`,
    method: "POST",
}
const checkUsernameAuthData={
    link: `${serverURL}/auth/check-username`,
    method: "GET",
}
const getStatementAuthData={
    link: `${serverURL}/wallet/statement`,
    method: "GET",

}
const getWalletDetailsAuthData={
    link: `${serverURL}/wallet/details`,
    method: "GET",
}
const getInitTOTPAuthData={
    link: `${serverURL}/wallet/totp`,
    method: "POST",
}
const confirmTOTPAuthData={
    link: `${serverURL}/wallet/totp/confirm`,
    method: "POST",
}
export const useLogin = () => {
    const dispatch = useDispatch();
    const [data,setData] = useState(loginAuthData.intialState);
    const [error,setError] = useState(null);
    const [isLoading,setLoading] = useState(false);
    const [response,setResponse] = useState(null);
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
            setError(null);
            setData(loginAuthData.intialState);
            dispatch(setToken(json));
            setResponse(json);
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }
    return [data,setData,error,isLoading,login];
}
export const useRegister = () => {
    const dispatch = useDispatch();
    const [data,setData] = useState(registerAuthData.intialState);
    const [error,setError] = useState(null);
    const [isLoading,setLoading] = useState(false);
    const [isUsernameAvailable,setIsUsernameAvailable] = useState(null);
    const [response,setResponse] = useState(null);
    const token = useSelector((state) => state.token);

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
            setError(null);
            console.log('response', response, json);
            setLoading(false);
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
export const useLogout = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const logout = () => {
        if(token) {
            dispatch(clearToken());
            dispatch(clearUser());
            dispatch(clearTransaction());
            dispatch(clearStatement());
            dispatch(clearWallet());
        }
    }
    return logout;
}
export const useGetStatement = () => {
    const dispatch = useDispatch();
    const [error,setError] = useState(null);
    const [isLoading,setLoading] = useState(false);
    const [response,setResponse] = useState(useSelector((state) => state.statement));
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const getStatement = async () => {
        if(!user.sub) { setError("Not logged in"); return; }
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
                console.log()
                throw new Error(json.message);
            }
            setError(null);
            setResponse(json);
            dispatch(setStatement(json));
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }
    return [error,isLoading,getStatement,response];
}
export const useGetWalletDetails = () => {
    const dispatch = useDispatch();
    const [error,setError] = useState(null);
    const [isLoading,setLoading] = useState(false);
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const getWalletDetails = async () => {
        if(!user.sub) { setError("Not logged in"); return; }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(getWalletDetailsAuthData.link, {
                method: getWalletDetailsAuthData.method,
                headers: {
                    'Authorization': `${token.tokenType} ${token.accessToken}`,
                },
            });
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message);
            }
            setError(null);
            dispatch(setWallet(json));
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }
    return [error,isLoading,getWalletDetails];
}

export const useGetInitTOTP = () => {
    const dispatch = useDispatch();
    const [error,setError] = useState(null);
    const [isLoading,setLoading] = useState(false);
    const [QRCode,setQRCode] = useState(null);
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const getInitTOTP = async () => {
        if(!user.sub) { setError("Not logged in"); return; }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(getInitTOTPAuthData.link, {
                method: getInitTOTPAuthData.method,
                headers: {
                    'Authorization': `${token.tokenType} ${token.accessToken}`,
                },
            });
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message);
            }
            setError(null);
            setQRCode(json);
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }
    const confirmTOTP = async (code) => {
        console.log(code)
        if(!user.sub) { setError("Not logged in"); return; }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${confirmTOTPAuthData.link}?code=${code}`, {
                method: confirmTOTPAuthData.method,
                headers: {
                    'Authorization': `${token.tokenType} ${token.accessToken}`,
                },
            });
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message);
            }
            dispatch(enableTOTP());
            setError(null);
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }
    return [error,isLoading,getInitTOTP,QRCode, confirmTOTP];
}
/*
 "/wallet/totp": {
      "post": {
        "tags": [
          "wallet-controller"
        ],
        "operationId": "createTotp",
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "/": {
"schema": {
    "$ref": "#/components/schemas/MessageResponse"
}
}
}
}
}
}
},
"/wallet/totp/confirm": {
    "post": {
        "tags": [
            "wallet-controller"
        ],
            "operationId": "confirmTotp",
            "parameters": [
            {
                "name": "Authorization",
                "in": "header",
                "required": true,
                "schema": {
                    "type": "string"
                }
            },
            {
                "name": "code",
                "in": "query",
                "required": true,
                "schema": {
                    "type": "string"
                }
            }
        ],
            "responses": {
            "200": {
                "description": "OK",
                    "content": {
                    "/": {
                        "schema": {
                            "type": "boolean"
                        }
                    }
                }
            }
        }
    }
},
 */
