import React from 'react';

import { Container, Right, Title, Preview,} from './styles';

export default function BoxNotePad({ navigation }) {
  return (
  <Container>
    <Right>
      <Title onPress={() => navigation.navigate('Decks')}>Função javascript ocultar e mostrar elementos na tela</Title>
      <Preview>5 Notas</Preview>


    </Right>

  </Container>
  );
}
