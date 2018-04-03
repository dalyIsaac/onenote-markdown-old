import * as React from "react";
import PropTypes from "prop-types";
import NotebookNavItem from "./notebookNavItem";
import AddNavItem from "./addNavItem";
import LoadingNavItem from "./loadingNavItem";

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
            templates.push(
                <LoadingNavItem
                    number={this.props.totalNotebookLength - this.props.notebookOrder.length}
                    key="notebookLoadingNumber"
                />);
        }

        templates.push(<AddNavItem
            key="openNotebooks"
            iconName="Add"
            text="Open notebooks"
            onClick={this.props.addNotebook} />);
        return (<nav style={{ width: 300 }}>{templates}</nav>);
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
