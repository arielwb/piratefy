import { createStore, applyMiddleware } from 'redux';
import { createAsyncMiddleware } from 'redux-arc';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducers from '../reducers';
import axios from 'axios';

const asyncTask = store => done => (options) => {
  const { method, url, payload } = options;

  const params = method === 'get' ? { params: payload } : payload;
  return axios[method](url, params).then(
    response => done(null, response.data),
    error => done(error, null),
  );

};

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

const asyncMiddleware = createAsyncMiddleware(asyncTask);


export default (initialState) => {
  const store = createStore(persistedReducer, initialState, applyMiddleware(asyncMiddleware),
    window.devToolsExtension && window.devToolsExtension());

  const persistor = persistStore(store)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // We need to require for hot reloading to work properly.
      const nextReducer = require('../reducers');  // eslint-disable-line global-require

      store.replaceReducer(nextReducer);
    });
  }

  return { store, persistor }
}
