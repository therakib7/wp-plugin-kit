/**
 * Internal dependencies.
 */

import { CrudState } from '@interfaces';

const selectors = {

    getForm(state: CrudState) {
        const { form } = state;

        return form;
    },

    getItems(state: CrudState) {
        const { itemList } = state;

        return itemList;
    },

    getItemDetail(state: CrudState) {
        const { currentItem } = state;

        return currentItem;
    },

    getLoading(state: CrudState) {
        const { isLoading } = state;

        return isLoading;
    },

    getSaving(state: CrudState) {
        const { isSaving } = state;

        return isSaving;
    },

    getDeleting(state: CrudState) {
        const { isDeleting } = state;

        return isDeleting;
    },

    getTotalItems(state: CrudState) {
        const { totalItems } = state;

        return totalItems;
    },

    getTotalPages(state: CrudState) {
        const { totalPages } = state;

        return totalPages;
    },

    getCurrentPage(state: CrudState) {
        const { currentPage } = state;

        return currentPage;
    },

    getPerPage(state: CrudState) {
        const { perPage } = state;

        return perPage;
    },

    getFilter(state: CrudState) {
        const { filters } = state;

        return filters;
    },

    getErrors(state: CrudState) {
        const { errors } = state;

        return errors;
    },
};

export default selectors;
