import { Icon } from "office-ui-fabric-react";
import * as React from "react";
import "./navItemContext.css";

export interface IPropsNavItemContext {
  text: string;
  iconName: string;
  onClick(): React.MouseEvent;
  calloutDismiss(): void;
}

export default class NavItemContext extends React.Component<
  IPropsNavItemContext
> {
  constructor(props: IPropsNavItemContext) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  public render() {
    return (
      <button className="navItemContextWrapper" onClick={this.onClick}>
        <div>
          <Icon iconName={this.props.iconName} className="icon" />
          <label>{this.props.text}</label>
        </div>
      </button>
    );
  }

  public onClick() {
    this.props.onClick();
    this.props.calloutDismiss();
  }
}
