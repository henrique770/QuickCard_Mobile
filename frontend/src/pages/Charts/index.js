import React, {useRef, useState, useEffect}  from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Picker, TouchableOpacity} from 'react-native';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import {PieChart} from 'react-native-svg-charts';
import {Text} from 'react-native-svg';
import Spacing from '~/components/Spacing';

import * as S from '~/styles/global';
import {Title, Separator, Form, SelectContainer} from './styles';

export default function Charts({navigation}) {
  
  const decks = useSelector(state => state.deck.data);
  const defaultValueData = [0, 0, 0, 0]

  const [deckSelected, setDeckSelected] = useState('');
  const [data, setData] = useState([50, 10, 20])
  const [cards, setCards] = useState(defaultValueData)

  const [totalAccountant, setTotalAccountant] = useState(0)
  const [cardsGoodCount, setCardsGoodCount] = useState(0)
  const [cardsEasyCount, setCardsEasyCount] = useState(0)
  const [cardsDifficult, setCardsDifficult] = useState(0)


  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7,
    );

  const pieData = data.map((value, index) => ({
    value,
    key: `${index}-${value}`,
    svg: {
      fill: '#000'//randomColor(),
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

    console.log('deck', deck)

    if(deck && deck.Cards.length > 0) {

      setCards(deck.Cards)
      //console.log('cards', cards)

      let cardsGoodCount = cards.map( c => c.NumGoodCount ).reduce((total, number) => { return total + number } , 0)
      , cardsEasyCount = cards.map( c => c.NumEasyCount ).reduce((total, number) => { return total + number } , 0)
      , cardsDifficult = cards.map( c => c.NumDifficultCount ).reduce((total, number) => { return total + number } , 0)
      , total = deck.Cards.length

      const castNan = (value) => isNaN(value) ? 0 : value
    
      console.log('count total', total)
      console.log('count cardsGoodCount', castNan(cardsGoodCount))
      console.log('count cardsEasyCount', castNan(cardsEasyCount))
      console.log('count cardsDifficult', castNan(cardsDifficult))

      setTotalAccountant(total)
      setCardsGoodCount(cardsGoodCount)
      setCardsEasyCount(cardsEasyCount)
      setCardsDifficult(cardsDifficult)

      setData([total, cardsGoodCount, cardsEasyCount, cardsDifficult])

    } else {

      setData(defaultValueData)
    }
  }

  function renderDeckLabels() {
    return (<>
       <Text color="#656565" size="15">Teste</Text>
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
          style={{flex: 1, justifyContent: 'center', padding: 30}}>

          { renderDeckPicker() }

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
