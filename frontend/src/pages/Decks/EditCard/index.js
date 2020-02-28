import React, {useRef, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
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

  return (
    <Background>
      <Container>
        <View style={styles.back_icon}>
          <TouchableOpacity onPress={() => navigation.navigate('FlashCard')}>
            <IconMi name="arrow-back" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
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
        </Form>
      </Container>
    </Background>
  );
}

const styles = StyleSheet.create({
  back_icon: {
    position: 'absolute',
    left: 30,
    top: 30,
  },
});
