import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';


import { Router, browserHistory } from 'react-router';
import routes from './routes'

import reducers from './reducers';
import promise from 'redux-promise'

import MqttInstance from './utils/Mqtt.js';
import * as ChatActions from './actions';
import * as ActionTypes from './actions/types.js';

const createStoreWithMiddleware = applyMiddleware(
    promise
)(createStore);
const finalStore = createStoreWithMiddleware(reducers)


const URL = 'test.mosquitto.org';
const sock = {
  ws: null,
  URL: 'test.mosquitto.org',
  wsDipatcher: (topic, message) => {
    return finalStore.dispatch(ChatActions.mqttIncoming(topic, message));
  },
  wsListener: () => {
    const { lastAction } = finalStore.getState();

    switch (lastAction.type) {
      case ActionTypes.POST_MESSAGE:
        return sock.ws.postMessage(lastAction.text);

      case ActionTypes.MQTT_CONNECT:
      	console.log("starting")
  	console.log(lastAction);
        return sock.startWS(lastAction.payload);

      case ActionTypes.DISCONNECT:
        return sock.stopWS();

      default:
        return;
    }
  },
  stopWS: () => {
    sock.ws.close();
    sock.ws = null
  },
  startWS: (channel) => {
    if(!!sock.ws) sock.ws.close();

    sock.ws = new MqttInstance(sock.URL, sock.wsDipatcher, channel)
  }
};
// sock.wsListener();
finalStore.subscribe(sock.wsListener);


ReactDOM.render(
  <Provider store={finalStore}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.container'));
