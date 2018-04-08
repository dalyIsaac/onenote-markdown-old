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
            templates: []
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.selectedNav.length > 0) {
            const notebook = nextProps.onenote[nextProps.selectedNav[0]];
            const sectionGroups = SectionsNav.getNavItems(notebook.sectionGroups, "section groups", prevState.sectionGroupIcon, nextProps);
            const sections = SectionsNav.getNavItems(notebook.sections, "sections", prevState.sectionIcon, nextProps);
            return { ...prevState, templates: sections.concat(sectionGroups) };
        }
        return null;
    }

    render() {
        return (<nav style={{ width: 300 }}>{this.state.templates}</nav>); // in future this will be customizable
    }

    static getNavItems(idList, type, icon, nextProps) {
        let templates = [];
        let numLoading = 0;
        for (let i = 0; i < idList.length; i++) {
            const id = idList[i];
            const element = nextProps.onenote[id];
            if (element !== undefined) {
                templates.push(
                    <NavItem
                        item={element}
                        key={element.id}
                        selected={nextProps.selectedNav.includes(element.id)}
                        // updateSelected={}
                        icon={icon}
                        navItemContexts={[]}
                    />);
            } else {
                numLoading += 1;
            }
        }
        if (numLoading !== 0) {
            templates.push(
                <LoadingNavItem
                    number={numLoading}
                    type={type}
                    key="sectionLoadingNumber"
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
