import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import createRouter from './routes';
import { getInstancia } from './services/peerClient'

import synchronizationService from './store/service/synchronizationService'
import { updateDeck , getDecks } from '~/store/modules/deck/actions'

import {Alert} from "react-native";
const peerClient = getInstancia()

export default function App() {
  //const signed = true;
  const dispatch = useDispatch()
  const signed = useSelector(state => state.auth.signed);
  const profile = useSelector(state => state.auth.profile);

  let isConnected = false;

  if(signed) {
    peerClient.connect(profile)

    peerClient.addEvent('@deck/POST' ,  async data => {

      await synchronizationService.addSourceModel(data)
      dispatch(getDecks())
    })

    peerClient.addEvent('@deck/PUT' , data => {
      console.log('update card', data)
      Alert.alert('' , 'deck atualizado via api')
    })

    peerClient.addEvent('@card/POST' , data => {
      console.log('update card', data)
      Alert.alert('' , 'Cartão add via api')
    })

    peerClient.addEvent('@card/PUT' , data => {
      console.log('update card', data)
      Alert.alert('' , 'Cartão atualizado via api')
    })

  }

  useEffect(() => {
  }, []);

  NetInfo.fetch().then(state => {
    isConnected = state.isConnected;
  });

  //const signed = useSelector(state => state.auth.signed);
  return createRouter(signed, isConnected );
}
