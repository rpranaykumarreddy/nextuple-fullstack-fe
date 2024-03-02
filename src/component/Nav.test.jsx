import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./Nav";
import { renderWithRouter } from "../Utils/testHelper";

describe("Nav", () => {
  test("should render Nav component", () => {
    renderWithRouter(<Nav />);
    const accountLink = screen.getByText("Account");
    const homeLink = screen.getByText("Home");
    const statementLink = screen.getByText("Statement");
    expect(accountLink).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(statementLink).toBeInTheDocument();
  });
  test("should navigate to account page when clicked on account link", () => {
    renderWithRouter(<Nav />);
    const accountLink = screen.getByText("Account");
    accountLink.click();
    expect(window.location.pathname).toBe("/user");
  });
  test("should navigate to home page when clicked on home link", () => {
    renderWithRouter(<Nav />);
    const homeLink = screen.getByText("Home");
    homeLink.click();
    expect(window.location.pathname).toBe("/");
  });
  test("should navigate to statement page when clicked on statement link", () => {
    renderWithRouter(<Nav />);
    const statementLink = screen.getByText("Statement");
    statementLink.click();
    expect(window.location.pathname).toBe("/statement");
  });
});
