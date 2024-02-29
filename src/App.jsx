import { useDispatch, useSelector} from 'react-redux';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import {setUser, showMessage} from './data/store';
import NotFoundPage from "./pages/NotFoundPage";
import AccountPage from "./pages/AccountPage";
import StatementPage from "./pages/StatementPage";
import HomePage from "./pages/HomePage";
import Nav from "./component/Nav";
import {useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import {useLogout} from "./data/serverHooks";
import SnackBarSystem from "./component/SnackBarSystem";

function Check({ element }) {
    const user = useSelector((state) => state.user);
    if (!user) {
        return <Navigate to="/user" />
    }
    return element;
}

function App() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const logout = useLogout();
    useEffect(() => {
        if(user?.exp) {
            const timeout = user.exp * 1000 - Date.now();
            console.log("Timeout:", timeout);
            if(timeout > 0) {
                const timeoutId = setTimeout(() => {
                    console.log("Token expired, logging out");
                    logout("Session expired, please login again","error");
                }, timeout);
                return () => clearTimeout(timeoutId);
            }else{
                console.log("Token expired, logging out");
                logout("Session expired, please login again","error");
            }
        }
    },[user?.exp]);

    useEffect(() => {
        const decodeAndSetUser = (jwtToken) => {
            try {
                const decodedToken = jwtDecode(jwtToken);
                dispatch(setUser(decodedToken));
                console.log("Decoded token:", decodedToken);
            } catch (error) {
                console.error('Error decoding JWT token:', error);
                logout("Error decoding token, please login again", "error");
            }
        };

        if (token?.accessToken) {
            decodeAndSetUser(token.accessToken);
        } else {
            console.log("No token found");
        }
    }, [token, dispatch]);

  return (
      <div className='main'>
        <Router>
              <div className="complete">
            <Routes>
              <Route exact path="/user" element={<AccountPage/>} />
              <Route exact path="/" element={<Check element={<HomePage />} />} />
              <Route exact path="/statement" element={<Check element={<StatementPage />} />} />
              <Route exact path="*" element={<NotFoundPage />} />
            </Routes>
              </div>
            <Nav/>
            <SnackBarSystem/>
        </Router>
      </div>
  );
}

export default App;
