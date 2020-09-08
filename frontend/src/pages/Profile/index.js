import React, {useRef, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Alert, Image, View} from 'react-native';

import * as S from '~/styles/global';
import Spacing from '~/components/Spacing';

import IconMi from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';
import showImagePicker from '~/services/fileImageService'
// import { updateProfileRequest } from '~/store/modules/user/actions';
import {signOut , updateProfileRequest} from '~/store/modules/auth/actions';

import {Separator, Form} from './styles';
import {SignLink, SignLinkText} from "~/pages/Auth/SignUp/styles";

export default function Profile({navigation}) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.Name);

  const [email, setEmail] = useState(profile.Email);
  const [isSetIamge, setImage] = useState(false)

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ dataSource, setDataSource] = useState(profile.ImgProfile)


  // useEffect(() => {
  //     setOldPassword('');
  //     setPassword('');
  //     setConfirmPassword('');
  // }, [profile]);

  function handlePasswordPerfil() {

    if(!validatePasswords())
      return;

    let args = loadArgumentsHandlerPerfil()

    args.oldPassword = oldPassword
    args.password = password

    dispatch(updateProfileRequest(args));
  }

  function handlePerfil() {
    let args = loadArgumentsHandlerPerfil()
    dispatch(updateProfileRequest(args));
  }

  function loadArgumentsHandlerPerfil() {
    let args = { name, email, id : profile._id }
    console.log(profile)
    if(isSetIamge) {
      args.imgPerfil = dataSource.uri
    }
    else {
      args.imgPerfil = null
    }

    return args
  }

  function validatePasswords() {
    if(oldPassword == "") {
      Alert.alert('Alerta',`Informe sua senha.`)
      return false;
    }

    if(password == "" || confirmPassword == "" ) {
      return Alert.alert('Alerta',`Informe sua nova senha.`)
      return false;
    }

    if(password != confirmPassword) {
      return Alert.alert('Alerta',`Senhas inválidas.`)
      return false;
    }

    return true;
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
            source={dataSource}
          />
        </View>

        <Form>

          <SignLink onPress={() => showImagePicker((data) => {
            setImage(true)
            setDataSource(data)
          })}>
            <SignLinkText>Selecionar imagem Perfil</SignLinkText>
          </SignLink>

          <Spacing mt="10" />

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
            //onChangeText={setEmail}
          />

          <S.ButtonTheme onPress={handlePerfil}>
            <S.TextButton>Atualizar perfil</S.TextButton>
          </S.ButtonTheme>

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
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <S.ButtonTheme onPress={handlePasswordPerfil}>
            <S.TextButton>Atualizar perfil e senha</S.TextButton>
          </S.ButtonTheme>

          <Spacing mt="10" />

          <Separator />

          <S.ButtonTheme onPress={handleLogout}>
            <S.TextButton>Sair do QuickCard</S.TextButton>
          </S.ButtonTheme>
        </Form>
      </S.Container>
    </>
  );
}
