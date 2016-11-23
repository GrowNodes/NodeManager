import React from 'react';
import { Component } from 'react';

import MqttConnection from '../containers/MqttConnection';
import Navbar from '../components/Navbar';

export default class App extends Component {
  render() {
    return (
        <div>
        	<MqttConnection />
        	<Navbar />
        	<hr/>
            {this.props.children}
        </div>
    );
  }
}
