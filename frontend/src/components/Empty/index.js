import React from 'react';
import {View} from 'react-native';
import Spacing from '~/components/Spacing';
import atentionAnimation from '~/assets/testanimation.json';
import Lottie from 'lottie-react-native';

import * as S from '~/styles/global';

export default function Empty() {
  return (
    <S.StyledContainer>
      <Lottie style={{bottom: 190}} source={atentionAnimation} autoPlay />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Spacing mt={80} mb={30}>
          <S.Text size={25} weight="bold" width={300} textAlign="center">
            Ops! No momento, não temos dados para mostrar.
          </S.Text>
        </Spacing>
      </View>
    </S.StyledContainer>
  );
}
