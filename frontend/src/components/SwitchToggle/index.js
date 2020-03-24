import React, {useState} from 'react';
import {View, Switch} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {toogleDark} from '~/store/modules/auth/actions';

export default function SwitchToggle() {
  const dispatch = useDispatch();
  const darkmode = useSelector(state => state.auth.darkmode);
  function DarkModeOn() {
    dispatch(toogleDark());
  }
  function DarkModeOff() {}

  return (
    <Switch
      thumbColor="#424242"
      trackColor="#292929"
      value={() => {}}
      onValueChange={() => {}}
    />
  );
}
