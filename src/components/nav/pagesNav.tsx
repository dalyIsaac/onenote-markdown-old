import * as React from "react";
import { IStateOneNote } from "src/reducers";
import { IPropsPagesNav } from "../../containers/pagesNav";
import { Page } from "../../types/Page";
import { Section } from "../../types/Section";
import LoadingNavItem from "./loadingNavItem";
import NavItem from "./navItem";
import "./pagesNav.css";

interface IStatePagesNav {
  templates: JSX.Element[];
}

export default class PagesNav extends React.Component<
  IPropsPagesNav,
  IStatePagesNav
> {
  public static getDerivedStateFromProps(
    nextProps: IPropsPagesNav,
    prevState: IStatePagesNav
  ) {
    if (nextProps.selectedNav.length > 1) {
      const element =
        nextProps.onenote[
          nextProps.selectedNav[nextProps.selectedNav.length - 1]
        ];
      let parentSection;
      if (element.hasOwnProperty("content")) {
        // the last selected item is a page
        parentSection =
          nextProps.onenote[
            nextProps.selectedNav[nextProps.selectedNav.length - 2]
          ];
      } else if (element.hasOwnProperty("sectionGroups")) {
        // the last selected item is a section group or a notebook
        return { ...prevState, templates: [] };
      } else {
        // the last selected item is a section
        parentSection = element;
      }
      const sortedPages = PagesNav.countingSort(
        (parentSection as Section).pages,
        nextProps.onenote
      );
      const templates = PagesNav.getNavItems(
        sortedPages,
        nextProps,
        prevState,
        parentSection as Section
      );
      return { ...prevState, templates };
    }
    return { ...prevState, templates: [] };
  }

  /**
   * Returns an array of the nav items
   * @param {Array} sortedPages
   * @param nextProps Next props
   * @param {Object} prevState Previous state, with keys `sectionIcon` and `sectionGroupIcon`
   * @param {Object} parentSection
   */
  private static getNavItems(
    sortedPages: Page[],
    nextProps: IPropsPagesNav,
    prevState: IStatePagesNav,
    parentSection: Section
  ) {
    const templates: JSX.Element[] = [];
    for (const page of sortedPages) {
      if (page !== undefined) {
        templates.push(
          <NavItem
            item={page}
            key={page.id}
            isSelected={
              nextProps.selectedNav[nextProps.selectedNav.length - 1] ===
              page.id
            }
            navItemContexts={[]}
            updateSelected={nextProps.updateSelected}
            indentation={page.level}
            updateIsExpanded={nextProps.updateIsExpanded}
          />
        );
      }
    }
    const numLoading = parentSection.pages.length - templates.length;
    if (numLoading !== 0) {
      templates.push(
        <LoadingNavItem value={numLoading} type="page" key="pagesLoading" />
      );
    }
    return templates;
  }

  /**
   * Counting sort is an `O(n)` sorting algorithm. It's ideal for this situation because there the keys are based
   * on a specific range.
   * @param elements Pages within a section which are to be sorted according to the `order` property
   * @param {Object} onenote onenote object
   */
  private static countingSort(
    elements: string[],
    onenote: IStateOneNote
  ): Page[] {
    const arr: Page[] = elements
      .filter(key => onenote[key] !== undefined)
      .map(key => onenote[key] as Page);
    const output = new Array(arr.length);
    const positions = PagesNav.keyPositions(arr);
    for (const item of arr) {
      output[positions[item.order]] = item;
      positions[item.order] = positions[item.order] + 1;
    }
    return output;
  }

  private static keyPositions(elements: Page[]): number[] {
    const k = elements.length;
    const count: number[] = new Array(k);
    for (let i = 0; i < count.length; i++) {
      count[i] = 0;
    }
    for (const el of elements) {
      count[el.order] = count[el.order] + 1;
    }
    let sum = 0;
    for (let i = 0; i < count.length; i++) {
      [count[i], sum] = [sum, sum + count[i]];
    }
    return count;
  }

  constructor(props: IPropsPagesNav) {
    super(props);
    this.state = {
      templates: []
    };
  }

  public render() {
    return <nav className="pagesNav">{this.state.templates}</nav>;
  }
}
