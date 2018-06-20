import { SectionGroup as ISectionGroup } from "@microsoft/microsoft-graph-types";
import { deflateObject } from 'src/types';
import { Section } from './Section';

/**
 * Deflated section group from Microsoft Graph with some custom attributes
 * @export
 * @class SectionGroup
 */
export class SectionGroup {
    public userId: string | undefined;
    public sectionGroups: SectionGroup[];
    public sections: Section[];
    public isExpanded = false;

    constructor(sectionGroup: ISectionGroup, userId: undefined) {
        this.sectionGroups = [];
        this.sections = [];
        this.userId = userId;
        deflateObject(this, sectionGroup);
    }
}
