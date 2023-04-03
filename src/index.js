import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from './store';

import './index.css';
import App from './App';
import theme from './styles/theme';
import GlobalStyle from './styles/globalStyles';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
      <GlobalStyle />
    </ThemeProvider>
  </Provider>,
  rootElement
);
