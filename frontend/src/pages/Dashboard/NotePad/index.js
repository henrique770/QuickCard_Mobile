import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Typography from '~/components/Typography';
import Spacing from '~/components/Spacing';

import {TouchableOpacity, Alert} from 'react-native';
import {withTheme} from 'styled-components';
import ActionButton from 'react-native-action-button';
import IconMi from 'react-native-vector-icons/MaterialIcons';

import * as S from '~/styles/global';
import { getNotePads } from "~/store/modules/notepad/actions";

const Text = Typography;

function NotePad({navigation, ...props}) {

  const dispatch = useDispatch();
  const notePadState = useSelector( state => state.notepad.data)

  useEffect((e) => {
    console.log('decks --- dispache')
    dispatch(getNotePads())
  }, []);

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
          data={notePadState}
          numColumns={2}
          keyExtractor={item => String(item)}
          renderItem={({item}) => (
            <S.Container>
              <TouchableOpacity
                onPress={() => navigation.navigate('NotePadNotes')}
                onLongPress={() => deleteNotePad()}>
                <S.Box data={item}>
                  <S.Text weight="bold" size="16" maxHeight="95">
                    {item.Name}
                  </S.Text>
                  <Spacing mt="4" />
                  <Text color="#fe650e">{item.totalNotes} Notas</Text>
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
