/* eslint-disable import/newline-after-import */
/* Combine all available reducers to a single root reducer.
 *
 * CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
/* Populated by react-webpack-redux:reducer */
import { combineReducers } from 'redux';
// import rootReducer from '../reducers/rootReducer.js';
import playerReducer from '../reducers/playerReducer';
import listsReducer from '../reducers/listsReducer';
import downloadReducer from '../reducers/downloadReducer';

import loginReducer from '../reducers/loginReducer';
const reducers = { 
    // rootReducer,
    playerReducer,
    listsReducer,
    downloadReducer,
    loginReducer
 };
const combined = combineReducers(reducers);
module.exports = combined;
