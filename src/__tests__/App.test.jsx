import App from "../App";
import { getToken, getUser } from "../data/store";
import { renderWithRedux } from "../Utils/testHelper";
import {
  token,
  tokenExpired,
  tokenInvalid,
  user,
  tokenResponse,
  tokenResponseNotOk,
  userExpired,
} from "../Utils/testData";
import { regenerateAuthData } from "../data/hook/useLogout";
import LoginForm from "../component/LoginForm";
import TopNav from "../component/TopNav";
import { fireEvent, screen } from "@testing-library/react";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("../data/store", () => ({
  showMessage: jest.fn(),
  setStatement: jest.fn(),
  getToken: jest.fn(() => null),
  setToken: jest.fn(),
  getUser: jest.fn(() => null),
  setUser: jest.fn(),
  clearStatement: jest.fn(),
  clearToken: jest.fn(),
  clearUser: jest.fn(),
  clearWallet: jest.fn(),
}));

jest.mock("../pages/NotFoundPage", () => ({
  __esModule: true,
  default: jest.fn(() => {
    return <div data-testid="not-found-page">Not Found Page</div>;
  }),
}));
jest.mock("../pages/AccountPage", () => {
  return function MockAccountPage() {
    return <div data-testid="account-page">Account Page</div>;
  };
});
jest.mock("../pages/StatementPage", () => {
  return function MockStatementPage() {
    return <div data-testid="statement-page">Statement Page</div>;
  };
});
jest.mock("../pages/HomePage", () => {
  return function MockHomePage() {
    return <div data-testid="home-page">Home Page</div>;
  };
});
jest.mock("../pages/CashbackPage", () => {
  return function MockCashbackPage() {
    return <div data-testid="cashback-page">Cashback Page</div>;
  };
});
jest.mock("../component/TopNav", () => ({
  __esModule: true,
  default: jest.fn(() => {
    return <div data-testid="top-nav">TopNav</div>;
  }),
}));
jest.mock("../component/SnackBarSystem", () => {
  return function MockSnackBarSystem() {
    return <div data-testid="snack-bar-system">SnackBarSystem</div>;
  };
});
describe("App", () => {
  test("renders App component", () => {
    jest.useFakeTimers();
    getToken.mockImplementation(() => token);
    getUser.mockImplementation(() => user);
    global.fetch = jest.fn().mockResolvedValue(tokenResponse);
    renderWithRedux(<App />);
    jest.advanceTimersByTime(1004798984);
    expect(global.fetch).toHaveBeenCalledWith(
      regenerateAuthData.link,
      expect.objectContaining({
        method: regenerateAuthData.method,
        headers: {
          Authorization: `${token.tokenType} ${token.accessToken}`,
        },
      })
    );
  });
  test("renders App component && expired token", () => {
    getToken.mockImplementation(() => tokenExpired);
    getUser.mockImplementation(() => userExpired);
    renderWithRedux(<App />);
  });
  test("renders App component && no token", () => {
    getToken.mockImplementation(() => null);
    getUser.mockImplementation(() => null);
    renderWithRedux(<App />);
  });
  test("renders App component && no user", () => {
    getToken.mockImplementation(() => tokenInvalid);
    getUser.mockImplementation(() => null);
    renderWithRedux(<App />);
  });
  test("renders App component with user && at /user", () => {
    getToken.mockImplementation(() => token);
    getUser.mockImplementation(() => user);
    renderWithRedux(<App />, "/user");
  });
  test("renders App component with user && click logout", () => {
    getToken.mockImplementation(() => token);
    getUser.mockImplementation(() => user);
    TopNav.mockImplementation(({ user, logout }) => {
      return (
        <>
          <p data-testid="topNav">Top Nav</p>
          <button onClick={logout} data-testid="logoutButton">
            logout
          </button>
        </>
      );
    });
    renderWithRedux(<App />, "/");
    const logoutButton = screen.getByTestId("logoutButton");
    expect(logoutButton).toBeInTheDocument();
    fireEvent.click(logoutButton);
  });
  test("renders App component without token && click logout", () => {
    getToken.mockImplementation(() => null);
    getUser.mockImplementation(() => user);
    TopNav.mockImplementation(({ user, logout }) => {
      return (
        <>
          <p data-testid="topNav">Top Nav</p>
          <button onClick={logout} data-testid="logoutButton">
            logout
          </button>
        </>
      );
    });
    renderWithRedux(<App />, "/");
    const logoutButton = screen.getByTestId("logoutButton");
    expect(logoutButton).toBeInTheDocument();
    fireEvent.click(logoutButton);
  });
});
