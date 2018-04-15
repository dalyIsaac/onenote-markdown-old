import React from 'react';
import { Breadcrumb } from 'office-ui-fabric-react/lib/Breadcrumb';
import "./addressBar.css";

export default class AddressBar extends React.Component {
    constructor(props) {
        super(props);
        AddressBar.updateSelected = this.props.updateSelected;
        this.state = { items: [] };
    }

    static onBreadcrumbItemClicked(event, item) {
        const id = item.key.slice(0, -("breadcrumb".length));
        if (AddressBar.updateSelected !== undefined) {
            AddressBar.updateSelected(id);
        }
    }

    static updateSelected = undefined;

    static getDerivedStateFromProps(nextProps, prevState) {
        let items = [];
        let elements = []; // used for determining if the final item is a section/page. If it's not, only the notebook is shown
        const { selectedNav, onenote } = nextProps;
        for (let i = 0; i < selectedNav.length; i++) {
            const id = selectedNav[i];
            const element = onenote[id];
            elements.push(element);
            items.push({
                text: element.displayName || element.title,
                key: id + "breadcrumb",
                onClick: AddressBar.onBreadcrumbItemClicked,
                isCurrentItem: (i === selectedNav.length - 1)
            });
        }

        // CAN BE REMOVED IF IT IS DESIRED THAT SECTION GROUPS ARE SHOWN AS THE LAST ITEMS IN THE ADDRESS BAR
        if (elements.length > 1) {
            const lastIndex = elements.length - 1;
            if (elements[lastIndex].hasOwnProperty("title") || elements[lastIndex].hasOwnProperty("pages")) { // the last item is a section/page
                return { ...prevState, items };
            } else {
                return { ...prevState, "items": items.slice(0, 1)};
            }
        }
        // END OF POSSIBLE REMOVAL

        return { ...prevState, items };
    }

    returnUndefined() {
        return undefined;
    }

    render() {
        document.title = this.state.items.length > 0 ? this.state.items.map(item => item.text).join(">") : "OneNoteMarkdown";
        return (
            <Breadcrumb
                items={this.state.items}
                // Returning undefined to OnReduceData tells the breadcrumb not to shrink
                onReduceData={this.returnUndefined}
                maxDisplayedItems={4}
            />
        );
    }
}
