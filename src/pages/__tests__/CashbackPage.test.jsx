import { getToken, getUser } from "../../data/store";
import CashbackPage from "../CashbackPage";
import { renderWithRedux } from "../../Utils/testHelper";
import { cashbackResponse, token, user } from "../../Utils/testData";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { getCashbackAuthData } from "../../data/serverHooks";
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
    renderWithRedux(<CashbackPage />);
    expect(global.fetch).toHaveBeenCalledWith(
      getCashbackAuthData.link + "?page=0",
      expect.objectContaining({
        method: getCashbackAuthData.method,
        headers: { Authorization: "Bearer " + token.accessToken },
      })
    );
  });
  test("should render & sub not exists", async () => {
    getToken.mockImplementation(() => token);
    getUser.mockImplementation(() => null);
    renderWithRedux(<CashbackPage />);
  });
  test("should render & response not ok", async () => {
    getToken.mockImplementation(() => token);
    getUser.mockImplementation(() => user);
    global.fetch = jest
      .fn()
      .mockResolvedValue({ ...cashbackResponse, ok: false });
    renderWithRedux(<CashbackPage />);
  });
  test("should render & paganation chnage", async () => {
    getToken.mockImplementation(() => token);
    getUser.mockImplementation(() => user);
    global.fetch = jest.fn().mockResolvedValue(cashbackResponse);
    renderWithRedux(<CashbackPage />);
    const nextPageButton = await screen.findByRole("button", {
      name: "Go to next page",
    });
    expect(nextPageButton).toBeInTheDocument();
    fireEvent.click(nextPageButton);
    expect(global.fetch).toHaveBeenCalledWith(
      getCashbackAuthData.link + `?page=1`,
      expect.objectContaining({
        method: "GET",
        headers: { Authorization: "Bearer " + token.accessToken },
      })
    );
  });
});
