import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import NetInfo from "@react-native-community/netinfo";

import api from '~/store/service/api';
import { signInSuccess, signFailure , updateProfileRequest , updateProfile} from './actions';
import StudentEntity from '~/entities/StudentEntity'

import {getInstanceSynchronizationService} from '~/store/service/synchronizationService'
import { getInstanceNetInfoObserver , notificationsType } from '~/store/service/netInfoObserverService'
import { Messenger } from '~constants/ConstantsBusiness'

const netInfoObserver = getInstanceNetInfoObserver()
const synchronizationService = getInstanceSynchronizationService()

export function* signIn({ payload }) {
    try {

      let netState =  yield NetInfo.fetch().then(state => state)

      // connect in internet?
      if(!netState.isConnected) {
        Alert.alert(
          Messenger.MSG019
          , Messenger.MSG020
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

          yield put(signInSuccess(token, student));

        // history.push('/dashboard');
    } catch (err) {
        Alert.alert(
            Messenger.MSG021
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
          Messenger.MSG019
          , Messenger.MSG020
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
          Messenger.MSG022
          , Messenger.MSG020
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
  netInfoObserver.stop()

}

export function* updateStudantProfil({payload}) {
  //console.log('profile', payload.profile)
  let isConnected = yield NetInfo.fetch().then( stateNet => stateNet.isConnected)

  if(!isConnected) {
    Alert.alert(
      Messenger.MSG019
      , Messenger.MSG020
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
      Messenger.MSG000
      , Messenger.MSG023
    );

    yield put(updateProfile(response))
  }
  //yield put(updateProfile(profile));
}


//#region PROCESS LOGIN REQUEST

const processLoginFailure = err => {
  let title = ''
  , mensagem = ''

  // network error
  if(!err.status) {
    
    title = Messenger.MSG019
    mensagem = Messenger.MSG025
  }

  else {

    let data = err.response.data
    , status = err.response.status
   

    switch (status) {
      case 400:
        title = Messenger.MSG021
        mensagem = 'Usuário ou senha inválido.'
        break;
      case 500:
        title = Messenger.MSG016
        mensagem = 'Error no servidor de autenticação.'
        break;
      default:
        title = Messenger.MSG024
        mensagem = 'Error desconhecido.'
    }

  }

  Alert.alert( title ,mensagem );

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
