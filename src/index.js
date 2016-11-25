import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';


import { Router, browserHistory } from 'react-router';
import routes from './routes'

import reducers from './App/reducers/app_reducer';
import promise from 'redux-promise'
import thunkMiddleware from 'redux-thunk';

import MqttInstance from './Mqtt/Mqtt.js';
import * as MqttActions from './Mqtt/actions/mqtt_actions';
import * as ActionTypes from './Mqtt/actions/types.js';


 const createStoreWithMiddleware = applyMiddleware(
    promise, thunkMiddleware
)(createStore);
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


const URL = 'test.mosquitto.org';
const sock = {
  ws: null,
  URL: 'test.mosquitto.org',
  wsDipatcher: (topic, message) => {
    return store.dispatch(MqttActions.mqttIncoming(topic, message));
  },
  wsListener: () => {
    const { lastAction } = store.getState();

    switch (lastAction.type) {
      case ActionTypes.POST_MESSAGE:
        return sock.ws.postMessage(lastAction.text);

      case ActionTypes.MQTT_CONNECT:
        return sock.startWS();

      case ActionTypes.MQTT_DISCONNECT:
        return sock.stopWS();

      default:
        return;
    }
  },
  stopWS: () => {
    sock.ws.close();
    sock.ws = null
  },
  startWS: () => {
    if(!!sock.ws) sock.ws.close();
    const { nodes } = store.getState();
    const serials = Object.keys(nodes)
    sock.ws = new MqttInstance(sock.URL, sock.wsDipatcher, serials)
  }
};
// sock.wsListener();
store.subscribe(sock.wsListener);


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes(store)}</Router>
  </Provider>
  , document.querySelector('.container'));
