import React from 'react';

import { Container, Right, Title, Preview, BlueText, RedText  } from './styles';

export default function BoxDeck({ navigation }) {
  return (
  <Container>
    <Right>
      <Title>Expressões em inglês / frases / palavras</Title>
      <Preview>Novos: <BlueText>20</BlueText></Preview>
      <Preview>A revisar: <RedText>50</RedText></Preview>

    </Right>

  </Container>
  );
}
