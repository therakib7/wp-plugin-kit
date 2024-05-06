/**
 * Internal dependencies.
 */

import { CrudState } from '@/interfaces';

const selectors = {
	getForm( state: CrudState ) {
		const { form } = state;

		return form;
	},

	getCategories(state: CrudState) {
        const { categories } = state;

        return categories;
    },

	getIsLoading( state: CrudState ) {
		const { isLoading } = state;

		return isLoading;
	},

	getIsSaving( state: CrudState ) {
		const { isSaving } = state;

		return isSaving;
	},

	getIsDeleting( state: CrudState ) {
		const { isDeleting } = state;

		return isDeleting;
	},

	getCurrentPage( state: CrudState ) {
		const { currentPage } = state;

		return currentPage;
	},

	getPerPage( state: CrudState ) {
		const { perPage } = state;

		return perPage;
	},

	getItems( state: CrudState ) {
		const { items } = state;

		return items;
	},

	getTotalItems( state: CrudState ) {
		const { totalItems } = state;

		return totalItems;
	},

	getTotalPages( state: CrudState ) {
		const { totalPages } = state;

		return totalPages;
	},

	getCurrentItem( state: CrudState ) {
		const { currentItem } = state;

		return currentItem;
	},

	getSelectedItems( state: CrudState ) {
		const { selectedItems } = state;

		return selectedItems;
	},

	getFilters( state: CrudState ) {
		const { filters } = state;

		return filters;
	},

	getErrors( state: CrudState ) {
		const { errors } = state;

		return errors;
	},
};

export default selectors;
