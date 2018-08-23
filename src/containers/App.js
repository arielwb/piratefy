/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {
  Component,

} from 'react';


import Main from '../components/App';
/* Populated by react-webpack-redux:reducer */
export default class App extends Component {
  render() {
    const {actions, rootReducer} = this.props;
    return <Main />;
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */

// export default connect(mapStateToProps, mapDispatchToProps)(App);
