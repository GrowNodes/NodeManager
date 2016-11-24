import React from 'react';
import { Component } from 'react';

import Navbar from '../Navbar/components/Navbar';

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
