import React from 'react';
import { Component } from 'react';
import MqttConnection from '../containers/MqttConnection';

export default class App extends Component {
  render() {
    return (
        <div>
        	<MqttConnection />
            {this.props.children}
        </div>
    );
  }
}
