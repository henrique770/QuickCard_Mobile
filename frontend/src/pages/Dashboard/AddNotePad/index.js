import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import IconMi from 'react-native-vector-icons/MaterialIcons';

import * as S from '~/styles/global';
import Spacing from '~/components/Spacing';

import {Container, Title, Separator, Form, SubmitButton} from './styles';

export default function AddNotePad({navigation}) {
  const [blockname, setBlockname] = useState('');

  function handleSubmit() {}

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
