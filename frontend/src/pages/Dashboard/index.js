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

import api from '~/services/api';
import {useDispatch, useSelector} from "react-redux";
import {getNotePads} from "~/store/modules/notepad/actions";

const Text = Typography;

function Dashboard({navigation, ...props}) {
  const [note, setNote] = useState([]);

  const dispatch = useDispatch()
  const decks = useSelector( state => state.notepad.data)
  const data = decks.map( deck => deck.Notes ).join()

  useEffect((e) => {
    console.log('notepas --- dispache')
    dispatch(getNotePads())
  }, []);

  const rightButtons = [
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
          <IconMc name="trash-can" color="#fff" size={30} />
        </Text>
      </TouchableOpacity>
    </S.Box>,
  ];

  return (
    <>
      <S.Container>
        <Spacing position="absolute" right="30" top="18">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <IconMi name="menu" size={25} color="#FFF" />
          </TouchableOpacity>
        </Spacing>

        <S.Margin />
        <S.List
          data={data}
          keyExtractor={item => String(item.Id)}
          renderItem={({item}) => (
            <Swipeable autoClose={true} rightButtons={rightButtons}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('AddNote')}>
                <S.Box data={item}>
                  <S.Text weight="bold" size="16">
                    {item.Name}
                  </S.Text>
                  <Spacing mt="4" mb="4">
                    <Text size="14" color="#656565" maxHeight="50">
                      {item.Content}
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
          onPress={() => navigation.navigate('AddNote')}>
          <IconMi name="note-add" color="#fff" size={30} />
        </ActionButton.Item>
      </ActionButton>
    </>
  );
}

export default withTheme(Dashboard);
