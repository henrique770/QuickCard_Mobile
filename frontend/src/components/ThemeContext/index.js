/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {ThemeProvider} from 'styled-components/native';
import darkTheme from '~/styles/theme/dark';
import lightTheme from '~/styles/theme/light';
import {StatusBar} from 'react-native';

import SyncStorage from 'sync-storage';

const ThemeToggleContext = React.createContext();

export const useTheme = () => React.useContext(ThemeToggleContext);

export const MyThemeProvider = ({children}) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      SyncStorage.set('theme', 'dark');
    } else {
      setTheme('light');
      SyncStorage.set('theme', 'light');
    }
  };

  useEffect(() => {
    const localTheme = SyncStorage.get('theme');

    if (localTheme) {
      setTheme(localTheme);
    } else {
      SyncStorage.set('theme', 'light');
    }
  }, [theme]);

  const toggle = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeToggleContext.Provider value={{toggleTheme}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={
          theme === 'dark' ? darkTheme.background : lightTheme.background
        }
      />
      <ThemeProvider theme={toggle}>{children}</ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};

export default ThemeProvider;

MyThemeProvider.propTypes = {
  /**
   * children element
   */
  children: PropTypes.node.isRequired,
};
