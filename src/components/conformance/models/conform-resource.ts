import {SearchParameter}        from './structure-defenitions/search-parameter';
import {ConformSchemaModels}    from '../../conform-schema';

export interface RuleEntry {
    datakey: string;
    comparator: string;
    source: string;
    sourcekey: string;
}

export interface IConformResource {
    structure: ConformSchemaModels.StructureDefenition;
    queryables: Array<SearchParameter>;
    rules: Array<RuleEntry>;
}

export class ConformResource {
    /**
     * Parameters that can be queried / pre indexed variables
     */
    public queryables: Array<SearchParameter>;
    /**
     * Schema for this resource
     */
    public schema: {};
    /**
     * Rules for the usages of this resource
     */
    public rules: Array<RuleEntry>;
    /**
     * Name for the resource
     */
    public name: string;
    /**
     * Create a new resource conform to ORDS
     */
    constructor(data: IConformResource) {

        this.queryables = data.queryables;
        this.rules = data.rules;

        this.name = data.structure.id;
    }
}
