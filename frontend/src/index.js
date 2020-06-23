import 'react-native-gesture-handler';

import React, {useState} from 'react';
import {StatusBar, Switch} from 'react-native';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';

import {MyThemeProvider} from '~/components/ThemeContext';

import './config/ReactotronConfig';

import {store, persistor} from './store';
import App from './App';

export default function Index() {
  return (
    <MyThemeProvider>
      <NavigationContainer>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </NavigationContainer>
    </MyThemeProvider>
  );
}
