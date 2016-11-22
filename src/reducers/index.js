import { combineReducers } from 'redux';
import NodesReducer from './reducer_nodes'
import { reducer as formReducer } from 'redux-form';


function lastAction(state = null, action) {
  return action;
}

const rootReducer = combineReducers({
  nodes: NodesReducer,
  form: formReducer,
  lastAction: lastAction
});

export default rootReducer;
