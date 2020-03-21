import React from 'react';

import Typography from '~/components/Typography';
import Spacing from '~/components/Spacing';

import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  StyleSheet,
  View,
} from 'react-native';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import {withTheme} from 'styled-components';
import ActionButton from 'react-native-action-button';
import {DrawerActions} from 'react-navigation-drawer';
import Swipeable from 'react-native-swipeable-row';

import * as S from '~/styles/global';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const Text = Typography;

console.disableYellowBox = true;

function Dashboard({navigation, ...props}) {
  const leftContent = <Text>Deslize para ativar</Text>;

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
    <>
      <S.Container>
        <Spacing position="absolute" right="30" top="30">
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <IconMi name="menu" size={30} color="#FFF" />
          </TouchableOpacity>
        </Spacing>

        <S.Title>Todas as notas</S.Title>
        <S.List
          data={data}
          keyExtractor={item => String(item)}
          renderItem={({item}) => (
            <Swipeable
              autoClose={true}
              leftContent={leftContent}
              rightButtons={rightButtons}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Notes')}>
                <S.Box data={item}>
                  <S.Text weight="bold" size="16">
                    QuickCard
                  </S.Text>
                  <Spacing mt="4" mb="4">
                    <Text size="14" color="#656565">
                      QuickCard é um software de estudo que tem como principais
                      caracteristicas
                    </Text>
                  </Spacing>
                  <Text color="#fe650e">Primeiro Caderno</Text>
                </S.Box>
              </TouchableWithoutFeedback>
            </Swipeable>
          )}
        />
      </S.Container>

      <ActionButton buttonColor={props.theme.floatButton}>
        <ActionButton.Item
          buttonColor="#333"
          title="Adicionar nota"
          textContainerStyle={{
            height: 25,
          }}
          textStyle={{
            fontSize: 13,
          }}
          onPress={() => navigation.navigate('Notes')}>
          <IconMi name="note-add" color="#fff" size={30} />
        </ActionButton.Item>
      </ActionButton>
    </>
  );
}

export default withTheme(Dashboard);
