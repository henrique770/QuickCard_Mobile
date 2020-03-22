import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import IconMi from 'react-native-vector-icons/MaterialIcons';

import * as S from '~/styles/global';
import Spacing from '~/components/Spacing';
// import { updateProfileRequest } from '~/store/modules/user/actions';

import {Container, Title, Separator, Form, SubmitButton} from './styles';

export default function AddDeck({navigation}) {
  // const dispatch = useDispatch();
  // const profile = useSelector(state => state.user.profile);

  const [deckname, setDeckname] = useState('');

  // useEffect(() => {
  //     setOldPassword('');
  //     setPassword('');
  //     setConfirmPassword('');
  // }, [profile]);

  function handleSubmit() {
    // dispatch(
    //     updateProfileRequest({
    //         name,
    //         email,
    //         password,
    //         oldPassword,
    //         confirmPassword,
    //     })
    // );
  }

  return (
    <>
      <S.Container>
        <Title>Adicionar Baralho</Title>

        <Form>
          <S.FormInput
            icon="cards"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome do Baralho"
            returnKeyType="next"
            value={deckname}
            onChangeText={setDeckname}
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
AddDeck.navigationOptions = {
  tabBarLabel: 'Criar Baralho',
  tabBarIcon: ({tintColor}) => (
    <IconMi name="event" size={20} color={tintColor} />
  ),
};

AddDeck.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <TouchableOpacity
      style={{marginTop: 30}}
      onPress={() => {
        navigation.navigate('Decks');
      }}>
      <IconMi name="arrow-back" size={30} color="#fff" />
    </TouchableOpacity>
  ),
});

AddDeck.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
