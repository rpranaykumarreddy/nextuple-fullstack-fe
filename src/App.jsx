import { useDispatch, useSelector} from 'react-redux';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import { setUser} from './data/store';
import NotFoundPage from "./pages/NotFoundPage";
import AccountPage from "./pages/AccountPage";
import StatementPage from "./pages/StatementPage";
import HomePage from "./pages/HomePage";
import Nav from "./component/Nav";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {useLogout} from "./data/serverHooks";
import {Snackbar} from "@mui/material";
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
    const [error, setError] = useState(null);
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
                    logout();
                    setError("Session expired, please login again");
                }, timeout);
                return () => clearTimeout(timeoutId);
            }
        }
    },[user?.exp, logout]);

    useEffect(() => {
        const decodeToken = (jwtToken) => {
            try {
                return jwtDecode(jwtToken);
            } catch (error) {
                console.error('Error decoding JWT token:', error);
                return null;
            }
        };
        if (token?.accessToken) {
            const decodedToken = decodeToken(token.accessToken);
            if (decodedToken) {
                dispatch(setUser(decodedToken));
                console.log("Decoded token:", decodedToken);
            } else {
                console.log("Unable to decode token, clearing token from store.");
                logout();
            }
        } else {
            console.log("No token found");
        }
    }, [token, dispatch, logout]);

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
                  <Snackbar
                      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                      open={error !== null}
                      autoHideDuration={6000}
                      onClose={() => setError(null)}
                      message={error}
                  />
              </div>
            <Nav/>
            <SnackBarSystem/>
        </Router>
      </div>
  );
}

export default App;
