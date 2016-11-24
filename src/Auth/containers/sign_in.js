import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { reduxForm } from 'redux-form';
import * as actions from '../actions/sign_in'

class SignIn extends Component {
    handleFormSubmit({email, password}) {
        this.props.signinUser({email, password})
    }

    renderError() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    {this.props.errorMessage}
                </div>
            );
        };
    }


    render () {
        const { handleSubmit, fields: {email, password}} = this.props;


        return (
            <div>
                <h4 className="uppercase">Login Here</h4>
                {this.renderError()}
                <form className="text-left" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <input {...email} type="text" className="mb0" autoFocus="true" placeholder="Email" />
                    <input {...password} type="password" className="mb0" placeholder="Password" />
                    <input type="submit" value="Sign In" />
                    <p className="mb0">Forgot your password?
                        <a href="#">Click Here To Reset</a>
                    </p>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'signin',
    fields: ['email', 'password']
}, mapStateToProps, actions)(SignIn);
