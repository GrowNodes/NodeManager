import React from 'react';
import { Component } from 'react';

import IfAuthed from '../containers/IfAuthed'
import Navbar from '../containers/Navbar';

export default class App extends Component {
  render() {
    return (
        <div>
        	<IfAuthed />
        	<Navbar />
        	<hr/>
            {this.props.children}
        </div>
    );
  }
}
