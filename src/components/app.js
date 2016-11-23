import React from 'react';
import { Component } from 'react';

import MqttConnection from '../containers/MqttConnection';
import NodesList from '../containers/NodesList';

export default class App extends Component {
  render() {
    return (
        <div>
        	<MqttConnection />
        	<NodesList />
        	<hr/>
            {this.props.children}
        </div>
    );
  }
}
