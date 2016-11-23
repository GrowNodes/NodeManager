import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNodes } from '../actions/index';
import { Link } from 'react-router';

class NodesIndex extends Component {
    render() {
        return (
            <div>
                <h1>Home Page</h1>
            </div>
        );
    }
}

export default NodesIndex;
