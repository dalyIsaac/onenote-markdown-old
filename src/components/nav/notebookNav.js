import * as React from "react";
import NotebookNavItem from "./notebookNavItem";

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
        return (<nav>{templates}</nav>);
    }
}