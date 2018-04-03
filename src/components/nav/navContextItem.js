import * as React from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import PropTypes from 'prop-types';
import "./navContextItem.css";

export default class NavContextItem extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    render() {
        return (
            <button className="navContextItemWrapper" onClick={this.onClick}>
                <div>
                    <Icon iconName={this.props.iconName} className="icon" />
                    <label>{this.props.text}</label>
                </div>
            </button>);
    }

    onClick() {
        this.props.onClick();
        if (this.props.calloutDismiss !== undefined) {
            this.props.calloutDismiss();
        }
    }
}

NavContextItem.propTypes = {
    text: PropTypes.string.isRequired,
    iconName: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    calloutDismiss: PropTypes.func
}