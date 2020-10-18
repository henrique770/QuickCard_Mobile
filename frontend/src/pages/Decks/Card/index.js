import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

import Spacing from '~/components/Spacing';
import Typography from '~/components/Typography';

import {TouchableOpacity, ScrollView, View, Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';

import FlipCard from 'react-native-flip-card';
import IconMi from 'react-native-vector-icons/MaterialIcons';

import {FlipCardBox, Button, EndButton, ContainerFlashCard} from './styles';
import * as S from '~/styles/global';
import successAnimation from '~/assets/animation-success.json';
import atentionAnimation from '~/assets/testanimation.json';

import Lottie from 'lottie-react-native';

import {updateCard, updateDeck} from '~/store/modules/deck/actions';

import { Card as CardConstants, Messenger } from '~constants/ConstantsBusiness'

const Text = Typography;

const typesOfHits = {
  difficult: CardConstants.codDifficult,
  easy: CardConstants.codEasy,
  good: CardConstants.codGood,
};

export default function Card({navigation, route}) {
  const {Deck} = route.params;
  const Card = {};


  const dispatch = useDispatch();
  const [cardIndex, setCardIndex] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [endQuiz, setEndQuiz] = useState(Deck.checkRevisedDeck());
  const [isCardNotViewing, setIsCardNotViewing] = useState(false);
  const [cardData, setCardData] = useState(Card);

  //console.log('route params ', route.params);

  useEffect(() => {
    navigation.setOptions({title: `${Deck.Name}`});

    getNextCard();

    if (Card) {
      setCardsVisible(true);
      console.log('Card info: ', cardData);
    }
  }, []);

  //#region UI LOGIC

  function showAnswer() {
    setIsShow(!isShow);
  }

  function resetViewCard() {
    if (isShow) setIsShow(false);
  }

  function navigationToEditCard() {
    resetViewCard();
    navigation.navigate('EditCard', {Card: cardData});
  }

  function nextCard(hitType) {
    setHitCard(hitType);
    getNextCard();
  }

  function setHitCard(hitType) {
    switch (hitType) {
      case typesOfHits.easy:
        cardData.hitEasy();
        break;

      case typesOfHits.good:
        cardData.hitGood();
        break;

      case typesOfHits.difficult:
        cardData.hitDifficult();
        break;

      default:
        throw 'hit type not defined';
    }

    update(cardData);
  }

  function getNextCard() {

    if (Deck.checkRevisedDeck()) {
      setEndQuiz(true);
      return;
    }

    if (Deck.isEmpty()) {
      return;
    }

    if(Deck.isNextVisibleCard()) {
      setIsCardNotViewing(true)
      return;
    }

    setIsCardNotViewing(Deck.isNextVisibleCard())

    if(!isCardNotViewing) {
      let card = Deck.getNextCard();
      setCardData(card);
    }
  }

  function reviewDeck() {
    Deck.reviewCards();
    update(Deck.Cards);
    getNextCard()
  }

  function update(card) {
    let setIdDeck = card => {
      card.IdDeck = Deck.Id;
    };

    if (Array.isArray(card)) {
      for (let i = 0; i < card.length; i += 1) {
        setIdDeck(card[i]);
      }
    } else {
      setIdDeck(card);
    }

    dispatch(updateCard({card}));

    getNextCard();
    setIsShow(false);
    setEndQuiz(false);
  }

  //#endregion

  //#region UI COMPONENTS

  function renderBodyCard() {
    return (
      <>
        {cardsVisible && (
          <FlipCard
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={true}
            onFlipStart={() => {
              showAnswer();
            }}>
            {/* CARD FRONT */}
            {renderCard('Frente', cardData.Front)}
            {/* CARD VERSE */}
            {renderCard('Verso', cardData.Verse)}
          </FlipCard>
        )}
      </>
    );
  }

  function renderCard(strDescription, strCard) {
    return (
      <>
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
                  {strDescription}
                </Text>
              </Spacing>
              <S.Text
                width="260"
                size="30"
                textAlign="center"
                weight="bold"
                overflow="hidden">
                {strCard}
              </S.Text>
            </ScrollView>
          </FlipCardBox>
        </ContainerFlashCard>
      </>
    );
  }

  function renderButtons(card) {
    return (
      <>
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
                  {cardData.getTimeHitDifficult()}
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
                  {cardData.getTimeHitGood()}
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
                  {cardData.getTimeHitEasy()}
                </S.Text>
              </Button>
            </Animatable.View>
          </S.ButtonContainer>
        )}
      </>
    );
  }

  function renderDeckEmpty() {
    return (
      <>
        <S.StyledContainer>
          <Lottie style={{bottom: 190}} source={atentionAnimation} autoPlay />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Spacing mt={80} mb={30}>
              <S.Text size={25} weight="bold" width={300} textAlign="center">
                Baralho não possui nenhum cartão registrado!
              </S.Text>
            </Spacing>
            {endButton('Adicionar Cartões', () =>
              navigation.navigate('AddCard'),
            )}
          </View>
        </S.StyledContainer>
      </>
    );
  }

  function renderEndQuizOrCardNotViewing(text) {
    return (
      <>
        {
          <S.StyledContainer>
            <Lottie style={{bottom: 190}} source={successAnimation} autoPlay />
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Spacing mt={100} mb={30}>
                <S.Text size={25} weight="bold" width={300} textAlign="center">
                 {text}
                </S.Text>
              </Spacing>

              {endButton('Voltar para página inicial', () =>
                navigation.navigate('Decks'),
              )}

              {endButton('Revisar novamente o baralho', () => reviewDeck())}
            </View>
          </S.StyledContainer>
        } 
      </>
    );
  }
  

  function endButton(text, onPress) {
    return (
      <>
        <Spacing mb={20} mr={10} ml={10}>
          <EndButton onPress={onPress}>
            <Text size={18} weight="bold" color="#fff" textAlign="center">
              {text}
            </Text>
          </EndButton>
        </Spacing>
      </>
    );
  }

  function renderBody() {
    return (
      <>
        {renderBodyCard()}

        {renderButtons()}
      </>
    );
  }

  //#endregion


  function renderComponent() {
    // deck empty
    if(Deck.isEmpty()) {
      
      return renderDeckEmpty()
    } 
    // deck in card not view
    else if(isCardNotViewing) {
      let text = 'Nenhum cartão para revisar no momento'
      return renderEndQuizOrCardNotViewing(text)
    }
    // deck review cards
    else if(endQuiz) {
      let text = 'Parabéns!! você terminou de responder o baralho'
      return renderEndQuizOrCardNotViewing(text)
    } 
    else {

      return renderBody()
    }
  }

  return (
    <>
      <S.Container align={endQuiz || Deck.isEmpty() ? `` : 'center'}>
        <Spacing position="absolute" top="16" right="30">
          <TouchableOpacity onPress={() => navigationToEditCard()}>
            {!endQuiz && !Deck.isEmpty() && (
              <IconMi name="settings" size={25} color="#FFF" />
            )}
          </TouchableOpacity>
        </Spacing>
        <S.Margin />

        { renderComponent() }

        {/* Deck.isEmpty() && renderDeckEmpty() 

        {!endQuiz && !Deck.isEmpty() && renderBody()}

        {endQuiz && !Deck.isEmpty() && renderEndQuiz()}

        */}
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
