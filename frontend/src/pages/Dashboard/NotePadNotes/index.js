import React, {useState, useEffect} from 'react';

import Typography from '~/components/Typography';
import Spacing from '~/components/Spacing';

import {TouchableOpacity, TouchableWithoutFeedback, Alert} from 'react-native';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';
import {withTheme} from 'styled-components';
import ActionButton from 'react-native-action-button';

import Swipeable from 'react-native-swipeable-row';

import * as S from '~/styles/global';
import {useDispatch, useSelector} from "react-redux";
import { updateNote , getNotePads } from '~/store/modules/notepad/actions'

const Text = Typography;

console.disableYellowBox = true;

function NotePadNotes({navigation, ...props}) {

  const dispatch = useDispatch()
  const notePad = useSelector(state => state.notepad.data.find( e => e.Id == props.route.params.Id))
  const data = notePad.Notes

  dispatch(getNotePads())

  useEffect(() => {
  }, []);

  function  renderRightButtons(item) {
    return ([
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
                onPress: () => {},
                style: 'Cancelar',
              },
              {
                text: 'Sim',
                onPress: () => {
                  console.log(item)
                  item.IsActive = false
                  dispatch(updateNote(item))
                  dispatch(getNotePads())
                },
              },
            ])
          }>
          <Text>
            <IconMc name="trash-can" color="#fff" size={30} />
          </Text>
        </TouchableOpacity>
      </S.Box>,
    ])
  }

  return (
    <>
      <S.Container>
        <S.Margin />
        <S.List
          data={data}
          keyExtractor={item => String(item)}
          renderItem={({item}) => (
            <Swipeable autoClose={true} rightButtons={renderRightButtons(item)}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Note', item)}>
                <S.Box data={item}>
                  <S.Text weight="bold" size="16">
                   {item.Title}
                  </S.Text>
                </S.Box>
              </TouchableWithoutFeedback>
            </Swipeable>
          )}
        />
      </S.Container>

      <ActionButton buttonColor={props.theme.floatButton}>
        <ActionButton.Item
          buttonColor="#333"
          title="Adicionar nota ao bloco"
          textContainerStyle={{
            height: 25,
          }}
          textStyle={{
            fontSize: 13,
          }}
          onPress={() => navigation.navigate('AddNote')}>
          <IconMi name="note-add" color="#fff" size={30} />
        </ActionButton.Item>
      </ActionButton>
    </>
  );
}

export default withTheme(NotePadNotes);
