import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {Alert, TouchableOpacity} from 'react-native';
import IconMi from 'react-native-vector-icons/MaterialIcons';

import * as S from '~/styles/global';
import Spacing from '~/components/Spacing';

import {Container, Title, Separator, Form, SubmitButton} from './styles';
import {addNotePad} from '~/store/modules/notepad/actions';


export default function AddNotePad({navigation}) {
  const [blockname, setBlockname] = useState('');
  const dispatch = useDispatch();

  function handleSubmit() {

    if(blockname === "")
    {
      Alert.alert(
        'Alerta',
        `Informe um nome para o bloco de anotação!`,
        [
          {
            text: 'Ok',
          },
        ],
        {cancelable: false},
      );
      return
    }
    dispatch(addNotePad({
      Name : blockname
    }))

    setBlockname('')

    Alert.alert(
      'Alerta',
      `Bloco anotação adicionado com sucesso!`,
      [
        {
          text: 'Ok',
          onPress: navigation.navigate('NotePad'),
        },
      ],
      {cancelable: false},
    );
  }

  return (
    <>
      <S.Container>
        <S.Margin />
        <Form>
          <S.FormInput
            icon="cards"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome do Bloco de notas"
            returnKeyType="next"
            value={blockname}
            onChangeText={setBlockname}
          />

          <Separator />

          <S.ButtonTheme onPress={handleSubmit}>
            <S.TextButton>Salvar</S.TextButton>
          </S.ButtonTheme>
        </Form>
      </S.Container>
    </>
  );
}
