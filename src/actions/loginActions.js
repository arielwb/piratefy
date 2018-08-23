import { createActions } from 'redux-arc';

const { types, creators } = createActions('login', {
    loginSuccess: null,
});

export default {
    types,
    creators    
}
