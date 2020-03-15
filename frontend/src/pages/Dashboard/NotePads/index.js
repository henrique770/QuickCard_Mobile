import React from 'react';
import Typography from '~/components/Typography';
import Spacing from '~/components/Spacing';

import {TouchableOpacity, Alert} from 'react-native';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import {DrawerActions} from 'react-navigation-drawer';

import * as S from '~/styles/global';

const data = [1, 2, 3, 4, 5, 6, 7, 8];
const Text = Typography;

export default function NotePads({navigation}) {
  function deleteNotePad() {
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
        <S.Title>Cadernos</S.Title>
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
              onPress={() => navigation.navigate('Dashboard')}
              onLongPress={() => deleteNotePad()}>
              <S.Box data={item}>
                <S.Text weight="bold" size="16" maxHeight="80">
                  Função javascript ocultar e mostrar elementos na tela
                </S.Text>
                <Spacing mt="4" />
                <Text color="#656565">5 Notas</Text>
              </S.Box>
            </TouchableOpacity>
          )}
        />
      </S.Container>
    </>
  );
}
