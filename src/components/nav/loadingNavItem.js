import * as React from 'react';
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import PropTypes from "prop-types";
import "./loadingNavItem.css";

export default class LoadingNavItem extends React.Component {
    render() {
        return (
            <div className="loadingItemWrapper">
                <Spinner size={SpinnerSize.xSmall} className="loadingNavItemSpinner" />
                <label className="loadingNavItemSpinnerLabel">Loading {this.props.number} notebooks</label>
            </div>
        );
    }
}

LoadingNavItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    SpinnerName: PropTypes.string
}
