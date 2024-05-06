/**
 * Internal dependencies.
 */
import { ACTION_TYPES } from './types';
import { defaultState } from './default-state';

const {
	SET_IS_LOADING,
	SET_IS_SAVING,
	SET_IS_DELETING,
	SET_CURRENT_PAGE,
	SET_PER_PAGE,
	GET_ITEMS,
	SET_TOTAL_ITEMS,
	SET_TOTAL_PAGES,
	GET_CURRENT_ITEM,
	GET_SELECTED_ITEMS,
	SET_FORM,
	SET_CATEGORIES,
	SET_FILTER,
	SET_ERROR
} = ACTION_TYPES;

const reducer = ( state = defaultState, action: any ) => {
	switch ( action.type ) {
		case SET_FORM:
			return {
				...state,
				form: action.form,
			};

		case SET_CATEGORIES:
			return {
				...state,
				categories: action.categories,
			};

		case SET_IS_LOADING:
			return {
				...state,
				isLoading: action.isLoading,
			};

		case SET_IS_SAVING:
			return {
				...state,
				isSaving: action.isSaving,
			};

		case SET_IS_DELETING:
			return {
				...state,
				isDeleting: action.isDeleting,
			};

		case SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.currentPage,
			};

		case SET_PER_PAGE:
			return {
				...state,
				perPage: action.perPage,
			};

		case GET_ITEMS:
			return {
				...state,
				items: action.items,
			};

		case SET_TOTAL_ITEMS:
			return {
				...state,
				totalItems: action.totalItems,
			};

		case SET_TOTAL_PAGES:
			return {
				...state,
				totalPages: action.totalPages,
			};

		case GET_CURRENT_ITEM:
			return {
				...state,
				currentItem: action.currentItem,
			};

		case GET_SELECTED_ITEMS:
			return {
				...state,
				selectedItems: action.selectedItems,
			};

		case SET_FILTER:
			return {
				...state,
				filters: action.filters,
			};

		case SET_ERROR:
			return {
				...state,
				errors: action.errors,
			};
	}

	return state;
};

export default reducer;
