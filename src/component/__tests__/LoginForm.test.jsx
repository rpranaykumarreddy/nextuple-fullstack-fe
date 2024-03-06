import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import LoginForm from "../LoginForm";
import { loginAuthData } from "../../data/serverHooks";
import { renderWithRedux } from "../../Utils/testHelper";
import { getToken } from "../../data/store";
import {token, tokenResponse} from "../../Utils/testData";

const flipLogin = jest.fn();

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("../../data/store", () => ({
  setToken: jest.fn(),
  showMessage: jest.fn(),
  getToken: jest.fn(() => null),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Login Form & useLogin fn()", () => {
  test("should render & success path", async () => {
    getToken.mockImplementation(() => null);
    global.fetch = jest.fn().mockResolvedValue(tokenResponse);
    renderWithRedux(<LoginForm flipLogin={flipLogin} />);
    const fieldMail = screen.getByTestId("email-input").querySelector("input");
    expect(fieldMail).toBeInTheDocument();
    const fieldPassword = screen
      .getByTestId("password-input")
      .querySelector("input");
    expect(fieldPassword).toBeInTheDocument();
    fireEvent.change(fieldMail, { target: { value: "pranay" } });
    fireEvent.change(fieldPassword, { target: { value: "pranay" } });

    const field = screen.getByText("Login");
    expect(field).toBeInTheDocument();
    fireEvent.click(field);
    expect(global.fetch).toHaveBeenCalledWith(
      loginAuthData.link,
      expect.objectContaining({
        method: loginAuthData.method,
        headers: loginAuthData.headers,
        body: JSON.stringify({ username: "pranay", password: "pranay" }),
      }),
    );
  });

  test("should render & Token exists", () => {
    getToken.mockImplementation(() => token);
    renderWithRedux(<LoginForm flipLogin={flipLogin} />);
    const fieldMail = screen.getByTestId("email-input").querySelector("input");
    expect(fieldMail).toBeInTheDocument();
    const fieldPassword = screen
      .getByTestId("password-input")
      .querySelector("input");
    expect(fieldPassword).toBeInTheDocument();
    fireEvent.change(fieldMail, { target: { value: "pranay" } });
    fireEvent.change(fieldPassword, { target: { value: "pranay" } });

    const field = screen.getByText("Login");
    expect(field).toBeInTheDocument();
    fireEvent.click(field);
  });

  test("should render & failure path", () => {
    getToken.mockImplementation(() => null);
    global.fetch = jest.fn().mockResolvedValue({...tokenResponse, ok: false});
    renderWithRedux(<LoginForm flipLogin={flipLogin} />);
    const fieldMail = screen.getByTestId("email-input").querySelector("input");
    expect(fieldMail).toBeInTheDocument();
    const fieldPassword = screen
      .getByTestId("password-input")
      .querySelector("input");
    expect(fieldPassword).toBeInTheDocument();
    fireEvent.change(fieldMail, { target: { value: "pranay" } });
    fireEvent.change(fieldPassword, { target: { value: "pranay" } });

    const field = screen.getByText("Login");
    expect(field).toBeInTheDocument();
    fireEvent.click(field);

  });
});
