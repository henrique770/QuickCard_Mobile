import React from 'react';

import Background from '~/components/Background';
import Typography from '~/components/Typography';
import Spacing from '~/components/Spacing';

import {TouchableOpacity, Alert} from 'react-native';

import IconMi from 'react-native-vector-icons/MaterialIcons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';

import {DrawerActions} from 'react-navigation-drawer';
import Swipeable from 'react-native-swipeable-row';

import * as S from '~/styles/global';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const Text = Typography;

export default function Dashboard({navigation}) {
  const leftContent = <Text>Pull to activate</Text>;

  const rightButtons = [
    <S.Box
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        borderRadius: 0,
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={() =>
          Alert.alert('Alerta', 'Você tem certeza que quer excluir?', [
            {
              text: 'Não',
              onPress: () => console.log('Excluir'),
              style: 'Cancelar',
            },
            {
              text: 'Sim',
              onPress: () => {},
            },
          ])
        }>
        <Text>
          <IconMi name="close" color="#fff" size={50} />
        </Text>
      </TouchableOpacity>
    </S.Box>,
  ];
  return (
    <Background>
      <S.Container>
        <Spacing position="absolute" right="90" top="30">
          <TouchableOpacity onPress={() => navigation.navigate('Notes')}>
            <IconMc name="plus" size={30} color="#FFF" />
          </TouchableOpacity>
        </Spacing>

        <Spacing position="absolute" right="30" top="30">
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <IconMi name="menu" size={30} color="#FFF" />
          </TouchableOpacity>
        </Spacing>

        <S.Title>Notas</S.Title>
        <S.List
          data={data}
          keyExtractor={item => String(item)}
          renderItem={({item}) => (
            <Swipeable
              autoClose={true}
              leftContent={leftContent}
              rightButtons={rightButtons}>
              <TouchableOpacity onPress={() => navigation.navigate('Notes')}>
                <S.Box data={item}>
                  <Text weight="bold" size="16">
                    QuickCard
                  </Text>
                  <Spacing mt="4" mb="4">
                    <Text size="14">
                      QuickCard é um software de estudo que tem como principais
                      caracteristicas
                    </Text>
                  </Spacing>
                  <Text color="#f93b10">Primeiro Caderno</Text>
                </S.Box>
              </TouchableOpacity>
            </Swipeable>
          )}
        />
      </S.Container>
    </Background>
  );
}
