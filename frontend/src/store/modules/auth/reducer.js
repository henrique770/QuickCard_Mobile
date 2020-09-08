import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  darkmode: false,
  synced: false,
  firstAccess : true,
  profile : null
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@auth/UPDATE_PROFILE': {
        draft.profile = action.payload.profile
        break;
      }

      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        draft.profile = action.payload.student
        break;
      }

      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.signed = false;
        break;
      }

      case '@auth/TOOGLE_SWITCH': {
        draft.darkmode = tUPDATE_PROFILErue;
        break;
      }

      case '@auth/FIRST_ACCESS' : {
        draft.firstAccess = false;
        break;
      }

      default:
    }
  });
}
