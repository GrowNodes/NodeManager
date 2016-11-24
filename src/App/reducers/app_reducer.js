import { combineReducers } from 'redux';
import NodesReducer from '../../Nodes/reducers/reducer_nodes'
import MqttReducer from '../../Mqtt/reducers/reducer_mqtt'
import { reducer as formReducer } from 'redux-form';
import authReducer from '../../Auth/reducers/auth_reducer';


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
