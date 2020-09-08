export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {email, password},
  };
}

export function signInSuccess(token, student) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {token, student},
  };
}

export function signUpRequest(name, email, password, imgPerfil) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: {name, email, password , imgPerfil},
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}

export function  firstAccess() {
  return {
    type: '@auth/FIRST_ACCESS'
  }
}

export function updateProfileRequest(profile) {
  return {
    type: '@auth/UPDATE_PROFILE_IN_REQUEST',
    payload : { profile }
  }
}

export function updateProfile(profile) {
  return {
    type: '@auth/UPDATE_PROFILE',
    payload : { profile }
  }
}

export function toogleDark() {
  return {
    type: '@auth/TOOGLE_SWITCH',
  };
}
