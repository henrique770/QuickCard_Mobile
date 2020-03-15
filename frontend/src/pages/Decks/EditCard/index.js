import React, {useRef, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {TouchableOpacity, Alert} from 'react-native';
import PropTypes from 'prop-types';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import * as S from '~/styles/global';
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
    <>
      <S.Container>
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
      </S.Container>
    </>
  );
}

EditCard.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <TouchableOpacity
      style={{marginTop: 30}}
      onPress={() => {
        navigation.navigate('Card');
      }}>
      <IconMi name="arrow-back" size={30} color="#fff" />
    </TouchableOpacity>
  ),
});

EditCard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
