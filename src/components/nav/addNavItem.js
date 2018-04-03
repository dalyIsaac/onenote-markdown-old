import * as React from 'react';
import { Icon } from "office-ui-fabric-react/lib/Icon";
import PropTypes from "prop-types";
import "./addNavItem.css";

export default class AddNavItem extends React.Component {
    render() {
        return (
            <div className="addNavItemWrapper">
                <button
                    className="addNavItem"
                    onClick={this.props.onClick}>
                    <div className="navItemWrapper">
                        <Icon iconName={this.props.iconName} className="icon" />
                        <label className="addNavItemLabel">{this.props.text}</label>
                    </div>
                </button>
            </div>
        );
    }
}

AddNavItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    iconName: PropTypes.string
}
