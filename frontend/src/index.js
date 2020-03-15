import React, {useState} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {StatusBar, Switch} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import darkTheme from '~/styles/theme/dark';
import lightTheme from '~/styles/theme/light';

import './config/ReactotronConfig';

import {store, persistor} from './store';
import App from './App';

export default function Index() {
  const [dark, setDark] = useState(true);
  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={
              dark ? darkTheme.background : lightTheme.background
            }
          />
          <App />
          {/* <Switch
            thumbColor="#424242"
            trackColor="#292929"
            value={dark}
            onValueChange={() => setDark(!dark)}
          /> */}
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}
