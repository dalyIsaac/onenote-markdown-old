import React from "react";
import PropTypes from "prop-types";
import NavItem from "./navItem";
import LoadingNavItem from "./loadingNavItem";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import "./sectionsNav.css";

export default class SectionsNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionIcon: <Icon iconName="Section" className="icon rotatedIcon" />,
            sectionGroupIcon: <Icon iconName="Sections" className="icon rotatedIcon" />,
            downChevronIcon: <Icon iconName="ChevronDown" className="icon" />,
            rightChevronIcon: <Icon iconName="ChevronRight" className="icon" />,
            templates: []
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.selectedNav.length > 0) {
            const notebook = nextProps.onenote[nextProps.selectedNav[0]];
            const sectionGroups = SectionsNav.getNavItems(notebook.sectionGroups, false, prevState, nextProps);
            const sections = SectionsNav.getNavItems(notebook.sections, true, prevState, nextProps);
            return { ...prevState, templates: sections.concat(sectionGroups) };
        }
        return null;
    }

    render() {
        return (<nav>{this.state.templates}</nav>);
    }

    /**
     * Returns an array of the nav items
     * @param {Array} idList 
     * @param {boolean} isSection `true` if `idList` is a section, `false` if it is a notebook or a section group
     * @param {Object} prevState Previous state, with keys `sectionIcon` and `sectionGroupIcon`
     * @param {*} nextProps Next props
     * @param {number} Indentation The indentation of the nav item
     */
    static getNavItems(idList, isSection, prevState, nextProps, indentation = 0) {
        let templates = [];
        let numLoading = 0;
        for (let i = 0; i < idList.length; i++) {
            const id = idList[i];
            const element = nextProps.onenote[id];
            if (element !== undefined) {
                const icon = isSection ?
                    prevState["sectionIcon"] : (
                        <span>
                            {prevState["sectionGroupIcon"]}
                            {prevState[element.isExpanded ? "downChevronIcon" : "rightChevronIcon"]}
                        </span>
                    );
                templates.push(
                    <NavItem
                        item={element}
                        key={element.id}
                        isSelected={nextProps.selectedNav.includes(element.id)}
                        icon={icon}
                        navItemContexts={[]}
                        updateSelected={nextProps.updateSelected}
                        indentation={indentation}
                        updateIsExpanded={isSection ? undefined : nextProps.updateIsExpanded}
                    />);
                if (element.hasOwnProperty("isExpanded") && element.isExpanded) {
                        templates.push(...SectionsNav.getNavItems(element.sectionGroups, false, prevState, nextProps, indentation + 1));
                        templates.push(...SectionsNav.getNavItems(element.sections, true, prevState, nextProps, indentation + 1));
                }
            } else {
                numLoading += 1;
            }
        }
        if (numLoading !== 0) {
            const type = isSection ? "sections" : "section groups";
            templates.push(
                <LoadingNavItem
                    number={numLoading}
                    type={type}
                    key={`${type}loading`}
                />
            );
        }
        return templates;
    }
}

SectionsNav.propTypes = {
    onenote: PropTypes.object.isRequired,
    selectedNav: PropTypes.array.isRequired
};
