import {useDispatch, useSelector} from "react-redux";
import {clearStatement, clearToken, clearUser, clearWallet,getToken ,showMessage} from "../store";

export const useLogout = () => {
    const dispatch = useDispatch();
    const token = useSelector(getToken);
    console.log("token at useLogout ", token);
    const logout = (msg = "Logged out", severity = "success") => {
        console.log("token:", token);
        if(token) {
            dispatch(clearToken());
            dispatch(clearUser());
            dispatch(clearStatement());
            dispatch(clearWallet());
            dispatch(showMessage({message: msg, severity: severity}));
        }else{
            dispatch(showMessage({message: "No token, Refresh the page", severity: "error"}));
        }
    }
    return logout;
}