import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

import createRouter from './routes';

export default function App() {
  const signed = true;
  //const signed = useSelector(state => state.auth.signed);
  let isConnected = false;

  useEffect(() => {}, []);

  NetInfo.fetch().then(state => {
    isConnected = state.isConnected;
  });

  //const signed = useSelector(state => state.auth.signed);
  return createRouter(signed, isConnected );
}
