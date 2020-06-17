import React from 'react';
import Typography from '~/components/Typography';
import Spacing from '~/components/Spacing';

import {TouchableOpacity, Alert} from 'react-native';
import {withTheme} from 'styled-components';
import ActionButton from 'react-native-action-button';
import IconMi from 'react-native-vector-icons/MaterialIcons';

import * as S from '~/styles/global';

const data = [
  {
    id: '4',
    name: 'nojunkfood',
  },
  {
    id: '2',
    name: 'Arquitetura Flux',
  },
  {
    id: '3',
    name: 'Sistemas operacionais',
  },
  {
    id: '1',
    name: 'QuickCard',
  },
  {
    id: '5',
    name: 'fala de quinta ( 5 estratégias competitivas de poter )',
  },
];

const Text = Typography;

function NotePad({navigation, ...props}) {
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
        <Spacing position="absolute" top="18" right="30">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <IconMi name="menu" size={25} color="#FFF" />
          </TouchableOpacity>
        </Spacing>
        <S.Margin />
        <S.List
          data={data}
          numColumns={2}
          keyExtractor={item => String(item)}
          renderItem={({item}) => (
            <S.Container>
              <TouchableOpacity
                onPress={() => navigation.navigate('NotePadNotes')}
                onLongPress={() => deleteNotePad()}>
                <S.Box data={item} CustomHeight="150px">
                  <S.Text weight="bold" size="16" maxHeight="60">
                    {item.name}
                  </S.Text>
                  <Spacing mt="4" />
                  <Spacing mt="4" position="absolute" bottom={20} left={20}>
                    <Text color="#fe650e">5 Notas</Text>
                  </Spacing>
                </S.Box>
              </TouchableOpacity>
            </S.Container>
          )}
        />
      </S.Container>

      <ActionButton buttonColor={props.theme.floatButton}>
        <ActionButton.Item
          buttonColor="#333"
          title="Adicionar bloco de notas"
          textContainerStyle={{
            height: 25,
          }}
          textStyle={{
            fontSize: 13,
          }}
          onPress={() => navigation.navigate('AddNotePad')}>
          <IconMi name="library-add" color="#fff" size={30} />
        </ActionButton.Item>
      </ActionButton>
    </>
  );
}

export default withTheme(NotePad);
