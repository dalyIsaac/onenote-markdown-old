import React from "react";
import PropTypes from "prop-types";
import NavItem from "./navItem";
import AddNavItem from "./addNavItem";
import LoadingNavItem from "./loadingNavItem";
import { Icon } from "office-ui-fabric-react/lib/Icon";

export default class NotebookNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: <Icon iconName="Dictionary" className="icon"/>
        };
    }
    render() {
        let templates = [];
        for (let i = 0; i < this.props.notebookOrder.length; i++) {
            const id = this.props.notebookOrder[i];
            const notebook = this.props.onenote[id];
            if (notebook !== undefined) {
                templates.push(
                    <NavItem 
                        item={notebook}
                        key={notebook.id}
                        selected={this.props.selectedNav[0] === notebook.id}
                        updateSelected={this.props.updateSelectedNotebook}
                        icon={this.state.icon}              
                        navItemContexts={[]}
                    />
                );
            }
        }
        if (this.props.totalNotebookLength !== this.props.notebookOrder.length) {
            templates.push(
                <LoadingNavItem
                    number={this.props.totalNotebookLength - this.props.notebookOrder.length}
                    key="notebookLoadingNumber"
                />);
        }

        templates.push(
            <AddNavItem
                key="openNotebooks"
                iconName="Add"
                text="Open notebooks"
                onClick={this.props.addNotebook} />);
        return (<nav style={{ width: 300 }}>{templates}</nav>); // in future this will be customizable
    }
}

NotebookNav.propTypes = {
    onenote: PropTypes.object.isRequired,
    notebookOrder: PropTypes.array.isRequired,
    selectedNav: PropTypes.array.isRequired,
    totalNotebookLength: PropTypes.number.isRequired,
    updateSelectedNotebook: PropTypes.func.isRequired,
    addNotebook: PropTypes.func.isRequired
}
