import React, {useState, useEffect} from 'react';
import Background from '~/components/Background';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';
import {Container, Title, List} from './styles';
import * as S from '~/styles/utilities';
// import api from '~/services/api';

const data = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Dashboard({navigation}) {
  return (
    <Background>
      <Container>
        {/* add card */}
        <View style={styles.header_add_card}>
          <TouchableOpacity onPress={() => navigation.navigate('AddCard')}>
            <IconMc name="cards" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
        {/* add deck */}
        <View style={styles.header_add}>
          <TouchableOpacity onPress={() => navigation.navigate('AddDeck')}>
            <IconMc name="plus" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
        {/* menu */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <IconMi name="menu" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>

        <Title>Baralhos</Title>

        <List
          data={data}
          keyExtractor={item => String(item)}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('FlashCard')}>
              <S.Box data={item}>
                <S.Title>Expressões em inglês / frases / palavras</S.Title>
                <S.Preview>
                  Novos: <S.BlueText>20</S.BlueText>
                </S.Preview>
                <S.Preview>
                  A revisar: <S.RedText>50</S.RedText>
                </S.Preview>
              </S.Box>
            </TouchableOpacity>
          )}
        />
      </Container>
    </Background>
  );
}
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    right: 30,
    top: 30,
  },
  header_add: {
    position: 'absolute',
    right: 90,
    top: 30,
  },
  header_add_card: {
    position: 'absolute',
    left: 30,
    top: 30,
  },
});
