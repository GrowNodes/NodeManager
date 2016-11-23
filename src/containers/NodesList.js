import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import NodesListItem from '../components/NodesListItem'

class NodesList extends Component {
    renderNodesListItems() {
        const mqtt = this.props.mqtt;
        return Object.keys(mqtt).map((key, index) => {
           return <NodesListItem node={mqtt[key]} serial={key} key={key}/>
        });
    }


    render() {
        if (this.props.mqtt) {
            return(
                <div>
                    <strong>Available Nodes</strong>
                    <ul>
                        {this.renderNodesListItems()}
                    </ul>
                </div>
            )
        } else {
            return null;
        }
    }
}

function mapStateToProps (state) {
    return { mqtt: state.mqtt}
}

export default connect(mapStateToProps, null)(NodesList);