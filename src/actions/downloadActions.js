import { createActions } from 'redux-arc';

const { types, creators } = createActions('download', {
    remove: null,
    downloadStackAdd: null,
    downloadBegin: null,
    downloadEnd: null,
});

export default {
    types,
    creators    
}
