import { ipcRenderer } from 'electron';
import { createReducers } from 'redux-arc';
import downloadActions from '../actions/downloadActions';

const INITIAL_STATE = {
    downloadStack: [],
    currentDownload: {},
    localFiles: [],
}
console.log('downloadActions', downloadActions)

const onRemove = (state, action) => ({ ...state, localFiles: state.localFiles.filter(item => item.id === action.payload.track.id) })
const onDownloadStackAdd = (state, action) => {
    console.log('onDownloadStackAdd', action)
    let isDownloaded = state.localFiles.some(track => track.id === action.payload.track.id)
    return !isDownloaded ? { ...state, downloadStack: state.downloadStack.concat(action.payload.track) } : state
}
const onDownloadBegin = (state, action) => {
    console.log('ipcRenderer', ipcRenderer)
    ipcRenderer.send('download', action.payload.track)

    ipcRenderer.on('download', (event, arg) => {
        console.log(arg) // prints "pong"
    })

    return {
        ...state,
        currentDownload: action.payload.track
    }
}

const onDownloadEnd = (state, action) => ({
    ...state,
    currentDownload: {},
    downloadStack: state.downloadStack.filter(track => track.id !== action.payload.track.id),
    localFiles: state.localFiles.concat(action.payload.track)
})
const HANDLERS = {
    [downloadActions.types.REMOVE]: onRemove,
    [downloadActions.types.DOWNLOAD_STACK_ADD]: onDownloadStackAdd,
    [downloadActions.types.DOWNLOAD_BEGIN]: onDownloadBegin,
    [downloadActions.types.DOWNLOAD_END]: onDownloadEnd,
}

export default createReducers(INITIAL_STATE, HANDLERS)
