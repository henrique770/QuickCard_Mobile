import React, {useState, useEffect} from 'react';

import {TouchableOpacity, TouchableWithoutFeedback, Alert} from 'react-native';

import Typography from '~/components/Typography';
import Spacing from '~/components/Spacing';

import IconMi from 'react-native-vector-icons/MaterialIcons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';

import {withTheme} from 'styled-components';
import ActionButton from 'react-native-action-button';
import Swipeable from 'react-native-swipeable-row';
import * as S from '~/styles/global';

import {useDispatch, useSelector} from "react-redux";
import {getNotePads , updateNote} from "~/store/modules/notepad/actions";

const Text = Typography;

function Dashboard({navigation, ...props}) {

  const dispatch = useDispatch()
  const [data, setData] = useState([]);
  const notePads = useSelector( state => state.notepad.data)

  function getData() {
    let auxData = []

    notePads.map( notePad => auxData.push(...((notePad) =>

          notePad.Notes.map( note => { return {
            IsActive : note.IsActive
            , Note : note
            , NotePadName : notePad.Name
          }})
      )(notePad))
    )

    setData(auxData)
  }

  useEffect((e) => {
    dispatch(getNotePads())
    getData()
  }, []);

  //#region RIGHT BUTTON OPTIONS

  function  renderRightButtons(item) {
    return([
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
                    item.Note.IsActive = false
                    item.IsActive = false
                    console.log(item.Note)
                    dispatch(updateNote(item.Note))
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

  //#endregion

  function renderNotes() {
    return (
      <S.List
        data={data.filter( e => e.IsActive)}
        keyExtractor={item => String(item.Note.Id)}
        renderItem={({item}) => (
          <Swipeable autoClose={true} rightButtons={renderRightButtons(item)}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Note' , item.Note)}>
              <S.Box data={item}>
                <S.Text weight="bold" size="16">
                  {item.Note.Title}
                </S.Text>
                <Text color="#fe650e">{ item.NotePadName }</Text>
              </S.Box>
            </TouchableWithoutFeedback>
          </Swipeable>
        )}
      />
    )
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

        { renderNotes() }

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
