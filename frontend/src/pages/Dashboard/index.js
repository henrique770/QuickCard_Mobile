import React from 'react';
import Background from '~/components/Background';
import {TouchableOpacity, View} from 'react-native';

import IconMi from 'react-native-vector-icons/MaterialIcons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, Title, List} from './styles';
import {DrawerActions} from 'react-navigation-drawer';

var gs = require('~/styles/global');
import * as S from '~/styles/utilities';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export default function Dashboard({navigation}) {
  return (
    <Background>
      <Container>
        <View style={gs.header_add}>
          <TouchableOpacity onPress={() => navigation.navigate('Annotation')}>
            <IconMc name="plus" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={gs.header}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <IconMi name="menu" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>

        <Title>Notas</Title>
        <List
          data={data}
          keyExtractor={item => String(item)}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('Annotation')}>
              <S.Box data={item}>
                <S.Title>QuickCard</S.Title>
                <S.Preview>
                  QuickCard é um software de estudo que tem como principais
                  caracteristicas
                </S.Preview>
                <S.Time>Primeiro Caderno</S.Time>
              </S.Box>
            </TouchableOpacity>
          )}
        />
      </Container>
    </Background>
  );
}
