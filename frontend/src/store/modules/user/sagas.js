import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/store/service/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
    try {
        const { _id, name, email, ...rest } = payload.data;

        const profile = Object.assign(
            { _id, name, email },
            rest.oldPassword ? rest : {}
        );

        const response = yield call(api.put, `estudante/${_id}`, profile, );

        Alert.alert('Sucesso!', 'Perfil atualizado com sucesso');

        yield put(updateProfileSuccess(response.data));
    } catch (err) {
        Alert.alert(
            'Falha na atualização!',
            'Houve um erro na atualização do perfil, verifique seus dados'
        );
        yield put(updateProfileFailure());
    }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
