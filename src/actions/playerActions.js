import { createActions } from 'redux-arc';

const { types, creators } = createActions('player', {
    play: null,
    next: null,
    prev: null,
    change: null
});

export default {
    types,
    creators    
}
