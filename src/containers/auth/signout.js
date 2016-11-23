import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth/signout'

class SignOut extends Component {
    componentDidMount() {
        this.props.signoutUser();
    }

    render () {
        return (
            <div>You have been signed out</div>
        );
    }
}

export default connect(null, actions)(SignOut);
