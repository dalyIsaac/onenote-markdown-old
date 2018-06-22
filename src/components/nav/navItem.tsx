import { Callout, DirectionalHint } from "office-ui-fabric-react/lib/Callout";
import * as React from "react";
import { IUpdateIsExpanded } from "../../actions/onenote";
import { IUpdateSelected } from "../../actions/selectedNav";
import { Notebook } from "../../types/Notebook";
import { Page } from "../../types/Page";
import { Section } from "../../types/Section";
import { SectionGroup } from "../../types/SectionGroup";
import "./navItem.css";

interface IStateNavItem {
  rightClick: boolean;
}

interface IPropsNavItem {
  icon?: React.ReactElement<{}>;
  item: Notebook | SectionGroup | Section | Page;
  key: string;
  indentation?: number;
  isSelectable?: boolean;
  isSelected: boolean;
  navItemContexts: JSX.Element[];
  updateSelected(id: string): IUpdateSelected;
  updateIsExpanded?(id: string, isExpanded: boolean): IUpdateIsExpanded;
}

export default class NavItem extends React.Component<
  IPropsNavItem,
  IStateNavItem
> {
  public static defaultProps: Partial<IPropsNavItem> = {
    indentation: 0,
    isSelectable: true
  };

  private targetElement: HTMLButtonElement | null;

  constructor(props: IPropsNavItem) {
    super(props);
    this.onContextMenu = this.onContextMenu.bind(this);
    this.onClick = this.onClick.bind(this);
    this.assignRef = this.assignRef.bind(this);
    this.calloutDismiss = this.calloutDismiss.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
    this.state = { rightClick: false };
  }

  public render() {
    // handles overflows
    const displayName =
      this.props.item.displayName || (this.props.item as Page).title; // allows for pages
    let text = displayName.slice(0, 40);
    if (text !== displayName) {
      text += "...";
    }
    return (
      <div style={{ marginLeft: (this.props.indentation as number) * 10 || 0 }}>
        <button
          className={
            (this.props.isSelected ? "navItemSelected" : "") + " navItem"
          }
          onClick={this.onClick}
          onContextMenu={this.onContextMenu}
          ref={this.assignRef}
        >
          <div className="navItemWrapper">
            {this.props.icon}
            <label>{text}</label>
          </div>
        </button>
        {this.state.rightClick ? (
          <Callout
            target={this.targetElement}
            onDismiss={this.calloutDismiss}
            directionalHint={DirectionalHint.rightTopEdge}
            isBeakVisible={false}
          >
            <div>{this.props.navItemContexts}</div>
          </Callout>
        ) : null}
      </div>
    );
  }

  public assignRef(targetElement: HTMLButtonElement | null): any {
    this.targetElement = targetElement;
  }

  public calloutDismiss() {
    this.setState({ rightClick: false });
  }

  public onContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    this.onClick();
    this.setState({ rightClick: true });
  }

  public onClick() {
    const item = this.props.item;
    if (this.props.isSelected) {
      this.updateSelected(
        item["parentSectionGroup.id"] || item["parentNotebook.id"] || item.id
      );
      if (this.propsIsExpandable()) {
        this.updateIsExpanded(item.id, false);
      }
    } else {
      if (this.propsIsExpandable()) {
        if ((item as SectionGroup | Page).isExpanded) {
          this.updateIsExpanded(item.id, false);
          this.updateSelected(
            item.hasOwnProperty("parentSectionGroup.id")
              ? item["parentSectionGroup.id"]
              : item["parentNotebook.id"]
          );
        } else {
          this.updateSelected(item.id);
          this.updateIsExpanded(item.id, true);
        }
      } else {
        this.updateSelected(item.id);
      }
    }
  }

  /**
   * Updates the selected items
   * @param id Id of the newly selected item
   */
  public updateSelected(id: string) {
    if (this.props.isSelectable !== false) {
      this.props.updateSelected(id);
    }
  }

  private propsIsExpandable(): boolean {
    return this.props.updateIsExpanded === undefined;
  }

  private updateIsExpanded(id: string, isExpanded: boolean) {
    if (this.props.updateIsExpanded) {
      this.props.updateIsExpanded(id, isExpanded);
    }
  }
}
