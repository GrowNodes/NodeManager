import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
class UserSettings extends Component {
    signInOutLink() {
        if (this.props.auth.authenticated) {
            return <Link to="/sign_out">Click here to sign out</Link>
        }
        return <Link to="/sign_in">Click here to sign in</Link>
    }


    render() {
        return (
            <div>
                <Link to="">Home</Link>
                <p>
                    <strong>{this.props.auth.authenticated ? `Signed in as ${this.props.auth.email}` : "Not signed in"}</strong><br/>
                    
                    {this.signInOutLink()}
                </p>
            </div>
            
        );
    }
}

function mapStateToProps (state) {
    return { auth: state.auth}
}

export default connect(mapStateToProps, null)(UserSettings);