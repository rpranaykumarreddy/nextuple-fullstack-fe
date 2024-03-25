import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {disableTOTP, getToken, getUser, showMessage} from "../store";
import {GLOBALS} from "../../GLOBALS";

export const getDisableTOTPAuthData = {
    link:
        GLOBALS.serverHost +
        GLOBALS.link.wallet.id +
        GLOBALS.link.wallet.disableTotp,
    method: "PUT",
};

export const useGetDisableTOTP = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const token = useSelector(getToken);
    const user = useSelector(getUser);
    const getDisableTOTP = async () => {
        if (!user || !user.sub) {
            setError("Not logged in");
            return false;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(getDisableTOTPAuthData.link, {
                method: getDisableTOTPAuthData.method,
                headers: {
                    Authorization: `${token.tokenType} ${token.accessToken}`,
                },
            });
            console.log("response", response);
            const json = await response.json();
            console.log("json", json);
            if (!response.ok) {
                throw new Error(json.message);
            }
            setError(null);
            setLoading(false);
            dispatch(disableTOTP());
            dispatch(
                showMessage({
                    message: "TOTP disabled successfully",
                    severity: "success",
                })
            );
            return true;
        } catch (error) {
            setError(error.message);
            setLoading(false);
            return false;
        }
    };
    return [error, isLoading, getDisableTOTP];
};
