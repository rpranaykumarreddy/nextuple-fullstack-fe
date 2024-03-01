
import configureMockStore from 'redux-mock-store';
import {render}  from '@testing-library/react';
import { Provider } from 'react-redux';
const mockStore = configureMockStore();

export function renderWithRedux(ui, { store } = {}) {
    return {
      ...render(<Provider store={mockStore(store)}>{ui}</Provider>),
      store
    };
  }