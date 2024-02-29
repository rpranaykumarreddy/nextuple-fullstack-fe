import {loginAuthData, useLogin} from "./hook/useLogin";
import {registerAuthData,  checkUsernameAuthData,useRegister} from "./hook/useRegister";
import {useLogout} from "./hook/useLogout";
import {getStatementAuthData, useGetStatement} from "./hook/useGetStatement";
import {getWalletDetailsAuthData,useGetWalletDetails } from "./hook/useGetWalletDetails";
import {getInitTOTPAuthData,confirmTOTPAuthData,useGetInitTOTP} from "./hook/useGetInitTOTP";
import {rechargeWalletAuthData, useRechargeWallet} from "./hook/useRechargeWallet";
import {initTransactionAuthData, confirmTransactionAuthData, cancelTransactionAuthData, checkWalletAuthData, useTransactions} from "./hook/useTransactions";

// A collection of hooks to call the server

export {useLogin,loginAuthData };
export {registerAuthData, checkUsernameAuthData,useRegister};
export {useLogout};
export {getStatementAuthData, useGetStatement};
export {getWalletDetailsAuthData,useGetWalletDetails};
export {getInitTOTPAuthData,confirmTOTPAuthData,useGetInitTOTP};
export {rechargeWalletAuthData, useRechargeWallet};
export {initTransactionAuthData, confirmTransactionAuthData, cancelTransactionAuthData, checkWalletAuthData, useTransactions};
