import { render, screen } from '@testing-library/react';
import App from './App';
import store from "./data/store";
import {Provider} from 'react-redux';

test('renders App component without crashing', () => {
  render(
      <Provider store={store}>
          <App />
      </Provider>
  );
});
