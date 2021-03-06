import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ToastProvider } from './hooks/toast';
import GlobalStyle from './styles/global';

import Routes from './routes';

function App() {
  return (
    <>
      <ToastProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ToastProvider>
      <GlobalStyle />
    </>
  );
}

export default App;
