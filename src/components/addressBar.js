import React from 'react';
import { Breadcrumb } from 'office-ui-fabric-react/lib/Breadcrumb';

export default class AddressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [] };
    }

    static _onBreadcrumbItemClicked(event, item) {
        console.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let items = [];
        const { selectedNav, onenote } = nextProps;
        for (let i = 0; i < selectedNav.length; i++) {
            const id = selectedNav[i];
            const element = onenote[id];
            items.push({
                text: element.displayName || element.title,
                key: (element.displayName || element.title) + "breadcrumb",
                onClick: AddressBar._onBreadcrumbItemClicked,
                isCurrentItem: (i === selectedNav.length - 1)
            });
        }
        return { ...prevState, items };
    }

    returnUndefined() {
        return undefined;
    }

    render() {
        return (
            <Breadcrumb
                items={this.state.items}
                // Returning undefined to OnReduceData tells the breadcrumb not to shrink
                onReduceData={ this.returnUndefined }
                maxDisplayedItems={4}
            />
        );
    }
}
