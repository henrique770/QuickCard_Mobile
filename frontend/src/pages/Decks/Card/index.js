import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Spacing from '~/components/Spacing';

import {TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

import FlipCard from 'react-native-flip-card';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import {FlipCardBox, ButtonContainer, Button} from './styles';
import * as S from '~/styles/global';

export default function Card({navigation}) {
  const [isShow, setIsShow] = useState(false);

  function showAnswer() {
    setIsShow(!isShow);
  }
  return (
    <>
      <S.Container align="center">
        <Spacing position="absolute" top="16" right="30">
          <TouchableOpacity onPress={() => navigation.navigate('EditCard')}>
            <IconMi name="settings" size={25} color="#FFF" />
          </TouchableOpacity>
        </Spacing>
        <S.Margin />
        <FlipCard
          flipHorizontal={true}
          flipVertical={false}
          flip={false}
          clickable={true}
          onFlipStart={() => {
            showAnswer();
          }}>
          <FlipCardBox>
            <S.Text
              width="260"
              size="30"
              textAlign="center"
              weight="bold"
              overflow="hidden"
              maxHeight="250">
              Oque é o elemento "Text View"?
            </S.Text>
          </FlipCardBox>

          <FlipCardBox>
            <S.Text
              width="260"
              size="30"
              textAlign="center"
              weight="bold"
              overflow="hidden"
              maxHeight="250">
              Um elemento da interface do usuário que é responsável por exibir
              textos
            </S.Text>
          </FlipCardBox>
        </FlipCard>
        {isShow && (
          <ButtonContainer mb="50">
            <Animatable.View
              animation="fadeInUp"
              easing="ease-out-circ"
              direction="alternate">
              <Button>
                <S.TextButton>Difícil</S.TextButton>
              </Button>
            </Animatable.View>
            <Animatable.View
              animation="fadeInUp"
              delay={30}
              easing="ease-out-circ"
              direction="normal">
              <Button>
                <S.TextButton>Bom</S.TextButton>
              </Button>
            </Animatable.View>
            <Animatable.View
              animation="fadeInUp"
              delay={60}
              easing="ease-out-circ"
              direction="alternate">
              <Button>
                <S.TextButton>Fácil</S.TextButton>
              </Button>
            </Animatable.View>
          </ButtonContainer>
        )}
      </S.Container>
    </>
  );
}

Card.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <TouchableOpacity
      style={{marginTop: 30}}
      onPress={() => {
        navigation.navigate('Decks');
      }}>
      <IconMi name="arrow-back" size={30} color="#fff" />
    </TouchableOpacity>
  ),
});

Card.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
