import React, {useState, useEffect} from 'react';

import Typography from '~/components/Typography';
import Spacing from '~/components/Spacing';
import {Overlay} from 'react-native-elements';

import IconMi from 'react-native-vector-icons/MaterialIcons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionButton from 'react-native-action-button';
import {TouchableOpacity, Alert} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';
import {withTheme} from 'styled-components';

import * as S from '~/styles/global';
// import api from '~/services/api';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const Text = Typography;

function Decks({navigation, ...props}) {
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
        <Spacing position="absolute" top="30" right="30">
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <IconMi name="menu" size={30} color="#FFF" />
          </TouchableOpacity>
        </Spacing>

        <S.Title>Baralhos</S.Title>

        <S.List
          data={data}
          numColumns={2}
          keyExtractor={item => String(item)}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                elevation: 5,
                width: 136,
                flex: 1,
                marginRight: 7,
                marginLeft: 7,
              }}
              onPress={() => navigation.navigate('Card')}
              onLongPress={() => deleteDeck()}>
              <S.Box data={item}>
                <S.Text weight="bold" size="16" maxHeight="80">
                  Bash e terminal linux / lista de comandos
                </S.Text>
                <Spacing mt="4" />
                <Text color="#656565" size="14">
                  Novos:{' '}
                  <Text color="#0654e5" weight="bold">
                    20
                  </Text>
                </Text>
                <Spacing mb="4" />
                <Text color="#656565" size="14">
                  A revisar:{' '}
                  <Text color="#ff0039" weight="bold">
                    50
                  </Text>
                </Text>
              </S.Box>
            </TouchableOpacity>
          )}
        />
      </S.Container>

      <ActionButton buttonColor={props.theme.floatButton}>
        <ActionButton.Item
          buttonColor="#333"
          title="Adicionar Cartão"
          textContainerStyle={{
            height: 25,
          }}
          textStyle={{
            fontSize: 13,
          }}
          onPress={() => navigation.navigate('AddCard')}>
          <IconMc name="cards-outline" size={30} color="#FFF" />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#333"
          title="Adicionar Baralho"
          textContainerStyle={{
            height: 25,
            // backgroundColor: '#000',
          }}
          textStyle={{
            fontSize: 13,
            // color: '#fff',
          }}
          onPress={() => navigation.navigate('AddDeck')}>
          <IconMc name="cards" size={30} color="#FFF" />
        </ActionButton.Item>
      </ActionButton>
    </>
  );
}

export default withTheme(Decks);
