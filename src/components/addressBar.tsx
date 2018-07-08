import { Breadcrumb, IBreadcrumbItem } from "office-ui-fabric-react";
import * as React from "react";
import { IPropsAddressBar } from "../containers/addressBar";
import { Page } from "../types/Page";
import "./addressBar.css";

interface IStateAddressBar {
  items: IBreadcrumbItem[];
}

export default class AddressBar extends React.Component<
  IPropsAddressBar,
  IStateAddressBar
> {
  public static getDerivedStateFromProps(
    nextProps: IPropsAddressBar,
    prevState: IStateAddressBar
  ) {
    const items = [];
    const elements = []; // used for determining if the final item is a section/page. If it's not, only the notebook is shown
    const { selectedNav, onenote } = nextProps;
    for (let i = 0; i < selectedNav.length; i++) {
      const id = selectedNav[i];
      const element = onenote[id];
      elements.push(element);
      items.push({
        isCurrentItem: i === selectedNav.length - 1,
        key: id + "breadcrumb",
        onClick: AddressBar.onBreadcrumbItemClicked,
        text: element.displayName || (element as Page).title
      });
    }

    // CAN BE REMOVED IF IT IS DESIRED THAT SECTION GROUPS ARE SHOWN AS THE LAST ITEMS IN THE ADDRESS BAR
    if (elements.length > 1) {
      const lastIndex = elements.length - 1;
      if (
        elements[lastIndex].hasOwnProperty("title") ||
        elements[lastIndex].hasOwnProperty("pages")
      ) {
        // the last item is a section/page
        return { ...prevState, items };
      } else {
        return { ...prevState, items: items.slice(0, 1) };
      }
    }
    // END OF POSSIBLE REMOVAL

    return { ...prevState, items };
  }

  private static updateSelected: any;

  private static onBreadcrumbItemClicked(
    event: React.MouseEvent<HTMLElement>,
    item: IBreadcrumbItem
  ) {
    const id = item.key.slice(0, -"breadcrumb".length);
    if (AddressBar.updateSelected !== undefined) {
      AddressBar.updateSelected(id);
    }
  }

  constructor(props: IPropsAddressBar) {
    super(props);
    this.state = {
      items: []
    };
    AddressBar.updateSelected = this.props.updateSelected;
  }

  public render() {
    document.title =
      this.state.items.length > 0
        ? this.state.items.map(item => item.text).join(">")
        : "OneNoteMarkdown";
    return (
      <Breadcrumb
        items={this.state.items}
        // Returning undefined to OnReduceData tells the breadcrumb not to shrink
        onReduceData={this.returnUndefined}
        maxDisplayedItems={4}
      />
    );
  }

  private returnUndefined() {
    return undefined;
  }
}
