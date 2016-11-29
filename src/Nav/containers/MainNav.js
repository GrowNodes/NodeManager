import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class MainNav extends Component {
    render() {
        return (
            <div>
                <h1>Home Page</h1>
                <Link to="/nodes">Monitor Nodes</Link><br/>
                <Link to="/settings">Settings</Link><br/>
            </div>
        );
    }
}

export default MainNav;