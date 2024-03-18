import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import StatementPage from "../StatementPage";
import { renderWithRedux } from "../../Utils/testHelper";
import { getToken, getUser } from "../../data/store";
import { token, user, statementResponse } from "../../Utils/testData";
import { getStatementAuthData } from "../../data/hook/useGetStatement";
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

describe("Statement Page & useGetStatement fn()", () => {
  test("should render & success path", async () => {
    getToken.mockImplementation(() => token);
    getUser.mockImplementation(() => user);
    global.fetch = jest.fn().mockResolvedValue(statementResponse);
    renderWithRedux(<StatementPage />);
    expect(global.fetch).toHaveBeenCalledWith(
      getStatementAuthData.link + `?page=0`,
      expect.objectContaining({
        method: getStatementAuthData.method,
        headers: { Authorization: "Bearer " + token.accessToken },
      })
    );
  });
  test("should render & sub not exists", async () => {
    getToken.mockImplementation(() => token);
    getUser.mockImplementation(() => null);
    renderWithRedux(<StatementPage />);
  });
  test("should render & response not ok", async () => {
    getToken.mockImplementation(() => token);
    getUser.mockImplementation(() => user);
    global.fetch = jest
      .fn()
      .mockResolvedValue({ ...statementResponse, ok: false });
    renderWithRedux(<StatementPage />);
  });
  test("should render & input year change", async () => {
    getToken.mockImplementation(() => token);
    getUser.mockImplementation(() => user);
    global.fetch = jest.fn().mockResolvedValue(statementResponse);
    renderWithRedux(<StatementPage />);

    const nextPageButton = await screen.findByRole("button", {
      name: "Go to next page",
    });
    expect(nextPageButton).toBeInTheDocument();
    fireEvent.click(nextPageButton);
    expect(global.fetch).toHaveBeenCalledWith(
      getStatementAuthData.link + `?page=1`,
      expect.objectContaining({
        method: getStatementAuthData.method,
        headers: { Authorization: "Bearer " + token.accessToken },
      })
    );
  });
});
