import { createReducers } from 'redux-arc';
import loginActions from '../actions/loginActions';
import querystring from 'querystring'

const INITIAL_STATE = {
    user: {},
}

const onLoginSuccess = (state, action) => ({ ...state, user: querystring.parse(action.payload.user) })


const HANDLERS = {
    [loginActions.types.LOGIN_SUCCESS]: onLoginSuccess,
}

export default createReducers(INITIAL_STATE, HANDLERS);
