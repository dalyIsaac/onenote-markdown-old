import React from "react";
import PropTypes from "prop-types";
import NavItem from "./navItem";
import LoadingNavItem from "./loadingNavItem";

export default class PagesNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templates: []
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.selectedNav.length > 1) {
            const element = nextProps.onenote[nextProps.selectedNav[nextProps.selectedNav.length - 1]];
            let parentSection = undefined;
            if (element.hasOwnProperty("content")) { // the last selected item is a page
                parentSection = nextProps.onenote[nextProps.selectedNav[nextProps.selectedNav.length - 2]];
            } else if (element.hasOwnProperty("sectionGroups")) { // the last selected item is a section group or a notebook
                return { ...prevState, templates: [] };
            } else { // the last selected item is a section
                parentSection = element;
            }
            const sortedPages = PagesNav.countingSort(parentSection.pages, nextProps.onenote);
            const templates = PagesNav.getNavItems(sortedPages, nextProps, prevState, parentSection);
            return { ...prevState, templates };
        }
        return { ...prevState, templates: [] };
    }

    render() {
        return (<nav>{this.state.templates}</nav>);
    }

    /**
     * Returns an array of the nav items
     * @param {Array} sortedPages 
     * @param {Object} nextProps Next props
     * @param {Object} prevState Previous state, with keys `sectionIcon` and `sectionGroupIcon`
     * @param {Object} parentSection
     */
    static getNavItems(sortedPages, nextProps, prevState, parentSection) {
        let templates = [];
        for (let i = 0; i < sortedPages.length; i++) {
            const page = sortedPages[i];
            if (page !== undefined) {
                templates.push(
                    <NavItem
                        item={page}
                        key={page.id}
                        isSelected={nextProps.selectedNav[nextProps.selectedNav.length - 1] === page.id}
                        navItemContexts={[]}
                        updateSelected={nextProps.updateSelected}
                        indentation={page.level}
                        updateIsExpanded={nextProps.updateIsExpanded}
                    />);
            }
        }
        const numLoading = parentSection.pages.length - templates.length;
        if (numLoading !== 0) {
            templates.push(
                <LoadingNavItem
                    number={numLoading}
                    type="pages"
                    key="pagesLoading"
                />
            );
        }
        return templates;
    }

    /**
     * Counting sort is an `O(n)` sorting algorithm. It's ideal for this situation because there the keys are based
     * on a specific range.
     * @param {Object} elements Pages within a section which are to be sorted according to the `order` property
     * @param {Object} onenote onenote object
     */
    static countingSort(elements, onenote) {
        const arr = elements.filter(key => onenote[key] !== undefined).map(key => onenote[key]);
        let output = new Array(arr.length);
        let positions = PagesNav.keyPositions(arr);
        for (let i = 0; i < arr.length; i++) {
            output[positions[arr[i].order]] = arr[i];
            positions[arr[i].order] = positions[arr[i].order] + 1;
        }
        return output;
    }

    static keyPositions(elements) {
        const k = elements.length;
        let count = new Array(k);
        for (let i = 0; i < count.length; i++) {
            count[i] = 0;
        }
        for (let i = 0; i < elements.length; i++) {
            count[elements[i].order] = count[elements[i].order] + 1;
        }
        let sum = 0;
        for (let i = 0; i < count.length; i++) {
            [count[i], sum] = [sum, sum + count[i]];
        }
        return count;
    }
}

PagesNav.propTypes = {
    onenote: PropTypes.object.isRequired,
    selectedNav: PropTypes.array.isRequired
};
