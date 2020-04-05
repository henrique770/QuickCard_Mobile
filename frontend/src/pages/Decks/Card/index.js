import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import Spacing from '~/components/Spacing';
import Typography from '~/components/Typography';

import {TouchableOpacity, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';

import FlipCard from 'react-native-flip-card';
import IconMi from 'react-native-vector-icons/MaterialIcons';

import {FlipCardBox, Button} from './styles';
import * as S from '~/styles/global';

const Text = Typography;

export default function Card({navigation, route}) {
  const {name, card} = route.params;
  const [isShow, setIsShow] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(true);
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    function changeTitle() {
      navigation.setOptions({title: `${name}`});
    }
    changeTitle();
  });

  function showAnswer() {
    setIsShow(!isShow);
  }

  function nextCard() {
    if (cardIndex + 1 < card.length) {
      setCardIndex(cardIndex + 1);
    }
    // if (cardIndex + 1 >= card.length) {
    //   setCardsVisible(false);
    // }
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
        {cardsVisible && (
          <FlipCard
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={true}
            onFlipStart={() => {
              showAnswer();
            }}>
            <FlipCardBox>
              <ScrollView
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
                <S.Text
                  width="260"
                  size="30"
                  textAlign="center"
                  weight="bold"
                  overflow="hidden">
                  {card[cardIndex].front}
                </S.Text>
              </ScrollView>
            </FlipCardBox>

            <FlipCardBox>
              <ScrollView
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
                <S.Text
                  width="260"
                  size="30"
                  textAlign="center"
                  weight="bold"
                  overflow="hidden">
                  {card[cardIndex].verse}
                </S.Text>
              </ScrollView>
            </FlipCardBox>
          </FlipCard>
        )}

        {isShow && (
          <S.ButtonContainer mb="50">
            <Animatable.View
              animation="fadeInUp"
              easing="ease-out-circ"
              direction="alternate">
              <Button onPress={() => nextCard()}>
                <Text size={17} color="#fe650e">
                  Difícil
                </Text>
                {`\n`}
                <Text size={10} weight="bold">
                  <IconMi
                    name="keyboard-arrow-right"
                    color="#fe650e"
                    size={10}
                  />{' '}
                  10min
                </Text>
              </Button>
            </Animatable.View>
            <Animatable.View
              animation="fadeInUp"
              delay={30}
              easing="ease-out-circ"
              direction="normal">
              <Button onPress={() => nextCard()}>
                <Text size={17} color="#fe650e">
                  Bom
                </Text>
                {`\n`}
                <Text size={10} weight="bold">
                  <IconMi
                    name="keyboard-arrow-right"
                    color="#fe650e"
                    size={10}
                  />{' '}
                  1d
                </Text>
              </Button>
            </Animatable.View>
            <Animatable.View
              animation="fadeInUp"
              delay={60}
              easing="ease-out-circ"
              direction="alternate">
              <Button onPress={() => nextCard()}>
                <Text size={17} color="#fe650e">
                  Fácil
                </Text>
                {`\n`}
                <Text size={10} weight="bold">
                  <IconMi
                    name="keyboard-arrow-right"
                    color="#fe650e"
                    size={10}
                  />{' '}
                  2d
                </Text>
              </Button>
            </Animatable.View>
          </S.ButtonContainer>
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
