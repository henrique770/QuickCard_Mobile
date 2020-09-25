import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import NetInfo from "@react-native-community/netinfo";

import api from '~/services/api';
import { signInSuccess, signFailure , updateProfileRequest , updateProfile} from './actions';
import StudentEntity from '~/entities/StudentEntity'
import synchronizationService from '~/store/service/synchronizationService'


export function* signIn({ payload }) {
    try {

      let netState =  yield NetInfo.fetch().then(state => state)

      // connect in internet?
      if(!netState.isConnected) {
        Alert.alert(
          'Falha na conexão'
          , 'verifique sua conexão com a internet.'
        );
        return
      }

       const { email, password } = payload
       , response = yield api.post('/login',{
          email
          , password
        })
          .then(processLoginSucess)
          .catch(processLoginFailure)

          // LOGIN FAIL
          if(!response.ok)
            return

          const { token, student } = response.data
          , userEntity = new StudentEntity(student)

          api.defaults.headers.Authorization = `Bearer ${token}`;

          yield synchronizationService.scriconize(userEntity)
          synchronizationService.starOffileneCheckLoop()

          yield put(signInSuccess(token, student));

        // history.push('/dashboard');
    } catch (err) {
        Alert.alert(
            'Falha na autenticação'
             , err.message
        );
        console.log(err.message)
        yield put(signFailure());
    }
}

export function* signUp({ payload }) {
    try {

      let netState =  yield NetInfo.fetch().then(state => state)

      // connect in internet?
      if(!netState.isConnected) {
        Alert.alert(
          'Falha na conexão'
          , 'verifique sua conexão com a internet.'
        );
        return
      }

      const { name, email, password, imgPerfil } = payload;
        yield call(api.post, '/student', {
            name,
            email,
            password,
            imgPerfil
        });

    } catch (err) {
        Alert.alert(
            'Falha no cadastro',
            'Houve um erro no cadastro, verifique seus dados.'
        );
        yield put(signFailure());
    }
}

export function setToken({ payload }) {
    if (!payload) {
        return;
    }

    const { token } = payload.auth;

    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export function* signOut() {

  yield synchronizationService.clearBase()
  synchronizationService.stopOffileneCheckLoop()
}

export function* updateStudantProfil({payload}) {
  //console.log('profile', payload.profile)
  let isConnected = yield NetInfo.fetch().then( stateNet => stateNet.isConnected)

  if(!isConnected) {
    Alert.alert(
      '',
      'Sem conexão com a internet.'
    );
    return;
  }

  let response = yield api.put(`/student/${payload.profile._id}` , {
    Password : payload.profile.password,
    Email : payload.profile.email,
    Name : payload.profile.name,
    OldPassword : payload.profile.oldPassword,
    ImgPerfil : payload.profile.imgPerfil
  })
    .then( data => data.data)
    .catch(data => processResponseUpdateProfile(data.response.data))


  if(response != null) {
    Alert.alert(
      '',
      'Pefil atualizado com sucesso.'
    );

    yield put(updateProfile(response))
  }
  //yield put(updateProfile(profile));
}


//#region PROCESS LOGIN REQUEST

const processLoginFailure = err => {
  let data = err.response.data
    , status = err.response.status
    , title = ''
    , mensagem = ''

  switch (status) {
    case 400:
      title ='Falha na autenticação'
      mensagem = 'Usuário ou senha inválido.'
      break;
    case 500:
      title ='Falha no servidor'
      mensagem = 'Error no servidor de autenticação.'
      break;
    default:
      title ='Falha no processo de autenticação'
      mensagem = 'Error desconhecido.'
  }

  Alert.alert(
    'Falha na autenticação'
    , 'Usuário ou senha inválidos'
  );
  return {
    ok : false
  }
}


const processLoginSucess = sucess => {
  let data = sucess.data
    , status = sucess.status

  switch (status) {
    case 200:
      return {
        ok : true
        , data
      }
  }

  return  {
    ok : false
  }
}

//#endregion

//#region Process response update profile

function processResponseUpdateProfile(response) {
  switch (response.status) {
    case 400:
      if(response.message === "invalid password") {
        Alert.alert(
          'Falha na ataulização do perfil.',
          'Senha inválida.'
        );
        break
      }
  }

  return null;
}



//#endregion



export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
    takeLatest('@auth/SIGN_OUT', signOut),
    takeLatest('@auth/UPDATE_PROFILE_IN_REQUEST', updateStudantProfil),
]);
