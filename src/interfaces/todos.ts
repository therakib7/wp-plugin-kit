/**
 * Internal dependencies.
 */
interface ISelect2Input {

    /**
     * Placeholder text.
     */
    placeholder?: string;

    /**
     * Is Multi-Select or not.
     */
    isMulti?: boolean;

    /**
     * On change select2 input.
     */
    onChange?: (val: any) => void;
}

export interface IItem {
    /**
     * Item ID.
     */
    id: number;

    /**
     * Item title.
     */
    title: string;

    /**
     * Item description.
     */
    description: string;

    /**
     * Item Type ID.
     */
    type_id: number;

    /**
     * Status published or draft
     */
    is_active: boolean | number;

    /**
     * Item status.
     */
    status?: 'draft' | 'published' | 'trashed';
}

export interface IItemForm extends IItem {}

export interface IItems {

    /**
     * Item Form data.
     */
    form: IItemForm;

    /**
     * All items as array of IItem.
     */
    items: Array<IItem>;

    /**
     * Item details.
     */
    item: IItemForm;

    /**
     * Is items loading.
     */
    loading: boolean;

    /**
     * Item saving or not.
     */
    saving: boolean;

    /**
     * Item deleting or not.
     */
    deleting: boolean;

    /**
     * Count total number of items.
     */
    total: number;

    /**
     * Count total page.
     */
    totalPage: number;

    /**
     * Current page number of items.
     */
    currentPage: number;

    /**
     * Show number of items per page.
     */
    perPage: number;

    /**
     * Selected items for an action.
     */
    selectedItems: Array<number>;

    /**
     * Item list filter.
     */
    filters: object;

    /**
     * Item list error.
     */
    errors: object;

    /**
     * All item types as array of {label, value}.
     */
    types: Array<ISelect2Input>;
}

export interface IItemFilter {
    /**
     * Item filter by page no.
     */
    page?: number;

    /**
     * Item search URL params.
     */
    search?: string;
}

export interface IItemTypes {
    /**
     * Item type id.
     */
    id: number;

    /**
     * Item type name.
     */
    name: string;

    /**
     * Item type slug.
     */
    slug: string;

    /**
     * Item type description.
     */
    description: string | null;
}
