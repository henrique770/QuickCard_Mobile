import {useState, useEffect} from 'react';

import SyncStorage from 'sync-storage';

const useDarkMode = () => {
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

  return [theme, toggleTheme];
};

export default useDarkMode;
