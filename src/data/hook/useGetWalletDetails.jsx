import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {setWallet, showMessage} from "../store";

export  const getWalletDetailsAuthData={
    link: `http://localhost:8080/wallet/details`,
    method: "GET",
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
            setLoading(false);
            dispatch(setWallet(json));
            dispatch(showMessage({message: "Wallet details fetched", severity: "success"}));
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }
    return [error,isLoading,getWalletDetails];
}