import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import * as React from "react";
import "./loadingNavItem.css";

interface IPropsLoadingNavItem {
  value: number;
  type: string;
}

export default class LoadingNavItem extends React.Component<
  IPropsLoadingNavItem
> {
  public render() {
    return (
      <div className="loadingItemWrapper">
        <Spinner size={SpinnerSize.xSmall} className="loadingNavItemSpinner" />
        <label className="loadingNavItemSpinnerLabel">
          Loading {this.props.value}{" "}
          {this.props.value === 1 ? this.props.type : this.props.type + "s"}
        </label>
      </div>
    );
  }
}
