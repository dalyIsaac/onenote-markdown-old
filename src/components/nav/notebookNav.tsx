import { Icon } from "office-ui-fabric-react";
import * as React from "react";
import { IPropsNotebookNav } from "../../containers/notebookNav";
import AddNavItem from "./addNavItem";
import LoadingNavItem from "./loadingNavItem";
import NavItem from "./navItem";
import "./notebookNav.css";

interface IStateNotebookNav {
  icon: JSX.Element;
}

interface IPropsNotebookNavExternal {
  addNotebook(ev: React.MouseEvent<Element>): React.MouseEvent<Element>;
}

export default class NotebookNav extends React.Component<
  IPropsNotebookNav & IPropsNotebookNavExternal,
  IStateNotebookNav
> {
  constructor(props: IPropsNotebookNav & IPropsNotebookNavExternal) {
    super(props);
    this.state = {
      icon: <Icon iconName="Dictionary" className="icon" />
    };
  }

  public render() {
    const templates = [];
    for (const id of this.props.notebookOrder) {
      const notebook = this.props.onenote[id];
      if (notebook !== undefined) {
        templates.push(
          <NavItem
            item={notebook}
            key={notebook.id}
            isSelected={this.props.selectedNav[0] === notebook.id}
            updateSelected={this.props.updateSelected}
            icon={this.state.icon}
            navItemContexts={[]}
          />
        );
      }
    }
    if (this.props.totalNotebookLength !== this.props.notebookOrder.length) {
      templates.push(
        <LoadingNavItem
          value={
            this.props.totalNotebookLength - this.props.notebookOrder.length
          }
          type="notebook"
          key="notebookLoadingNumber"
        />
      );
    }

    templates.push(
      <AddNavItem
        key="openNotebooks"
        iconName="Add"
        text="Open notebooks"
        onClick={this.props.addNotebook}
      />
    );
    return <nav className="notebookNav">{templates}</nav>;
  }
}
