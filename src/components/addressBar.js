import * as React from 'react';
import { Breadcrumb} from 'office-ui-fabric-react/lib/Breadcrumb';

export class AddressBarComponent extends React.Component {
    _onBreadcrumbItemClicked(event, item) {
        console.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
    }

    render() {
        return (
            <Breadcrumb
                items={ [
                { text: 'Notebook', 'key': 'f1', onClick: this._onBreadcrumbItemClicked },
                { text: 'Section Group', 'key': 'f2', onClick: this._onBreadcrumbItemClicked },
                { text: 'Section', 'key': 'f3', onClick: this._onBreadcrumbItemClicked },
                { text: 'Page', 'key': 'f4', onClick: this._onBreadcrumbItemClicked, isCurrentItem: true }
                ] }
                // Returning undefined to OnReduceData tells the breadcrumb not to shrink
                onReduceData={ this._returnUndefined }
                maxDisplayedItems={ 4 }
                ariaLabel={ 'Website breadcrumb' }
            />
          );
    }
}
