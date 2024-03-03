import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {enableTOTP, getToken, getUser, showMessage} from "../store";

export  const getInitTOTPAuthData={
    link: `http://localhost:8080/wallet/totp`,
    method: "POST",
}
export  const confirmTOTPAuthData={
    link: `http://localhost:8080/wallet/totp/confirm`,
    method: "POST",
}

export const useGetInitTOTP = () => {
    const dispatch = useDispatch();
    const [error,setError] = useState(null);
    const [isLoading,setLoading] = useState(false);
    const [QRCode,setQRCode] = useState(null);
    const token = useSelector(getToken);
    const user = useSelector(getUser);
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
            setLoading(false);
            setQRCode(json);
            dispatch(showMessage({message: "Scan the QR & Confirm the Code to enable TOTP", severity: "info"}));
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
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
            setError(null);
            setLoading(false);
            dispatch(enableTOTP());
            dispatch(showMessage({message: "TOTP enabled", severity: "success"}));
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }
    return [error,isLoading,getInitTOTP,QRCode, confirmTOTP];
}