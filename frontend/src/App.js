import React from 'react';
import {useSelector} from 'react-redux';
import createRouter from './routes';

export default function App() {
  //const signed = true;
  const signed = useSelector(state => state.auth.signed);
  return createRouter(signed);
}
