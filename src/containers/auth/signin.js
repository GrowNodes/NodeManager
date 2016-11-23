import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/auth/signin'

class SignIn extends Component {
    handleFormSubmit({email, password}) {
        console.log(this.props)
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
            <section className="cover fullscreen image-bg overlay">
                <div className="container v-align-transform">
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2">
                            <div className="feature bordered text-center">
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
                        </div>
                    </div>
                </div>
            </section>
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
