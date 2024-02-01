/**
 * Internal dependencies.
 */

import { IItems } from '@interfaces';

const selectors = {

    getForm(state: IItems) {
        const { form } = state;

        return form;
    },

    getItems(state: IItems) {
        const { items } = state;

        return items;
    },

    getItemDetail(state: IItems) {
        const { item } = state;

        return item;
    },

    getLoading(state: IItems) {
        const { loading } = state;

        return loading;
    },

    getSaving(state: IItems) {
        const { saving } = state;

        return saving;
    },

    getDeleting(state: IItems) {
        const { deleting } = state;

        return deleting;
    },

    getTotal(state: IItems) {
        const { total } = state;

        return total;
    },

    getTotalPage(state: IItems) {
        const { totalPage } = state;

        return totalPage;
    },

    getCurrentPage(state: IItems) {
        const { currentPage } = state;

        return currentPage;
    },

    getPerPage(state: IItems) {
        const { perPage } = state;

        return perPage;
    },

    getFilter(state: IItems) {
        const { filters } = state;

        return filters;
    },

    getErrors(state: IItems) {
        const { errors } = state;

        return errors;
    },

    getItemTypes(state: IItems) {
        const { types } = state;

        return types;
    },
};

export default selectors;
