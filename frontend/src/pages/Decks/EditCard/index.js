import React, {useRef, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {TouchableOpacity, Alert} from 'react-native';
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

export default function EditCard({navigation}) {
  // const dispatch = useDispatch();
  // const profile = useSelector(state => state.user.profile);

  const backRef = useRef();

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

  function handleDelete() {
    Alert.alert(
      'Alerta',
      `Você tem certeza que quer excluir?`,
      [
        {
          text: 'Não',
          onPress: () => console.log('Excluir'),
          style: 'Cancelar',
        },
        {
          text: 'Sim',
          onPress: () => {
            navigation.navigate('Card');
          },
        },
      ],
      {cancelable: true},
    );
  }

  return (
    <Background>
      <Container>
        <Spacing position="absolute" top="30" left="30">
          <TouchableOpacity onPress={() => navigation.navigate('Card')}>
            <IconMi name="arrow-back" size={30} color="#FFF" />
          </TouchableOpacity>
        </Spacing>
        <Title>Editar Cartão</Title>

        <Form>
          <FormInput
            icon="cards-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Frente"
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
          <Spacing mt="5" />
          <SubmitButton onPress={handleDelete}>Excluir</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
