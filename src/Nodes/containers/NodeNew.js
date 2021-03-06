import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { createNode, fetchNodes } from '../actions/nodes_actions'
import {mqttConnect} from '../../Mqtt/actions/mqtt_actions'

class NodeNew extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props) {
        this.props.createNode(props.serial)   //props from the form
        .then(() => this.props.fetchNodes())
        .then(() => this.props.mqttConnect())
        .then(() => this.context.router.push(`/nodes/${props.serial}`))
    }

    render() {
        const { fields: { serial }, handleSubmit } = this.props;


        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <h3>New node</h3>
                    <div className={`form-group ${serial.touched && serial.invalid ? 'has-danger' : ''}`}>
                        <label>Serial Number</label>
                        <input type="text" className="form-control" {...serial} />
                        <div className="text-help">{serial.touched ? serial.error : ''}</div>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.serial) {
        errors.serial = 'Enter a serial number';
    };
    return errors;
}


// is just like connect, but new first arg is config object
export default reduxForm({
    form: 'NodeNewForm',
    fields: ['serial'],
    validate
}, null, { createNode, fetchNodes, mqttConnect })(NodeNew);
