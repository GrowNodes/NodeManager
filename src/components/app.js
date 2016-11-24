import React from 'react';
import { Component } from 'react';

import Navbar from '../containers/Navbar';

export default class App extends Component {
  render() {
    return (
        <div>
        	<Navbar />
        	<hr/>
            {this.props.children}
        </div>
    );
  }
}
