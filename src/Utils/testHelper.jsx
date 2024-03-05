import configureMockStore from "redux-mock-store";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import React from "react";
const mockStore = configureMockStore();

export function renderWithRedux(ui, { store } = {}) {
  return {
    ...render(<Provider store={mockStore(store)}>{ui}</Provider>),
    store,
  };
}
export function renderWithRouter(ui, route = "/" ) {
  if(route !== "/") {
    window.history.pushState({}, 'Test page', route);
  }
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}
export function renderWithReduxAndRouter(ui, { store, route } = {}) {
    return {
        ...render(<Provider store={mockStore(store)}><BrowserRouter>{ui}</BrowserRouter></Provider>),
        store,
    };
}