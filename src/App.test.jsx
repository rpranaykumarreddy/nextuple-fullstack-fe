import App from './App';
import {getToken, getUser} from "./data/store";
import {renderWithRedux} from "./Utils/testHelper";
import {token, tokenExpired, tokenInvalid, user, userExpired} from "./Utils/testData";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
}));

jest.mock("./data/store", () => ({
    showMessage: jest.fn(),
    setStatement: jest.fn(),
    getToken: jest.fn(() => null),
    getUser: jest.fn(() => null),
    setUser: jest.fn(),
    clearStatement: jest.fn(),
    clearToken: jest.fn(),
    clearUser: jest.fn(),
    clearWallet: jest.fn(),
}));
jest.mock("./pages/NotFoundPage", () => {
    return function MockNotFoundPage() {
        return <div data-testid="not-found-page">Not Found Page</div>;
    };
});
jest.mock("./pages/AccountPage", () => {
    return function MockAccountPage() {
        return <div data-testid="account-page">Account Page</div>;
    };
});
jest.mock("./pages/StatementPage", () => {
    return function MockStatementPage() {
        return <div data-testid="statement-page">Statement Page</div>;
    };
});
jest.mock("./pages/HomePage", () => {
    return function MockHomePage() {
        return <div data-testid="home-page">Home Page</div>;
    };
});
jest.mock("./component/Nav", () => {
    return function MockNav() {
        return <div data-testid="nav">Nav</div>;
    };
});
jest.mock("./component/TopNav", () => {
    return function MockTopNav() {
        return <div data-testid="top-nav">TopNav</div>;
    };
});
jest.mock("./component/SnackBarSystem", () => {
    return function MockSnackBarSystem() {
        return <div data-testid="snack-bar-system">SnackBarSystem</div>;
    };
});

describe('App', () => {
    test('renders App component', () => {
        jest.useFakeTimers();
        getToken.mockImplementation(() => token);
        getUser.mockImplementation(() => user);
        renderWithRedux(<App />)
        jest.advanceTimersByTime(1004798984)
    });

    test('renders App component && expired token', () => {
        getToken.mockImplementation(() => tokenExpired);
        getUser.mockImplementation(() => userExpired);
        renderWithRedux(<App />)
    });
    test('renders App component && no token', () => {
        getToken.mockImplementation(() => null);
        getUser.mockImplementation(() => null);
        renderWithRedux(<App />)
    });
    test('renders App component && no user', () => {
        getToken.mockImplementation(() =>tokenInvalid);
        getUser.mockImplementation(() => null);
        renderWithRedux(<App />)
    });
});