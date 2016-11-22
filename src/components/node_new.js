import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { createNode } from '../actions/index'

class NodeNew extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props) {
        this.props.createNode(props)   //props from the form
            .then(() => {
                // blog node has been created (promise has been resolved)
                this.context.router.push('/');
            });
    }

    render() {
        const { fields: { title, categories, content }, handleSubmit } = this.props;


        return (
            <div>
                <div className="text-xs-right">
                    <Link to="/" className="btn btn-primary">Back to Nodes</Link>
                </div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <h3>New node</h3>
                    <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
                        <label>Title</label>
                        <input type="text" className="form-control" {...title} />
                        <div className="text-help">{title.touched ? title.error : ''}</div>
                    </div>
                    <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
                        <label>Categories</label>
                        <input type="text" className="form-control" {...categories}/>
                        <div className="text-help">{categories.touched ? categories.error : ''}</div>
                    </div>
                    <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
                        <label>Content</label>
                        <textarea className="form-control" {...content}/>
                        <div className="text-help">{content.touched ? content.error : ''}</div>
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

    if (!values.title) {
        errors.title = 'Enter a username';
    };

    if (!values.categories) {
        errors.categories = 'Enter some categories';
    };

    if (!values.content) {
        errors.content = 'Enter soem content';
    };

    return errors;
}


// is just like connect, but new first arg is config object
export default reduxForm({
    form: 'NodeNewForm',
    fields: ['title', 'categories', 'content'],
    validate
}, null, { createNode })(NodeNew);
