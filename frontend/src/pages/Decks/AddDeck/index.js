import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import IconMi from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Spacing from '~/components/Spacing';
// import { updateProfileRequest } from '~/store/modules/user/actions';

import {
  Container,
  Title,
  Separator,
  Form,
  FormInput,
  SubmitButton,
} from './styles';

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
    <Background>
      <Container>
        <Spacing position="absolute" top="30" left="30">
          <TouchableOpacity onPress={() => navigation.navigate('Decks')}>
            <IconMi name="arrow-back" size={30} color="#FFF" />
          </TouchableOpacity>
        </Spacing>
        <Title>Adicionar Baralho</Title>

        <Form>
          <FormInput
            icon="cards"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome do Baralho"
            returnKeyType="next"
            value={deckname}
            onChangeText={setDeckname}
          />

          <Separator />

          <SubmitButton onPress={handleSubmit}>Salvar</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
AddDeck.navigationOptions = {
  tabBarLabel: 'Criar Baralho',
  tabBarIcon: ({tintColor}) => (
    <IconMi name="event" size={20} color={tintColor} />
  ),
};
