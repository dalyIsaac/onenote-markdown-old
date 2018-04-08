import React from "react";
import PropTypes from "prop-types";
import { Callout, DirectionalHint } from "office-ui-fabric-react/lib/Callout";
import "./navItem.css";

export default class NavItem extends React.Component {
    constructor(props) {
        super(props);
        this.onContextMenu = this.onContextMenu.bind(this);
        this.onClick = this.onClick.bind(this);
        this.assignRef = this.assignRef.bind(this);
        this.calloutDismiss = this.calloutDismiss.bind(this);
        this.targetElement = null;
        this.state = { rightClick: false };
    }

    render() {
        // handles overflows
        let text = this.props.item.displayName.slice(0, 20);
        if (text !== this.props.item.displayName) {
            text += "...";
        }
        return (
            <div>
                <button
                    className={(this.props.selected ? "navItemSelected" : "") + " navItem"}
                    onClick={this.onClick}
                    onContextMenu={this.onContextMenu}
                    ref={this.assignRef}>
                    <div className="navItemWrapper">
                        {this.props.icon}
                        <label>{text}</label>
                    </div>
                </button>
                {this.state.rightClick ?
                    <Callout
                        target={this.targetElement}
                        onDismiss={this.calloutDismiss}
                        directionalHint={DirectionalHint.rightTopEdge}
                        isBeakVisible={false}>
                        <div>
                            { this.props.navItemContexts }
                        </div>
                    </Callout> : null
                }
            </div>
        );
    }

    assignRef(targetElement) {
        this.targetElement = targetElement;
    }

    calloutDismiss() {
        this.setState({ rightClick: false });
    }

    onContextMenu(e) {
        e.preventDefault();
        this.onClick();
        this.setState({ rightClick: true });
    }

    onClick() {
        this.props.updateSelected(this.props.item.id);
    }
}

NavItem.propTypes = {
    item: PropTypes.object.isRequired,
    navItemContexts: PropTypes.array.isRequired, // context menu items
    updateSelected: PropTypes.func.isRequired,
    icon: PropTypes.element.isRequired
}
