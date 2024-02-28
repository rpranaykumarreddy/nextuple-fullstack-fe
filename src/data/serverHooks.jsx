
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
const rechargeWalletAuthData={
    link: `${serverURL}/recharge`,
    method: "POST",
}
const initTransactionAuthData={
    intialState: {
        to: "",
        amount: 0,
    },
    link: `${serverURL}/transaction/init`,
    method: "POST"
}
const confirmTransactionAuthData={
    link: `${serverURL}/transaction/confirm`,
    method: "POST"
}
const cancelTransactionAuthData={
    link: `${serverURL}/transaction/cancel`,
    method: "POST"
}
const checkWalletAuthData={
    link: `${serverURL}/transaction/check-wallet`,
    method: "GET"
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
export const useRechargeWallet = () => {
    const dispatch = useDispatch();
    const [error,setError] = useState(null);
    const [isLoading,setLoading] = useState(false);
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const rechargeWallet = async (amount) => {
        if(!user.sub) { setError("Not logged in"); return; }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${rechargeWalletAuthData.link}?amount=${amount}`, {
                method: rechargeWalletAuthData.method,
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
            setLoading(false);
            return true;
        } catch (error) {
            setError(error.message);
            setLoading(false);
            return false;
        }
    }
    return [error,isLoading,rechargeWallet];
}
export const useTransactions= () => {
    const dispatch = useDispatch();
    const [error,setError] = useState(null);
    const [isLoading,setLoading] = useState(false);
    const [data,setData] = useState(initTransactionAuthData.intialState);
    const [isWalletExists,setIsWalletExists] = useState(null);
    const [transactionId,setTransactionId] = useState(null);
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const initTransaction = async () => {
        if(!user.sub) { setError("Not logged in"); return; }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(initTransactionAuthData.link, {
                method: initTransactionAuthData.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token.tokenType} ${token.accessToken}`
                },
                body: JSON.stringify(data),
            });
            const json = await response.json();
            if (!response.ok) {
                console.log(json);
                throw new Error(json.message);
            }
            console.log('response', response, json);
            setError(null);
            setTransactionId(json.transactionId);
            setLoading(false);
            return true;
        } catch (error) {
            setError(error.message);
            setLoading(false);
            return false;
        }
    }
    const confirmTransaction = async (code) => {
        if(!user.sub) { setError("Not logged in"); return; }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${confirmTransactionAuthData.link}/${transactionId}?code=${code}`, {
                method: confirmTransactionAuthData.method,
                headers: {
                    'Authorization': `${token.tokenType} ${token.accessToken}`,
                },
            });
            const json = await response.json();
            let returnMsg = "SUCCESS"
            if (!response.ok) {
                console.log(json);
                if(json.message != "Transaction timeout"){
                    console.log(json.message);
                    throw new Error(json.message);
                }else{
                    returnMsg="TIMEOUT";
                }
            }
            if(returnMsg=="TIMEOUT"){
                setError("Transaction timeout");
            }else{
                setError(null);
                dispatch(setWallet(json));
            }
            setLoading(false);
            setData(initTransactionAuthData.intialState);
            setIsWalletExists(false);
            setTransactionId(null);
            return returnMsg;
        } catch (error) {
            setError(error.message);
            setLoading(false);
            return "ERROR";
        }
    }
    const cancelTransaction = async () => {
        if(!user.sub) { setError("Not logged in"); return; }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${cancelTransactionAuthData.link}/${transactionId}`, {
                method: cancelTransactionAuthData.method,
                headers: {
                    'Authorization': `${token.tokenType} ${token.accessToken}`,
                },
            });
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
            return true;
        } catch (error) {
            setError(error.message);
            setLoading(false);
            return false;
        }
    }
    const checkWallet = async () => {
        setError(null);
        try {
            if(data.to.trim() === "") {
                setError("Username is empty");
                return ;
            }
            const response = await fetch(`${checkWalletAuthData.link}/${data.to}`, {
                method: checkWalletAuthData.method,
                headers: {
                    'Authorization': `${token.tokenType} ${token.accessToken}`,
                }
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
    }
    return [error,isLoading,initTransaction,confirmTransaction,cancelTransaction,checkWallet,data, setData,isWalletExists];
}
/*
 "/transaction/init": {
      "post": {
        "tags": [
          "transaction-controller"
        ],
        "operationId": "initTransaction",
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
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InitTransactionRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "/": {
                "schema": {
                    "$ref": "#/components/schemas/InitTransactionResponse"
"/transaction/confirm/{transactionId}": {
    "post": {
        "tags": [
            "transaction-controller"
        ],
            "operationId": "confirmTransaction",
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
                "name": "transactionId",
                "in": "path",
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
                            "$ref": "#/components/schemas/GetWalletDetailsResponse"
"/transaction/cancel/{tranactionId}": {
    "post": {
        "tags": [
            "transaction-controller"
        ],
            "operationId": "cancelTransaction",
            "parameters": [
            {
                "name": "tranactionId",
                "in": "path",
                "required": true,
                "schema": {
                    "type": "string"
                }
            },
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
"/transaction/check-wallet/{username}": {
    "get": {
        "tags": [
            "transaction-controller"
        ],
            "operationId": "checkWallet",
            "parameters": [
            {
                "name": "username",
                "in": "path",
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
 */