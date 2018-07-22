import { Icon } from "office-ui-fabric-react";
import * as React from "react";
import { IPropsSectionNav } from "../../containers/sectionsNav";
import { Notebook } from "../../types/Notebook";
import { SectionGroup } from "../../types/SectionGroup";
import LoadingNavItem from "./loadingNavItem";
import NavItem from "./navItem";
import "./sectionsNav.css";

interface IStateSectionsNav {
  sectionIcon: JSX.Element;
  sectionGroupIcon: JSX.Element;
  downChevronIcon: JSX.Element;
  rightChevronIcon: JSX.Element;
  templates: JSX.Element[];
}

export default class SectionsNav extends React.Component<
  IPropsSectionNav,
  IStateSectionsNav
> {
  public static getDerivedStateFromProps(
    nextProps: IPropsSectionNav,
    prevState: IStateSectionsNav
  ) {
    if (nextProps.selectedNav.length > 0) {
      const notebook: Notebook = nextProps.onenote[
        nextProps.selectedNav[0]
      ] as Notebook;
      const sections = SectionsNav.getNavItems(
        notebook.sections,
        true,
        prevState,
        nextProps,
        notebook.id
      );
      const sectionGroups = SectionsNav.getNavItems(
        notebook.sectionGroups,
        false,
        prevState,
        nextProps,
        notebook.id
      );
      return { ...prevState, templates: sections.concat(sectionGroups) };
    }
    return null;
  }

  /**
   * Returns an array of the nav items
   * @param idList
   * @param isSection `true` if `idList` is a section, `false` if it is a notebook or a section group
   * @param Previous state, with keys `sectionIcon` and `sectionGroupIcon`
   * @param nextProps Next props
   * @param parentId This is used in the LoadingNavItem key
   * @param Indentation The indentation of the nav item
   */
  private static getNavItems(
    idList: string[],
    isSection: boolean,
    prevState: IStateSectionsNav,
    nextProps: IPropsSectionNav,
    parentId: string,
    indentation: number = 0
  ): JSX.Element[] {
    const templates: JSX.Element[] = [];
    let numLoading = 0;
    for (const id of idList) {
      const element = nextProps.onenote[id];
      if (element !== undefined) {
        const icon = isSection ? (
          prevState.sectionIcon
        ) : (
          <span>
            {prevState.sectionGroupIcon}
            {
              prevState[
                (element as SectionGroup).isExpanded
                  ? "downChevronIcon"
                  : "rightChevronIcon"
              ]
            }
          </span>
        );
        templates.push(
          <NavItem
            icon={icon}
            indentation={indentation}
            item={element}
            key={element.id}
            isSelectable={isSection ? true : false} // prevents section groups from being selectable
            isSelected={
              isSection ? nextProps.selectedNav.includes(element.id) : false
            } // prevents section groups from being selectable
            navItemContexts={[]}
            updateSelected={nextProps.updateSelected}
            updateIsExpanded={
              isSection ? undefined : nextProps.updateIsExpanded
            }
          />
        );
        if (element.hasOwnProperty("isExpanded")) {
          const el = element as SectionGroup;
          if (el.isExpanded) {
            templates.push(
              ...SectionsNav.getNavItems(
                el.sections,
                true,
                prevState,
                nextProps,
                element.id,
                indentation + 1
              )
            );
            templates.push(
              ...SectionsNav.getNavItems(
                el.sectionGroups,
                false,
                prevState,
                nextProps,
                element.id,
                indentation + 1
              )
            );
          }
        }
      } else {
        numLoading += 1;
      }
    }
    if (numLoading !== 0) {
      const type = isSection ? "section" : "section group";
      templates.push(
        <LoadingNavItem
          value={numLoading}
          type={type}
          key={`${type}${parentId}loading`}
        />
      );
    }
    return templates;
  }

  constructor(props: IPropsSectionNav) {
    super(props);
    this.state = {
      downChevronIcon: <Icon iconName="ChevronDown" className="icon" />,
      rightChevronIcon: <Icon iconName="ChevronRight" className="icon" />,
      sectionGroupIcon: (
        <Icon iconName="Sections" className="icon rotatedIcon" />
      ),
      sectionIcon: <Icon iconName="Section" className="icon rotatedIcon" />,
      templates: []
    };
  }

  public render() {
    return <nav className="sectionsNav">{this.state.templates}</nav>;
  }
}
