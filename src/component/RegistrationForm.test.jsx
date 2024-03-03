import {renderWithRedux} from "../Utils/testHelper";
import RegisterationForm from "./RegisterationForm";
import {getToken} from "../data/store";
import {checkUsernameAvailableResponse, registerResponse, token, tokenResponse} from "../Utils/testData";
import {fireEvent, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {checkUsernameAuthData, registerAuthData} from "../data/serverHooks";

const flipLogin = jest.fn();

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
}));

jest.mock("../data/store", () => ({
    showMessage: jest.fn(),
    getToken: jest.fn(() => null),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe("Registeration Form & useRegister fn()", () => {
    test("should render & success path", async () => {
        getToken.mockImplementation(() => null);
        global.fetch = jest.fn()
            .mockResolvedValueOnce(checkUsernameAvailableResponse)
            .mockResolvedValueOnce(registerResponse);
        const user = userEvent;
        renderWithRedux(<RegisterationForm flipLogin={flipLogin}/>);
        const fieldUsername = screen.getByTestId("username-input").querySelector("input");
        expect(fieldUsername).toBeInTheDocument();
        const fieldEmail = screen.getByTestId("email-input").querySelector("input");
        expect(fieldEmail).toBeInTheDocument();
        const fieldPassword = screen.getByTestId("password-input").querySelector("input");
        expect(fieldPassword).toBeInTheDocument();
        await user.type(fieldUsername, "pranay");
        await user.tab();
        fireEvent.change(fieldEmail, {target: {value: "pranay@gmail.com"}});
        fireEvent.change(fieldPassword, {target: {value: "pranay"}});
        const field = screen.getByText("Create Account");
        expect(field).toBeInTheDocument();
        fireEvent.click(field);
        expect(global.fetch).toHaveBeenCalledWith(
            checkUsernameAuthData.link + "/pranay",
            expect.objectContaining({method: checkUsernameAuthData.method}),
        );
        expect(global.fetch).toHaveBeenCalledWith(registerAuthData.link, {
            method: registerAuthData.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: "pranay", password: "pranay", email: "pranay@gmail.com"
            })
        });

    });
    test("should render & Token exists", async () => {
        getToken.mockImplementation(() => token);
        const user = userEvent;
        renderWithRedux(<RegisterationForm flipLogin={flipLogin}/>);
        const fieldUsername = screen.getByTestId("username-input").querySelector("input");
        expect(fieldUsername).toBeInTheDocument();
        const fieldEmail = screen.getByTestId("email-input").querySelector("input");
        expect(fieldEmail).toBeInTheDocument();
        const fieldPassword = screen.getByTestId("password-input").querySelector("input");
        expect(fieldPassword).toBeInTheDocument();
        await user.type(fieldUsername, "pranay");
        await user.tab();
        fireEvent.change(fieldEmail, {target: {value: "pranay@gmail.com "}});
        fireEvent.change(fieldPassword, {target: {value: "pranay"}});
        const field = screen.getByText("Create Account");
        expect(field).toBeInTheDocument();
        fireEvent.click(field);
    });
    test("should render & response not ok at register", async () => {
        getToken.mockImplementation(() => null);
        global.fetch = jest.fn()
            .mockResolvedValueOnce(checkUsernameAvailableResponse)
            .mockResolvedValue({...registerResponse, ok: false});
        const user = userEvent;
        renderWithRedux(<RegisterationForm flipLogin={flipLogin}/>);
        const fieldUsername = screen.getByTestId("username-input").querySelector("input");
        expect(fieldUsername).toBeInTheDocument();
        const fieldEmail = screen.getByTestId("email-input").querySelector("input");
        expect(fieldEmail).toBeInTheDocument();
        const fieldPassword = screen.getByTestId("password-input").querySelector("input");
        expect(fieldPassword).toBeInTheDocument();
        await user.type(fieldUsername, "pranay");
        await user.tab();
        fireEvent.change(fieldEmail, {target: {value: "pranay@gmail.com "}});
        fireEvent.change(fieldPassword, {target: {value: "pranay"}});
        const field = screen.getByText("Create Account");
        expect(field).toBeInTheDocument();
        fireEvent.click(field);
    });
    test("should render & response not ok at check username", async () => {
        getToken.mockImplementation(() => null);
        global.fetch = jest.fn()
            .mockResolvedValue({
                checkUsernameAvailableResponse, ok: false, json: () => {
                    return {message: "Username not available"}
                }
            });
        const user = userEvent;
        renderWithRedux(<RegisterationForm flipLogin={flipLogin}/>);
        const fieldUsername = screen.getByTestId("username-input").querySelector("input");
        expect(fieldUsername).toBeInTheDocument();
        const fieldEmail = screen.getByTestId("email-input").querySelector("input");
        expect(fieldEmail).toBeInTheDocument();
        const fieldPassword = screen.getByTestId("password-input").querySelector("input");
        expect(fieldPassword).toBeInTheDocument();
        await user.type(fieldUsername, "pranay");
        await user.tab();
    });
    test("should render & fail validation", async () => {
        getToken.mockImplementation(() => null);
        global.fetch = jest.fn()
            .mockResolvedValueOnce({checkUsernameAvailableResponse, ok: false});
        const user = userEvent;
        renderWithRedux(<RegisterationForm flipLogin={flipLogin}/>);
        const fieldUsername = screen.getByTestId("username-input").querySelector("input");
        expect(fieldUsername).toBeInTheDocument();
        const fieldEmail = screen.getByTestId("email-input").querySelector("input");
        expect(fieldEmail).toBeInTheDocument();
        const fieldPassword = screen.getByTestId("password-input").querySelector("input");
        expect(fieldPassword).toBeInTheDocument();
        await user.type(fieldUsername, "   ");
        await user.tab();
        const errorText = screen.getByText("Username is empty");
        expect(errorText).toBeInTheDocument();
    });

});