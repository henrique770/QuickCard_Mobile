import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
//import PropTypes from 'prop-types';
//import {Alert, TouchableOpacity} from 'react-native';
//import IconMi from 'react-native-vector-icons/MaterialIcons';

import * as S from '~/styles/global';
import {withTheme} from "styled-components";

//import Spacing from '~/components/Spacing';
import { Separator , Form} from './styles';
import Spacing from '~/components/Spacing';
import {TouchableOpacity} from "react-native";
import IconMi from "react-native-vector-icons/MaterialIcons";

//import {addNotePad} from '~/store/modules/notepad/actions';
//import EditCard from "~/pages/Decks/EditCard";
import {updateNotePad , getNotePads} from '~/store/modules/notepad/actions'

function EditNotePad({navigation, ...props}) {

  const notePad = props.route.params != null ? props.route.params : { Name : ""}
  const [blockname, setBlockname] = useState(notePad.Name);
  const dispatch = useDispatch();

  function handleSubmit() {

    notePad.Name = blockname
    dispatch(updateNotePad(notePad))
  }

  function renderFormNotPad () {
    return (<>
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
    </>)
  }

  return (
    <>
      <S.Container>

        <S.Margin />

        {renderFormNotPad()}

      </S.Container>
    </>
  );
}

export default withTheme(EditNotePad);
