import React from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import {TouchableOpacity, View} from 'react-native';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import {DrawerActions} from 'react-navigation-drawer';
import {Container, Title, List} from './styles';

var gs = require('~/styles/global');
import * as S from '~/styles/utilities';

const data = [1, 2, 3, 4, 5, 6, 7, 8];

export default function NotePads({navigation}) {
  return (
    <Background>
      <Container>
        <View style={gs.header}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <IconMi name="menu" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Title>Blocos de anotações</Title>
        <List
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
              onPress={() => navigation.navigate('Dashboard')}>
              <S.Box data={item}>
                <S.Title>
                  Função javascript ocultar e mostrar elementos na tela
                </S.Title>
                <S.Preview>5 Notas</S.Preview>
              </S.Box>
            </TouchableOpacity>
          )}
        />
      </Container>
    </Background>
  );
}
