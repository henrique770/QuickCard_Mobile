import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Typography from '~/components/Typography';
import Spacing from '~/components/Spacing';

import {TouchableOpacity, Alert, TouchableWithoutFeedback} from 'react-native';
import {withTheme} from 'styled-components';
import ActionButton from 'react-native-action-button';
import IconMi from 'react-native-vector-icons/MaterialIcons';

import * as S from '~/styles/global';
import { getNotePads , updateNotePad } from "~/store/modules/notepad/actions";
import Swipeable from 'react-native-swipeable-row';
import IconMc from "react-native-vector-icons/MaterialCommunityIcons";

const Text = Typography;

function NotePad({navigation, ...props}) {

  const dispatch = useDispatch();
  const notePadState = useSelector( state => state.notepad.data)

  useEffect(() => {
    dispatch(getNotePads())
  }, []);

  //#region RIGHT BUTTON OPTIONS

  const rightButtons = function (item) {
    return ([
      <S.Box
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          borderRadius: 0,
          right: 10,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Alerta', 'Você tem certeza que quer excluir?', [
              {
                text: 'Não',
                onPress: () => {},
                style: 'Cancelar',
              },
              {
                text: 'Sim',
                onPress: () => {
                  item.IsActive = false
                  dispatch(updateNotePad(item))
                },
              },
            ])
          }>
          <Text>
            <IconMc name="trash-can" color="#fff" size={30} />
          </Text>
        </TouchableOpacity>

        <Spacing mt="6" />

        <TouchableOpacity onPress={() => navigation.navigate('EditNotePad', item) }>
          <Text>
            <IconMc name="trash-can" color="#fff" size={30} />
          </Text>
        </TouchableOpacity>
      </S.Box>,
    ])
  }
  //#endregion

  function renderListNotePads() {
    return (
      <S.Container>

        <Spacing position="absolute" top="18" right="30">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <IconMi name="menu" size={25} color="#FFF" />
          </TouchableOpacity>
        </Spacing>
        <S.Margin />
          <S.List
                data={notePadState}
                renderItem={({item}) => (
                  <Swipeable autoClose={true} rightButtons={rightButtons(item)}>
                    <TouchableWithoutFeedback
                      onPress={() => navigation.navigate('NotePadNotes' , item)}>
                      <S.Box data={item}>
                        <S.Text weight="bold" size="16" maxHeight="95">
                          {item.Name}
                        </S.Text>
                        <Spacing mt="4" />
                        <Text color="#fe650e">{item.totalNotes} Notas</Text>
                      </S.Box>
                    </TouchableWithoutFeedback>
                  </Swipeable>
                )}
              />
      </S.Container>
    )
  }

  return (
    <>
      { renderListNotePads() }

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
