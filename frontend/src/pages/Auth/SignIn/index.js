import React, {useRef, useState} from 'react';
import {Image, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import logo from '~/assets/whitelogo.png';

import Background from '~/components/Background';
import {signInRequest} from '~/store/modules/auth/actions';
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignIn({navigation}) {
  const dispatch = useDispatch();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#fe650e" />
      <Background>
        <Container>
          <Image source={logo} />
          {/* style={{width: 400, height: 80}} */}
          <Form>
            <FormInput
              icon="email-outline"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite seu e-mail"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
              value={email}
              onChangeText={setEmail}
            />

            <FormInput
              icon="lock-outline"
              secureTextEntry
              placeholder="Digite sua senha"
              ref={passwordRef}
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
              value={password}
              onChangeText={setPassword}
            />
            <SubmitButton loading={loading} onPress={handleSubmit}>
              Acessar
            </SubmitButton>
          </Form>
          <SignLink onPress={() => navigation.navigate('SignUp')}>
            <SignLinkText>Criar conta gratuita</SignLinkText>
          </SignLink>
        </Container>
      </Background>
    </>
  );
}
