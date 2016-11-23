import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';


import { Router, browserHistory } from 'react-router';
import routes from './routes'

import reducers from './reducers';
import promise from 'redux-promise'
import thunkMiddleware from 'redux-thunk';

import MqttInstance from './utils/Mqtt.js';
import * as Actions from './actions';
import * as ActionTypes from './actions/types.js';


 const createStoreWithMiddleware = applyMiddleware(
    promise, thunkMiddleware
)(createStore);
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


const URL = 'test.mosquitto.org';
const sock = {
  ws: null,
  URL: 'test.mosquitto.org',
  wsDipatcher: (topic, message) => {
    return store.dispatch(Actions.mqttIncoming(topic, message));
  },
  wsListener: () => {
    const { lastAction } = store.getState();

    switch (lastAction.type) {
      case ActionTypes.POST_MESSAGE:
        return sock.ws.postMessage(lastAction.text);

      case ActionTypes.MQTT_CONNECT:
      	console.log("starting")
  	console.log(lastAction);
        return sock.startWS(lastAction.payload);

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
  startWS: (topics) => {
    if(!!sock.ws) sock.ws.close();

    sock.ws = new MqttInstance(sock.URL, sock.wsDipatcher, topics)
  }
};
// sock.wsListener();
store.subscribe(sock.wsListener);


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes(store)}</Router>
  </Provider>
  , document.querySelector('.container'));
