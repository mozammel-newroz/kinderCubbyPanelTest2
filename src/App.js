import React from 'react';
import axios from 'axios';
import { CookiesProvider } from 'react-cookie';

import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import 'react-perfect-scrollbar/dist/css/styles.css';

import configureStore, { history } from './redux/store';
import AppWrapper from './@jumbo/components/AppWrapper';
import AppContextProvider from './@jumbo/components/contextProvider/AppContextProvider';
import Routes from './routes';
import AuthContextProvider from '@jumbo/components/context/AuthContext';
import ItemsContextProvider from '@jumbo/components/context/pageContext/ItemsContext';
import ControlContextProvider from '@jumbo/components/context/pageContext/ControlContext';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const store = configureStore();

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <CookiesProvider>
        <AppContextProvider>
          <AuthContextProvider>
            <ControlContextProvider>
              <ItemsContextProvider>
                <AppWrapper>
                  <Switch>
                    <Routes />
                  </Switch>
                </AppWrapper>
              </ItemsContextProvider>
            </ControlContextProvider>
          </AuthContextProvider>
        </AppContextProvider>
      </CookiesProvider>
    </ConnectedRouter>
  </Provider>
);

export default App;
