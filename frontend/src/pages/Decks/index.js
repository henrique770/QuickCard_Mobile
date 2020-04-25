import React, {useState, useEffect} from 'react';

import Typography from '~/components/Typography';
import Spacing from '~/components/Spacing';

import IconMi from 'react-native-vector-icons/MaterialIcons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionButton from 'react-native-action-button';
import {TouchableOpacity, Alert} from 'react-native';

import {withTheme} from 'styled-components';

import * as S from '~/styles/global';

import {ServiceProxy , typeService } from '~/store/service/index'

const Text = Typography;

function Decks({navigation, ...props}) {

  const [decks, setDeck] = useState([]);

  useEffect(() => {

    const serviceProxy = new ServiceProxy(typeService.Deck)

    serviceProxy.all()
      .then( e => {

        setDeck(e)
      })
      .catch( e => {

        console.log('error', e)
      })

    /*
    repositorio.all()
      .then( d => {
        setDeck(d)
      })
      .catch( r => {
        console.log( 'Erro', r)
      })
    */
  }, []);


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
                onPress={() => navigation.navigate('Card', {...deck})}
                onLongPress={() => deleteDeck()}>
                <S.Box data={deck} heightFixed>

                  <S.Text weight="bold" size="16" maxHeight="60">
                    {deck.Name}
                  </S.Text>

                  <Spacing mt="4" position="absolute" bottom={20} left={20}>
                    <Text color="#656565" size="14">
                      Novos:{' '}
                      <Text color="#fe650e" weight="bold">
                        20
                      </Text>
                    </Text>
                    <Spacing mb="4" />
                    <Text color="#656565" size="14">
                      A revisar:{' '}
                      <Text color="#f93b10" weight="bold">
                        50
                      </Text>
                    </Text>
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
          //onPress={() => navigation.navigate('AddCard', data.map( e => {
           // return { _id : e._id , name : e.name }
          //}))}
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
          //onPress={() => navigation.navigate('AddDeck' , data.map( e => { e._id , e.name}) )}
          >
          <IconMc name="cards" size={30} color="#FFF" />
        </ActionButton.Item>

      </ActionButton>
    </>
  );
}

export default withTheme(Decks);
