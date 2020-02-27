import React from 'react';

import {Container, Right, Title, Info, Preview, Time} from './styles';

export default function Notes({navigation}) {
  return (
    <Container>
      <Right>
        <Info>
          <Title>QuickCard</Title>
          <Preview>
            QuickCard é um software de estudo que tem como principais
            caracteristicas
          </Preview>
          <Time>Primeiro Caderno</Time>
        </Info>
      </Right>
    </Container>
  );
}
