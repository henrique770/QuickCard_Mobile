import React, {useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import Background from '~/components/Background';
import Spacing from '~/components/Spacing';

import {TouchableOpacity} from 'react-native';
import IconMi from 'react-native-vector-icons/MaterialIcons';
// import { updateProfileRequest } from '~/store/modules/user/actions';

import {
  Container,
  Title,
  Separator,
  Form,
  FormInput,
  SubmitButton,
} from './styles';

export default function AddCard({navigation}) {
  // const dispatch = useDispatch();
  // const profile = useSelector(state => state.user.profile);

  const frontRef = useRef();
  const backRef = useRef();

  const [deck, setDeck] = useState('');
  const [front, setFront] = useState('');
  // profile.name
  const [back, setBack] = useState('');
  // profile.email

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
        {/* <Spacing position="absolute" top="30" left="30">
          <TouchableOpacity onPress={() => navigation.navigate('Decks')}>
            <IconMi name="arrow-back" size={30} color="#FFF" />
          </TouchableOpacity>
        </Spacing> */}
        <Title>Adicionar Cartão</Title>

        <Form>
          <FormInput
            icon="cards"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Baralho"
            returnKeyType="next"
            onSubmitEditing={() => frontRef.current.focus()}
            value={deck}
            onChangeText={setDeck}
          />

          <FormInput
            icon="cards-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Frente"
            ref={frontRef}
            returnKeyType="next"
            onSubmitEditing={() => backRef.current.focus()}
            value={front}
            onChangeText={setFront}
          />

          <FormInput
            icon="cards-playing-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Verso"
            ref={backRef}
            returnKeyType="next"
            value={back}
            onChangeText={setBack}
          />

          <Separator />

          <SubmitButton onPress={handleSubmit}>Salvar</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}

AddCard.navigationOptions = ({navigation}) => ({
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

AddCard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
