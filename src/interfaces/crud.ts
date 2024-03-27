/**
 * Internal dependencies.
 */

export interface CrudState {

    /**
     * Item Form data.
     */
    form: object;

    /**
     * All items as array of object.
     */
    itemList: Array<object>;

    /**
     * Item details.
     */
    currentItem: object;

    /**
     * Is items isLoading.
     */
    isLoading: boolean;

    /**
     * Item isSaving or not.
     */
    isSaving: boolean;

    /**
     * Item deleting or not.
     */
    isDeleting: boolean;

    /**
     * Count total number of items.
     */
    totalItems: number;

    /**
     * Count total page.
     */
    totalPages: number;

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
}