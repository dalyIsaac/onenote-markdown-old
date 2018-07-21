import { Spinner, SpinnerSize } from "office-ui-fabric-react";
import * as React from "react";
import "./loadingNavItem.css";

export interface IPropsLoadingNavItem {
  /**
   * The number of items loading
   */
  value: number;

  /**
   * The type of the data. e.g. Notebook, Section Group, Section, Page.
   * It is displayed to the user. e.g. `Loading 3 Notebooks`
   */
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
