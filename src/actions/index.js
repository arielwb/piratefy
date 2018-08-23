
import playerActions from '../actions/playerActions';
import downloadActions from '../actions/downloadActions';
import listActions from '../actions/listsActions';
import loginActions from '../actions/loginActions';


export default {
  ...playerActions.creators,
  ...downloadActions.creators,
  ...listActions.creators,
  ...loginActions.creators,
}
