import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import createRouter from './routes';
import { getInstancia } from '~/store/service/peerClient'

import { getInstanceSynchronizationService }  from './store/service/synchronizationService'
import { getDecks } from '~/store/modules/deck/actions'
import { getNotePads } from "~/store/modules/notepad/actions";

import { getInstanceNetInfoObserver , notificationsType } from './store/service/netInfoObserverService'

import {Alert} from "react-native";

const peerClient = getInstancia()

const netInfoObserver = getInstanceNetInfoObserver()
const synchronizationService = getInstanceSynchronizationService()

export default function App() {
  //const signed = true;
  const dispatch = useDispatch()
  const signed = useSelector(state => state.auth.signed);
  const profile = useSelector(state => state.auth.profile);

  let isConnected = false;

  if(signed) {
    netInfoObserver.start()
    synchronizationService.monitorPending()
    peerClient.connect(profile)

    peerClient.addEvent('@deck/POST' ,  async data => {
      await synchronizationService.addSourceModel(data)
      dispatch(getDecks())
    })

    peerClient.addEvent('@deck/PUT' , async data => {
      await synchronizationService.updateSourceModel(data)
      dispatch(getDecks())
    })

    peerClient.addEvent('@card/POST' , async data => {
      await synchronizationService.addSourceModel(data)
      dispatch(getDecks())
    })

    peerClient.addEvent('@card/PUT' ,  async data => {
      await synchronizationService.updateSourceModel(data)
      dispatch(getDecks())
    })

    peerClient.addEvent('@notepad/POST' ,  async data => {
      await synchronizationService.addSourceModel(data)
      dispatch(getNotePads())
    })

    peerClient.addEvent('@notepad/PUT' ,  async data => {
      await synchronizationService.updateSourceModel(data)
      dispatch(getNotePads())
    })

    peerClient.addEvent('@note/POST' ,  async data => {
      await synchronizationService.addSourceModel(data)
      dispatch(getNotePads())
    })

    peerClient.addEvent('@note/PUT' ,  async data => {
      await synchronizationService.updateSourceModel(data)
      dispatch(getNotePads())
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
