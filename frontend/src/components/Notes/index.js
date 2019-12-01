import React from 'react';

import { Container, Right, Title, Info, Preview, Time } from './styles';
import { TouchableOpacity } from 'react-native';
export default function Notes({ navigation }) {
  return (
  <Container>
    <Right>
    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
      <Info>
      <Title>QuickCard</Title>
      <Preview>QuickCard é um software de estudo que tem como principais caracteristicas</Preview>
      <Time>Primeiro Caderno</Time>
    </Info>
   </TouchableOpacity>
    </Right>

  </Container>
  );
}
