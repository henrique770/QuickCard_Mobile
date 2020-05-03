import { all, spawn, takeEvery  } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import deck from './deck/sagas'

import { startWatchingNetworkConnectivity } from "./offline";

export default function* rootSaga() {
    return yield all([
        spawn(startWatchingNetworkConnectivity)
        , auth
        , user
        , deck
    ]);
}
