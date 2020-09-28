import React, {useRef, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Alert, Image, View} from 'react-native';

import * as S from '~/styles/global';
import Spacing from '~/components/Spacing';

import IconMi from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';
import showImagePicker from '~/store/service/fileImageService'
import {signOut , updateProfileRequest} from '~/store/modules/auth/actions';

import {Separator, Form} from './styles';
import {SignLink, SignLinkText} from "~/pages/Auth/SignUp/styles";
import StudentEntity from "~/entities/StudentEntity";

export default function Profile({navigation}) {

  const dispatch = useDispatch();
  const auth  = useSelector((state) => state.auth)
  const student = new StudentEntity(auth.profile)

  const [name, setName] = useState(student.Name);
  const [email, setEmail] = useState(student.Email);

  const [isSetIamge, setImage] = useState(false)
  const [dataSource, setDataSource] = useState(student.ImgProfile)

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
    let args = { name, email, _id : student.Id }
    console.log(student)
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
            value={name}
            onChangeText={setName}
          />

          <S.FormInput
            icon="email-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
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
            returnKeyType="next"
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <S.FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua nova senha"
            returnKeyType="next"
            value={password}
            onChangeText={setPassword}
          />

          <S.FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Confirmação de senha"
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
