import React, {useRef, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Image, View} from 'react-native';

import * as S from '~/styles/global';
import Spacing from '~/components/Spacing';

import IconMi from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';

// import { updateProfileRequest } from '~/store/modules/user/actions';
import {signOut} from '~/store/modules/auth/actions';

import {Separator, Form} from './styles';

export default function Profile({navigation}) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState('');
  // profile.name
  const [email, setEmail] = useState('');
  // profile.email
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <>
      <S.Container>
        <Spacing position="absolute" top="18" right="30">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <IconMi name="menu" size={25} color="#FFF" />
          </TouchableOpacity>
        </Spacing>
        <S.Margin />
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 10,
          }}>
          <Image
            style={{height: 100, width: 100, borderRadius: 100 / 2}}
            source={require('~/assets/profile.png')}
          />
        </View>

        <Form>
          <S.FormInput
            icon="account-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome completo"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />

          <S.FormInput
            icon="email-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <Separator />

          <S.FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha atual"
            ref={oldPasswordRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <S.FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua nova senha"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            value={password}
            onChangeText={setPassword}
          />

          <S.FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Confirmação de senha"
            ref={confirmPasswordRef}
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Separator />

          <S.ButtonTheme onPress={handleSubmit}>
            <S.TextButton>Atualizar perfil</S.TextButton>
          </S.ButtonTheme>
          <Spacing mt="10" />
          <S.ButtonTheme onPress={handleLogout}>
            <S.TextButton>Sair do QuickCard</S.TextButton>
          </S.ButtonTheme>
        </Form>
      </S.Container>
    </>
  );
}
