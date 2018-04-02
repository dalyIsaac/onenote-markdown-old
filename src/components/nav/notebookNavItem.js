import * as React from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Callout, DirectionalHint } from "office-ui-fabric-react/lib/Callout";
import NavContextItem from "./navContextItem";
import "./notebookNavItem.css";

export default class NotebookNavItem extends React.Component {
    constructor(props) {
        super(props);
        this.onContextMenu = this.onContextMenu.bind(this);
        this.onClick = this.onClick.bind(this);
        this.assignRef = this.assignRef.bind(this);
        this.calloutDismiss = this.calloutDismiss.bind(this);
        this.closeNotebook = this.closeNotebook.bind(this);
        this.targetElement = null;
        this.state = { rightClick: false };
    }

    render() {
        // handles overflows
        let text = this.props.notebook.displayName.slice(0, 20);
        if (text !== this.props.notebook.displayName) {
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
                        <Icon iconName="Dictionary" className="icon" />
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
                            <NavContextItem
                                text="Close notebook"
                                iconName="DictionaryRemove"
                                onClick={this.closeNotebook}
                                calloutDismiss={this.calloutDismiss} />
                        </div>
                    </Callout> : null
                }
            </div>
        );
    }

    closeNotebook() {
        this.props.closeNotebook(this.props.notebook.id);
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
        this.props.updateSelectedNotebook(this.props.notebook.id);
    }
}
