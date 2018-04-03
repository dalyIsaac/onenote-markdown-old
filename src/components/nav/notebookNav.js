import * as React from "react";
import PropTypes from "prop-types";
import NotebookNavItem from "./notebookNavItem";
import AddNavItem from "./addNavItem";

export default class NotebookNav extends React.Component {
    render() {
        let templates = [];
        for (let i = 0; i < this.props.notebookOrder.length; i++) {
            const id = this.props.notebookOrder[i];
            const notebook = this.props.notebooks[id];
            if (notebook !== undefined) {
                templates.push(
                    <NotebookNavItem
                        notebook={notebook}
                        key={notebook.id}
                        selected={this.props.selectedNav[0] === notebook.id}
                        updateSelectedNotebook={this.props.updateSelectedNotebook}
                        closeNotebook={this.props.closeNotebook}
                    />
                );
            }
        }
        if (this.props.totalNotebookLength !== this.props.notebookOrder.length) {
            templates.push(<h1 key="test">Hang on</h1>);
        }

        templates.push(<AddNavItem
            key="openNotebooks"
            iconName="Add"
            text="Open notebooks"
            onClick={this.props.addNotebook} />);
        return (<nav>{templates}</nav>);
    }
}

NotebookNav.propTypes = {
    notebooks: PropTypes.object.isRequired,
    notebookOrder: PropTypes.array.isRequired,
    selectedNav: PropTypes.array.isRequired,
    totalNotebookLength: PropTypes.number.isRequired,
    updateSelectedNotebook: PropTypes.func.isRequired,
    closeNotebook: PropTypes.func.isRequired,
    addNotebook: PropTypes.func.isRequired
}
