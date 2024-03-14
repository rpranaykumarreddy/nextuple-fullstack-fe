import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import StatementPage from "../StatementPage";
import { renderWithRedux } from "../../Utils/testHelper";
import {getToken, getUser} from "../../data/store";
import {token, user, statementResponse} from "../../Utils/testData";
import {getStatementAuthData} from "../../data/hook/useGetStatement";
import userEvent from "@testing-library/user-event";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
}));

jest.mock("../../data/store", () => ({
    showMessage: jest.fn(),
    setStatement: jest.fn(),
    getToken: jest.fn(() => null),
    getUser: jest.fn(() => null),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe("Statement Page & useGetStatement fn()", () => {
    test("should render & success path", async () => {
        getToken.mockImplementation(() => token);
        getUser.mockImplementation(() => user);
        global.fetch = jest.fn().mockResolvedValue(statementResponse);
        renderWithRedux(<StatementPage />);
        const field = screen.getByTestId("refresh");
        expect(field).toBeInTheDocument();
        fireEvent.click(field);
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        expect(global.fetch).toHaveBeenCalledWith(
            getStatementAuthData.link + `?month=${month}&year=${year}`,
            expect.objectContaining({
                method: getStatementAuthData.method,
                headers: { "Authorization": "Bearer " + token.accessToken }
            }),
        );
    });
    test("should render & sub not exists", async () => {
        getToken.mockImplementation(() => token);
        getUser.mockImplementation(() => null);
        renderWithRedux(<StatementPage />);
        const field = screen.getByTestId("refresh");
        expect(field).toBeInTheDocument();
        fireEvent.click(field);
    });
    test("should render & response not ok", async () => {
        getToken.mockImplementation(() => token);
        getUser.mockImplementation(() => user);
        global.fetch = jest.fn().mockResolvedValue({...statementResponse, ok: false});
        renderWithRedux(<StatementPage />);
        const field = screen.getByTestId("refresh");
        expect(field).toBeInTheDocument();
        fireEvent.click(field);
    });
    test("should render & input year change", async () => {
        jest.setTimeout(30000);
        getToken.mockImplementation(() => token);
        getUser.mockImplementation(() => user);
        global.fetch = jest.fn().mockResolvedValue(statementResponse);
        renderWithRedux(<StatementPage />);
        const monthAutocomplete = screen.getByTestId("month-input");
        const monthInput = screen.getByTestId("month-input").querySelector("input");
        expect(monthInput).toBeInTheDocument();
        const userevent= userEvent;
        monthAutocomplete.focus();
        await userevent.type(monthInput, "February");
        await userevent.type(monthAutocomplete, "{arrowdown}");
        await userevent.type(monthAutocomplete, "{enter}");
        expect(monthInput).toHaveValue("February");
        const yearInput = screen.getByTestId("year-input").querySelector("input");
        expect(yearInput).toBeInTheDocument();
        yearInput.focus();
        await userevent.type(yearInput, "2023");
        const yearAutocomplete = screen.getByTestId("year-input");
        await userevent.type(yearAutocomplete, "{arrowdown}");
        await userevent.type(yearAutocomplete, "{enter}");
        expect(yearInput).toHaveValue("2023");
        const button = screen.getByText("Get Statement");
        fireEvent.click(button);
        expect(global.fetch).toHaveBeenCalledWith(
            getStatementAuthData.link + `?month=2&year=2023`,
            expect.objectContaining({
                method: getStatementAuthData.method,
                headers: { "Authorization": "Bearer " + token.accessToken }
            }),
        );
    });
});