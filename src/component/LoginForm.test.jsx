import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { loginAuthData } from "../data/serverHooks";
import { renderWithRedux } from "../Utils/testHelper";
import { getToken } from "../data/store";

const flipLogin = jest.fn();

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("../data/store", () => ({
  setToken: jest.fn(),
  showMessage: jest.fn(),
  getToken: jest.fn(() => null),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Login Form & useLogin fn()", () => {
  test("should render & success path", async () => {
    const mockResponse = { someKey: "someValue" };
    const expectedLink = "http://localhost:8080/auth/login";
    const expectedMethod = "POST";
    const expectedHeaders = {
      "Content-Type": "application/json",
    };
    const expectedBody = JSON.stringify({
      username: "pranay",
      password: "pranay",
    });
    getToken.mockImplementation(() => null);
    global.fetch = jest.fn().mockResolvedValue(
      {
        json: jest.fn().mockResolvedValue(mockResponse),
        status: 200,
        ok: true,
        headers: { "Content-Type": "application/json" },
      },
      { method: "POST", headers: { "Content-Type": "application/json" } },
    );
    renderWithRedux(<LoginForm flipLogin={flipLogin} />);
    const fieldMail = screen.getByTestId("email-input").querySelector("input");
    expect(fieldMail).toBeInTheDocument();
    const fieldPassword = screen
      .getByTestId("password-input")
      .querySelector("input");
    expect(fieldPassword).toBeInTheDocument();
    fireEvent.change(fieldMail, { target: { value: "pranay" } });
    fireEvent.change(fieldPassword, { target: { value: "pranay" } });

    const field = screen.getByText("Log In User");
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
    getToken.mockImplementation(() => "null");
    renderWithRedux(<LoginForm flipLogin={flipLogin} />);
    const fieldMail = screen.getByTestId("email-input").querySelector("input");
    expect(fieldMail).toBeInTheDocument();
    const fieldPassword = screen
      .getByTestId("password-input")
      .querySelector("input");
    expect(fieldPassword).toBeInTheDocument();
    fireEvent.change(fieldMail, { target: { value: "pranay" } });
    fireEvent.change(fieldPassword, { target: { value: "pranay" } });

    const field = screen.getByText("Log In User");
    expect(field).toBeInTheDocument();
    fireEvent.click(field);
  });
  test("should render & failure path", () => {
    getToken.mockImplementation(() => null);
    const mockResponse = { someKey: "someValue" };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
    renderWithRedux(<LoginForm flipLogin={flipLogin} />);
    const fieldMail = screen.getByTestId("email-input").querySelector("input");
    expect(fieldMail).toBeInTheDocument();
    const fieldPassword = screen
      .getByTestId("password-input")
      .querySelector("input");
    expect(fieldPassword).toBeInTheDocument();
    fireEvent.change(fieldMail, { target: { value: "pranay" } });
    fireEvent.change(fieldPassword, { target: { value: "pranay" } });

    const field = screen.getByText("Log In User");
    expect(field).toBeInTheDocument();
    fireEvent.click(field);
    /*
    Test this lines:
    const response = await fetch(loginAuthData.link, {
        method: loginAuthData.method,
        headers: loginAuthData.headers,
        body: JSON.stringify(data),
      });
     */
  });
});
