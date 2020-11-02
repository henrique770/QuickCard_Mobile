import React, {useRef, useState} from 'react';
import {Image, StatusBar, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import logo from '~/assets/whitelogo.png';
import showImagePicker from '~/store/service/fileImageService';
import Background from '~/components/Background';
import {signUpRequest} from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

import {Validators, Messenger} from '~constants/ConstantsBusiness';

export default function SignUp({navigation}) {
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dataSource, setDataSource] = useState(logo);
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    if (!Validators.email(email)) {
      // invalid email
      Alert.alert(Messenger.MSG000, Messenger.MSG002);
      return;
    }

    if (!Validators.password(password)) {
      // invalid password
      Alert.alert(Messenger.MSG000, Messenger.MSG004);
      return;
    }

    dispatch(signUpRequest(name, email, password));
    navigation.navigate('SignIn');
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#fe650e" />
      <Background>
        <Container>
          <Image source={dataSource} />
          <Form>
            <FormInput
              icon="account-outline"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Nome completo"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
              value={name}
              onChangeText={setName}
            />

            <FormInput
              icon="email-outline"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite seu e-mail"
              ref={emailRef}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
              value={email}
              onChangeText={setEmail}
            />

            <FormInput
              icon="lock-outline"
              secureTextEntry
              placeholder="Sua senha secreta"
              ref={passwordRef}
              onSubmitEditing={handleSubmit}
              value={password}
              onChangeText={setPassword}
            />

            <SubmitButton loading={loading} onPress={handleSubmit}>
              Criar conta
            </SubmitButton>
          </Form>

          <SignLink onPress={() => navigation.navigate('SignIn')}>
            <SignLinkText>Já tenho conta</SignLinkText>
          </SignLink>
        </Container>
      </Background>
    </>
  );
}
