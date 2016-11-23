import { combineReducers } from 'redux';
import NodesReducer from './reducer_nodes'
import MqttReducer from './reducer_mqtt'
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';


function lastAction(state = null, action) {
  return action;
}

const rootReducer = combineReducers({
  auth: authReducer,
  nodes: NodesReducer,
  form: formReducer,
  lastAction: lastAction,
  mqtt: MqttReducer
});

export default rootReducer;
