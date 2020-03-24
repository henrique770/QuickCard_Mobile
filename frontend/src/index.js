import 'react-native-gesture-handler';

import React, {useState} from 'react';
import {StatusBar, Switch} from 'react-native';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components/native';

import {NavigationContainer} from '@react-navigation/native';
import darkTheme from '~/styles/theme/dark';
import lightTheme from '~/styles/theme/light';

import './config/ReactotronConfig';

import {store, persistor} from './store';
import App from './App';

export default function Index({...props}) {
  const [dark, setDark] = useState(false);
  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <StatusBar
              barStyle="light-content"
              backgroundColor={
                dark ? darkTheme.background : lightTheme.background
              }
            />
            <App
              {...props}
              onDarkModeChange={() => setDark(!dark)}
              darkModeValue={dark}
            />
            {/* <Switch
              thumbColor="#424242"
              trackColor="#292929"
              value={dark}
              onValueChange={() => setDark(!dark)}
            /> */}
          </PersistGate>
        </Provider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
