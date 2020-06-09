import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import createRouter from './routes';

export default function App() {
  const signed = true;
  useEffect(() => {}, []);

  //const signed = useSelector(state => state.auth.signed);
  return createRouter(signed);
}
