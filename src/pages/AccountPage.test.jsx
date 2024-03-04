import {getUser} from "../data/store";
import {renderWithRedux} from "../Utils/testHelper";
import AccountPage from "./AccountPage";
import {screen, waitFor} from "@testing-library/react";
import LoginForm from "../component/LoginForm";
import userEvent from "@testing-library/user-event";
import {user} from "../Utils/testData";
import RegisterationForm from "../component/RegisterationForm";
import WelcomeForm from "../component/WelcomeForm";

jest.mock("../component/LoginForm", () => ({
    __esModule: true,
    default: jest.fn(() => {
        return <p data-testid="LoginFrom">LoginFrom</p>;
    }),
}));
jest.mock("../component/RegisterationForm", () => ({
    __esModule: true,
    default: jest.fn(() => {
        return <p data-testid="RegisterationForm">RegisterationForm</p>;
    }),
}));
jest.mock("../component/WelcomeForm", () => ({
    __esModule: true,
    default: jest.fn(() => {
        return <p data-testid="WelcomeForm">WelcomeForm</p>;
    }),
}));
jest.mock("../data/store", () => ({
    getUser: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe("AccountPage", () => {
    test('should render & test AccountPage', async () => {
        getUser.mockImplementation(() => null);
        LoginForm.mockImplementation(({flipLogin}) => {
            return <><p data-testid="LoginFrom">LoginFrom</p>
                <button onClick={flipLogin} data-testid="flipLogin">flipLogin</button>
            </>;
        });
        RegisterationForm.mockImplementation(({flipLogin}) => {
            return <><p data-testid="RegisterationForm">RegisterationForm</p>
                <button onClick={flipLogin} data-testid="flipReg">flipLogin</button>
            </>;
        });
        renderWithRedux(<AccountPage/>);
        const loginForm = screen.getByTestId("LoginFrom");
        expect(loginForm).toBeInTheDocument();
        const flipLoginButton = screen.getByTestId("flipLogin");
        expect(flipLoginButton).toBeInTheDocument();
        await userEvent.click(flipLoginButton);
        await waitFor(()=>{
            screen.getByTestId("RegisterationForm")
        })
        const RegistrationForm = screen.getByTestId("RegisterationForm");
        expect(RegistrationForm).toBeInTheDocument();
        const flipRegistrationButton = screen.getByTestId("flipReg");
        expect(flipRegistrationButton).toBeInTheDocument();
    });
    test('should render & Show Welcome form', () => {
        getUser.mockImplementation(() => user);
        WelcomeForm.mockImplementation(() => {
            return <p data-testid="WelcomeForm">WelcomeForm</p>;
        });
        renderWithRedux(<AccountPage/>);
        const welcomeForm = screen.getByTestId("WelcomeForm");
        expect(welcomeForm).toBeInTheDocument();
    });
});