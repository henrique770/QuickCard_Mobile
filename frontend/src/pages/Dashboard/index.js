import React, {useState, useEffect} from 'react';

import {TouchableOpacity, TouchableWithoutFeedback, Alert} from 'react-native';

import Typography from '~/components/Typography';
import Spacing from '~/components/Spacing';

import IconMi from 'react-native-vector-icons/MaterialIcons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';
import Empty from '~/components/Empty';

import {withTheme} from 'styled-components';
import ActionButton from 'react-native-action-button';
import Swipeable from 'react-native-swipeable-row';
import * as S from '~/styles/global';

import {useDispatch, useSelector} from 'react-redux';
import {getNotePads, updateNote} from '~/store/modules/notepad/actions';

const Text = Typography;

function Dashboard({navigation, ...props}) {
  const dispatch = useDispatch();
  const notePads = useSelector(state => state.notepad.data);

  dispatch(getNotePads());

  //#region RIGHT BUTTON OPTIONS

  function renderRightButtons(item) {
    return [
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
                  item.IsActive = false;
                  dispatch(updateNote(item));
                  //dispatch(getNotePads())
                  navigation.navigate('Dashboard');
                },
              },
            ])
          }>
          <Text>
            <IconMc name="trash-can" color="#fff" size={30} />
          </Text>
        </TouchableOpacity>
      </S.Box>,
    ];
  }

  //#endregion

  function renderNotes() {
    let notes = [];

    for (let i = 0; i < notePads.length; i += 1) {
      let notePad = notePads[i];

      for (let j = 0; j < notePad.Notes.length; j += 1) {
        let note = notePad.Notes[j];

        notes.push(
          <>
            <Swipeable
              autoClose={true}
              bounceLeft={true}
              rightButtons={renderRightButtons(note)}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Note', note)}>
                <S.Box data={note}>
                  <S.Text weight="bold" size="16">
                    {note.Title}
                  </S.Text>
                  <Text color="#fe650e">{notePad.Name}</Text>
                </S.Box>
              </TouchableWithoutFeedback>
            </Swipeable>
          </>,
        );
      }
    }

    if (notes.length === 0) {
      return <Empty />;
    } else {
      return notes;
    }
  }

  return (
    <>
      <S.Container>
        <Spacing position="absolute" right="30" top="18">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <IconMi name="menu" size={25} color="#FFF" />
          </TouchableOpacity>
        </Spacing>

        <S.Margin />

        {renderNotes()}
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
          onPress={() => navigation.navigate('AddNote')}>
          <IconMi name="note-add" color="#fff" size={30} />
        </ActionButton.Item>
      </ActionButton>
    </>
  );
}

export default withTheme(Dashboard);
