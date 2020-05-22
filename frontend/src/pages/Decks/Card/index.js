import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

import Spacing from '~/components/Spacing';
import Typography from '~/components/Typography';

import {TouchableOpacity, ScrollView, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

import FlipCard from 'react-native-flip-card';
import IconMi from 'react-native-vector-icons/MaterialIcons';

import {FlipCardBox, Button, EndButton, ContainerFlashCard} from './styles';
import * as S from '~/styles/global';
import successAnimation from '~/assets/animation-success.json';
import Lottie from 'lottie-react-native';

import { updateCard } from '~/store/modules/deck/actions'

const Text = Typography

const typesOfHits = {
  difficult : 1
  , easy : 2
  , good : 3
}

export default function Card({navigation, route}) {

  const { Deck } = route.params;
  //const Deck = useSelector( state => state.deck.data.find( deck => deck.Id == Id ))
  const Card = {}
  const dispatch = useDispatch();
  const [cardIndex, setCardIndex] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [endQuiz, setEndQuiz] = useState(false);
  const [cardData, setCardData] = useState(Card);

  useEffect(() => {
    navigation.setOptions({title: `${Deck.Name}`});
    getNextCard()

    if(Card)
    {
      setCardsVisible(true)
      console.log('Card info: ', cardData)
    }
  } , []);

  //#region UI LOGIC

  function showAnswer() {
    setIsShow(!isShow);
  }

  function nextCard(hitType) {
    setHitCard(hitType)
    getNextCard()
  }

  function setHitCard(hitType) {
    switch (hitType) {
      case typesOfHits.easy :

        cardData.hitEasy()
        break

      case typesOfHits.good :

        cardData.hitGood()
        break

      case typesOfHits.difficult :

        cardData.hitDifficult()
        break

      default :
        throw 'hit type not defined'
    }

    update(cardData)
  }

  function getNextCard() {

    if(Deck.isEmpty())
    {
      return
    }

    let card = Deck.getDeckRandom()

    card.DateLastView = new Date()

    card.Deck = {
      Id : Deck.Id
    }

    console.log('Card info: ', card)
    setCardData(card)
    //update(card)
  }

  function update(card) {
    console.log('update card' , card)
    dispatch(updateCard({ card }))
  }

  //#endregion

  //#region UI COMPONENTS

  function renderBodyCard() {
    return ( <>
      { cardsVisible && (
          <FlipCard
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={true}
            onFlipStart={() => {
            showAnswer();
          }}>
            {/* CARD FRONT */}
            { renderCard('Frente' , cardData.Front ) }
            {/* CARD VERSE */}
            { renderCard('Verso' , cardData.Verse ) }
          </FlipCard>
      )}
      </>
    )
  }

  function renderCard(strDescription, strCard) {
    return ( <>
      <ContainerFlashCard>
        <Spacing mt={10} />
        <FlipCardBox>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
            }}>
            <Spacing position="absolute" top="10">
              <Text color="#fe650e" weight="bold">
                { strDescription }
              </Text>
            </Spacing>
            <S.Text
              width="260"
              size="30"
              textAlign="center"
              weight="bold"
              overflow="hidden">
                { strCard }
            </S.Text>
          </ScrollView>
        </FlipCardBox>
      </ContainerFlashCard>
    </>)
  }

  function renderButtons() {
      return ( <>
        {isShow && (
          <S.ButtonContainer mb="50">
            <Animatable.View
              animation="fadeInUp"
              easing="ease-out-circ"
              direction="alternate">
              <Button onPress={() => nextCard(typesOfHits.difficult)}>
                <Text size={17} color="#fe650e">
                  Difícil
                </Text>
                {`\n`}
                <S.Text size={10} weight="bold">
                  <IconMi
                    name="keyboard-arrow-right"
                    color="#fe650e"
                    size={10}
                  />{' '}
                  10min
                </S.Text>
              </Button>
            </Animatable.View>
            <Animatable.View
              animation="fadeInUp"
              delay={30}
              easing="ease-out-circ"
              direction="normal">
              <Button onPress={() => nextCard(typesOfHits.good)}>
                <Text size={17} color="#fe650e">
                  Bom
                </Text>
                {`\n`}
                <S.Text size={10} weight="bold">
                  <IconMi
                    name="keyboard-arrow-right"
                    color="#fe650e"
                    size={10}
                  />{' '}
                  1d
                </S.Text>
              </Button>
            </Animatable.View>
            <Animatable.View
              animation="fadeInUp"
              delay={60}
              easing="ease-out-circ"
              direction="alternate">
              <Button onPress={() => nextCard(typesOfHits.easy)}>
                <Text size={17} color="#fe650e">
                  Fácil
                </Text>
                {`\n`}
                <S.Text size={10} weight="bold">
                  <IconMi
                    name="keyboard-arrow-right"
                    color="#fe650e"
                    size={10}
                  />{' '}
                  2d
                </S.Text>
              </Button>
            </Animatable.View>
          </S.ButtonContainer>
        )}
      </>)
  }

  function renderDeckEmpty() {
    return ( <>
      <Text>Deck vazio</Text>
    </>)
  }

  function  renderEndQuiz() {
    return ( <>
      {endQuiz && (
        <S.StyledContainer>
          <Lottie style={{bottom: 190}} source={successAnimation} autoPlay />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Spacing mt={100} mb={30}>
              <S.Text size={25} weight="bold" width={300} textAlign="center">
                Parabéns!! você terminou de responder o baralho
              </S.Text>
            </Spacing>
            <EndButton onPress={() => navigation.navigate('Decks')}>
              <Text size={18} weight="bold" color="#fff" textAlign="center">
                Voltar para página inicial
              </Text>
            </EndButton>
          </View>
        </S.StyledContainer>
      )}
    </>)
  }

  function renderBody() {
    return ( <>
      { renderBodyCard() }

      { renderButtons() }

      { renderEndQuiz() }
    </>)
  }

  //#endregion

  return (
    <>
      <S.Container align={endQuiz ? `` : 'center'}>
        <Spacing position="absolute" top="16" right="30">
          <TouchableOpacity onPress={() => navigation.navigate('EditCard')}>
            {!endQuiz && !Deck.isEmpty() && <IconMi name="settings" size={25} color="#FFF" />}
          </TouchableOpacity>
        </Spacing>
        <S.Margin />

        { Deck.isEmpty() && (
          renderDeckEmpty()
        )}

        { !Deck.isEmpty() && (
            renderBody()
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
