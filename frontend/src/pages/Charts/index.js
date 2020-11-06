import React, {useRef, useState, useEffect}  from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Picker, TouchableOpacity} from 'react-native';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import {PieChart} from 'react-native-svg-charts';
import {Text} from 'react-native-svg';
import Spacing from '~/components/Spacing';
import Empty from '~/components/Empty';
import * as S from '~/styles/global';
import {Title, Text as TextStyle, Separator, Form, SelectContainer} from './styles';
import { Card as CardConstatnts } from '~constants/ConstantsBusiness'

const calculatePercentage = (total, perc) => ((perc * 100 ) / total).toFixed(1)

export default function Charts({navigation}) {
  
  const decks = useSelector(state => state.deck.data);
  const defaultValueData = [0, 0, 0, 0]

  const [deckSelected, setDeckSelected] = useState('');
  const [data, setData] = useState([50, 10, 20])
  const [cards, setCards] = useState(defaultValueData)

  const [totalAccountant, setTotalAccountant] = useState(0)
  const [CardsUnanswered, setCardsUnanswered] = useState(0)
  const [cardsGoodCount, setCardsGoodCount] = useState(0)
  const [cardsEasyCount, setCardsEasyCount] = useState(0)
  const [cardsDifficult, setCardsDifficult] = useState(0)

  const colors = [ '#006400' ,'#969A24', '#FF0000' ]

  const pieData = data.map((value, index) => ({
    value,
    key: `${index}-${value}`,
    svg: {
      fill: colors[index]
    },
  }));
  

  const Label = ({slices}) => {
    return slices.map((slice, index) => {
      const {pieCentroid, data} = slice;
      return (
        <Text
          key={`label-${index}`}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill="#fff"
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={16}>
          {data.value}%
        </Text>
      );
    });
  };


  function renderOptionsDeck() {
 
    let itens = [...decks.map(deck => <Picker.Item value={deck.Id} label={deck.Name} />)]
    itens.push(<Picker.Item value='' label='Selecione um baralho' />);

    return itens
  }

  function loadCards(idDeck) {
    setDeckSelected(idDeck);

    let deck = decks.find( e => e.Id === idDeck) 

    if(deck && deck.totalCards() > 0) {

      setCards(deck.Cards)
      //, cardsUnanswered = cards.map( c => c.CodEnumHit === CardConstatnts.codDefault).reduce((total, number) => { return total + number } , 0)

      let cardsGoodCount = deck.totalCardsGood()
      , cardsEasyCount = deck.totalCardsEasy()
      , cardsDifficult = deck.totalCardsDifficult()
      , cardsUnanswered = deck.totalCardsReviewMoment() 
      , total = deck.totalCards()

      const castNan = (value) => isNaN(value) ? 0 : value
     
      console.log('count total', total)
      console.log('count sem resposta', castNan(cardsUnanswered))
      console.log('count cardsGoodCount', castNan(cardsGoodCount))
      console.log('count cardsEasyCount', castNan(cardsEasyCount))
      console.log('count cardsDifficult', castNan(cardsDifficult))

      setTotalAccountant(total)
      setCardsUnanswered(cardsUnanswered)
      setCardsGoodCount(cardsGoodCount)
      setCardsEasyCount(cardsEasyCount)
      setCardsDifficult(cardsDifficult)
      setData([
        calculatePercentage(total, cardsGoodCount)
        , calculatePercentage(total, cardsEasyCount)
        , calculatePercentage(total, cardsDifficult)
        //, calculatePercentage(total, cardsUnanswered)
      ])
    } else {

      setData(defaultValueData)
    }
  }
  //style={{color: 'rgba(0, 0, 0, 0.8)'}

  function renderDeckLabels() {
    return (<>
       <TextStyle><TextStyle style={{color: colors[1]}}>'Fácil':</TextStyle> {cardsEasyCount} ({calculatePercentage(totalAccountant, cardsEasyCount)}%)</TextStyle>
       <TextStyle><TextStyle style={{color: colors[0]}}>'Bom':</TextStyle> {cardsGoodCount} ({calculatePercentage(totalAccountant, cardsGoodCount)}%)</TextStyle>
       <TextStyle><TextStyle style={{color: colors[2]}}>'Difícil':</TextStyle> {cardsDifficult} ({calculatePercentage(totalAccountant, cardsDifficult)}%)</TextStyle>
       <TextStyle><TextStyle style={{color: colors[3]}}>'Disponível':</TextStyle> {CardsUnanswered} ({calculatePercentage(totalAccountant, CardsUnanswered)}%)</TextStyle>

    </>)
  }

  function renderDeckPicker() {
    return (
      <>
        <SelectContainer>
          <Picker
            name="idDeck"
            selectedValue={deckSelected}
            style={{
              height: 50,
              width: '100%',
              color: 'rgba(0, 0, 0, 0.8)',
            }}
            onValueChange={(itemValue, itemIndex) => {
              loadCards(itemValue)
              console.log('Item value : ', deckSelected);
            }}>
            {renderOptionsDeck()}
          </Picker>
        </SelectContainer>
      </>
    );
  }

  return (
    <>

      <S.Container>

        <Spacing position="absolute" top="18" right="30">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <IconMi name="menu" size={25} color="#fff" />
          </TouchableOpacity>
        </Spacing>

        <S.Margin />
        <S.StyledContainer
          style={{padding: 30}}>
           
          { renderDeckPicker() }

          { deckSelected === '' && <Empty /> }

          { deckSelected !== '' && renderDeckLabels()}

          { deckSelected !== '' && 
            <PieChart style={{height: 400}} data={pieData}>
              <Label>{data.value}</Label>
            </PieChart>
          }
        </S.StyledContainer>

       
      </S.Container>
    </>
  );
}
