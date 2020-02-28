import React from 'react';
import Background from '~/components/Background';
import Box from '~/components/Box';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconF from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container, Title, List} from './styles';
import {DrawerActions} from 'react-navigation-drawer';

import * as S from '~/styles/utilities';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export default function Dashboard({navigation}) {
  return (
    <Background>
      <Container>
        <View style={styles.header_add}>
          <TouchableOpacity onPress={() => navigation.navigate('Annotation')}>
            <IconF name="plus" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon name="menu" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>

        <Title>Notas</Title>
        <List
          data={data}
          keyExtractor={item => String(item)}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('Annotation')}>
              <Box data={item}>
                <S.Title>QuickCard</S.Title>
                <S.Preview>
                  QuickCard é um software de estudo que tem como principais
                  caracteristicas
                </S.Preview>
                <S.Time>Primeiro Caderno</S.Time>
              </Box>
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
});
