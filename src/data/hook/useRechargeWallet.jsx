import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {setWallet, showMessage} from "../store";

export  const rechargeWalletAuthData={
    link: `http://localhost:8080/recharge`,
    method: "POST",
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
            setLoading(false);
            dispatch(setWallet(json));
            dispatch(showMessage({message: "Wallet recharged with a cashback", severity: "success"}));
            return true;
        } catch (error) {
            setError(error.message);
            setLoading(false);
            return false;
        }
    }
    return [error,isLoading,rechargeWallet];
}