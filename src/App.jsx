import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { getToken, getUser, setUser } from "./data/store";
import NotFoundPage from "./pages/NotFoundPage";
import AccountPage from "./pages/AccountPage";
import StatementPage from "./pages/StatementPage";
import HomePage from "./pages/HomePage";
import CashbackPage from "./pages/CashbackPage";
import SnackBarSystem from "./component/SnackBarSystem";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useLogout } from "./data/serverHooks";
import TopNav from "./component/TopNav";

function Check({ element }) {
  const user = useSelector(getUser);
  if (!user) {
    return <Navigate to="/user" />;
  }
  return element;
}
function RedirectOnLogin({ element }) {
  const user = useSelector(getUser);
  if (user) {
    return <Navigate to="/" />;
  }
  return element;
}

function App() {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const [regenerate, logout] = useLogout();
  useEffect(() => {
    if (user?.exp) {
      const timeout = user.exp * 1000 - Date.now();
      console.log(timeout);
      if (timeout > 0) {
        const timeoutId = setTimeout(() => {
          regenerate();
        }, timeout - 120000);
        return () => clearTimeout(timeoutId);
      } else {
        logout("Session expired, please login again", "error");
      }
    }
  }, [user?.exp]);

  useEffect(() => {
    const decodeAndSetUser = (jwtToken) => {
      try {
        const decodedToken = jwtDecode(jwtToken);
        dispatch(setUser(decodedToken));
      } catch (error) {
        logout("Error decoding token, please login again", "error");
      }
    };

    if (token?.accessToken) {
      decodeAndSetUser(token.accessToken);
    } else {
      console.log("No token found");
    }
  }, [token, dispatch]);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#b72467",
      },
      secondary: {
        main: "#19384f",
      },
    },
  });
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <TopNav user={user} logout={logout} />
        <div className="main">
          <div className="complete">
            <Routes>
              <Route
                exact
                path="/user"
                element={<RedirectOnLogin element={<AccountPage />} />}
              />
              <Route
                exact
                path="/"
                element={<Check element={<HomePage />} />}
              />
              <Route
                exact
                path="/statement"
                element={<Check element={<StatementPage />} />}
              />
              <Route
                exact
                path="/cashback"
                element={<Check element={<CashbackPage />} />}
              />
              <Route
                exact
                path="*"
                element={<Check element={<NotFoundPage />} />}
              />
            </Routes>
          </div>
          <SnackBarSystem />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
