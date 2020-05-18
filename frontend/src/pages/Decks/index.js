import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import IconMi from 'react-native-vector-icons/MaterialIcons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionButton from 'react-native-action-button';
import {TouchableOpacity, Alert} from 'react-native';

import Typography from '~/components/Typography';
import Spacing from '~/components/Spacing';
import {withTheme} from 'styled-components';
import * as S from '~/styles/global';
import construct from "@babel/runtime/helpers/esm/construct";
const Text = Typography;

function Decks({navigation, ...props}) {

  const deckState = useSelector( state => state.deck.data)
  const [decks, setDeck] = useState(deckState);

  useEffect((e) => {
    setDeck(deckState)
  }, [deckState]);

  function deleteDeck() {
    Alert.alert(
      'Alerta',
      `Você tem certeza que quer excluir?`,
      [
        {
          text: 'Não',
          onPress: () => console.log('Excluir'),
          style: 'Cancelar',
        },
        {
          text: 'Sim',
          onPress: () => {},
        },
      ],
      {cancelable: true},
    );
  }

  return (
    <>
      <S.Container>
        <Spacing position="absolute" top="18" right="30">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <IconMi name="menu" size={25} color="#FFF" />
          </TouchableOpacity>
        </Spacing>
        <S.Margin />
        <S.List
          data={decks}
          numColumns={2}
          keyExtractor={(item) => String(item.Id)}
          renderItem={({item: deck}) => (
            <S.Container>
              <TouchableOpacity
                onPress={() => navigation.navigate('Card', { Deck : deck })}
                onLongPress={() => deleteDeck()}>
                <S.Box data={deck} heightFixed>

                  <S.Text weight="bold" size="16" maxHeight="60">
                    {deck.Name}
                  </S.Text>

                  <Spacing mt="4" position="absolute" bottom={20} left={20}>
                    <Text color="#656565" size="14">
                      Total cartões:{' '}
                      <Text color="#fe650e" weight="bold">
                        {deck.Cards.length}
                      </Text>
                    </Text>
                    <Spacing mb="4" />
                    {/*
                    <Text color="#656565" size="14">
                      A revisar:{' '}
                      <Text color="#f93b10" weight="bold">
                        50
                      </Text>
                    </Text>
                    */}
                  </Spacing>

                </S.Box>
              </TouchableOpacity>
            </S.Container>
          )}
        />
      </S.Container>

      <ActionButton buttonColor={props.theme.floatButton}>
        {/* <ActionButton.Item
          buttonColor="#333"
          title="Pomodoro"
          textContainerStyle={{
            height: 25,
          }}
          textStyle={{
            fontSize: 13,
          }}
          onPress={() => navigation.navigate('Pomodoro')}>
          <IconMc name="timer" size={30} color="#FFF" />
        </ActionButton.Item> */}

        <ActionButton.Item
          buttonColor="#333"
          title="Adicionar Cartão"
          textContainerStyle={{
            height: 25,
          }}
          textStyle={{
            fontSize: 13,
          }}
          onPress={() => navigation.navigate('AddCard')}
          >

          <IconMc name="cards-outline" size={30} color="#FFF" />
        </ActionButton.Item>

        <ActionButton.Item
          buttonColor="#333"
          title="Adicionar Baralho"
          textContainerStyle={{
            height: 25,
          }}
          textStyle={{
            fontSize: 13,
          }}

          onPress={() => navigation.navigate('AddDeck')}

          >
          <IconMc name="cards" size={30} color="#FFF" />
        </ActionButton.Item>

      </ActionButton>
    </>
  );
}

export default withTheme(Decks);
