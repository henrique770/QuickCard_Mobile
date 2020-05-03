import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import createRouter from './routes';
import { getDecks } from '~/store/modules/deck/actions'

export default function App() {
  const signed = true;
  const dispatch = useDispatch();

  useEffect(() => {

    if(signed)
    {
      dispatch(getDecks())
    }
  } , [])

  //const signed = useSelector(state => state.auth.signed);
  return createRouter(signed);
}
