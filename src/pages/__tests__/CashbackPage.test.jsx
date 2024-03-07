import {getToken, getUser} from "../../data/store";
import CashbackPage from "../CashbackPage";
import {renderWithRedux} from "../../Utils/testHelper";
import {cashbackResponse, token, user} from "../../Utils/testData";
import {fireEvent, screen} from "@testing-library/react";
import {getCashbackAuthData} from "../../data/serverHooks";
import userEvent from "@testing-library/user-event";
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
}));

jest.mock("../../data/store", () => ({
    showMessage: jest.fn(),
    getToken: jest.fn(() => null),
    getUser: jest.fn(() => null),
}));
beforeEach(() => {
    jest.clearAllMocks();
});
describe("Cashback Page & useGetCashback fn()", () => {
    test("should render & success path", async () => {
        getToken.mockImplementation(() => token);
        getUser.mockImplementation(() => user);
        global.fetch = jest.fn().mockResolvedValue(cashbackResponse);
        renderWithRedux(<CashbackPage/>);
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining(`?month=${month}&year=${year}`),
            expect.objectContaining({
                method: "GET",
                headers: { "Authorization": "Bearer " + token.accessToken }
            }),
        );
    });
    test("should render & sub not exists", async () => {
        getToken.mockImplementation(() => token);
        getUser.mockImplementation(() => null);
        renderWithRedux(<CashbackPage/>);
    });
    test("should render & response not ok", async () => {
        getToken.mockImplementation(() => token);
        getUser.mockImplementation(() => user);
        global.fetch = jest.fn().mockResolvedValue({...cashbackResponse, ok: false});
        renderWithRedux(<CashbackPage/>);
    });
    test("should render & input year change", async () => {
        getToken.mockImplementation(() => token);
        getUser.mockImplementation(() => user);
        global.fetch = jest.fn().mockResolvedValue(cashbackResponse);
        renderWithRedux(<CashbackPage/>);
        const autocomplete = screen.getByTestId('year-input');
        const input = screen.getByTestId('year-input').querySelector('input')
        autocomplete.focus()
        const userevent= userEvent;
        await userevent.type(input, '2023')
        await userevent.type(autocomplete, '{arrowdown}');
        await userevent.type(autocomplete, '{enter}');
        expect(input).toHaveValue("2023")
        const month = new Date().getMonth() + 1;
        expect(global.fetch).toHaveBeenCalledWith(
            getCashbackAuthData.link + `?month=${month}&year=2023`,
            expect.objectContaining({
                method: "GET",
                headers: { "Authorization": "Bearer " + token.accessToken }
            }),
        );
    });
    test("should render & input month change", async () => {
        getToken.mockImplementation(() => token);
        getUser.mockImplementation(() => user);
        global.fetch = jest.fn().mockResolvedValue(cashbackResponse);
        renderWithRedux(<CashbackPage/>);
        const autocomplete = screen.getByTestId('month-input');
        const input = screen.getByTestId('month-input').querySelector('input')
        autocomplete.focus()
        const userevent= userEvent;
        await userevent.type(input, 'February')
        await userevent.type(autocomplete, '{arrowdown}');
        await userevent.type(autocomplete, '{enter}');
        expect(input).toHaveValue("February")
        const year = new Date().getFullYear();
        expect(global.fetch).toHaveBeenCalledWith(
            getCashbackAuthData.link + `?month=2&year=${year}`,
            expect.objectContaining({
                method: "GET",
                headers: { "Authorization": "Bearer " + token.accessToken }
            }),
        );
    });

});