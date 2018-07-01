import { Icon } from "office-ui-fabric-react/lib-commonjs/Icon";
import * as React from "react";
import "./addNavItem.css";

interface IPropsAddNavItem {
  iconName: string;
  text: string;
  onClick(ev: React.MouseEvent): React.MouseEvent;
}

export default class AddNavItem extends React.Component<IPropsAddNavItem> {
  public render() {
    return (
      <button className="addNavItemButton" onClick={this.props.onClick}>
        <div className="addNavItemWrapper">
          <Icon iconName={this.props.iconName} className="icon addIcon" />
          <label className="addNavItemLabel">{this.props.text}</label>
        </div>
      </button>
    );
  }
}
