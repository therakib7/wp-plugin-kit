/**
 * Internal dependencies.
 */

import { IResponse } from '@/interfaces';
import { Select2SingleRow } from '@/components/inputs/Select2Input';
import { IProduct } from '@/interfaces/product';
import { endpoint } from './endpoint';
import { defaultForm } from './default-state';
import { ACTION_TYPES } from './types';

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
	SET_ERROR,
	ADD_ITEM,
	UPDATE_ITEM,
	DELETE_ITEM,
	FETCH_FROM_API,
} = ACTION_TYPES;

const actions = {
	setForm( form: IProduct ) {
		return {
			type: SET_FORM,
			form,
		};
	},

	setCategories(categories: Array<Select2SingleRow>) {
        return {
            type: SET_CATEGORIES,
            categories,
        };
    },

	setIsLoading( isLoading: boolean ) {
		return {
			type: SET_IS_LOADING,
			isLoading,
		};
	},

	setIsSaving( isSaving: boolean ) {
		return {
			type: SET_IS_SAVING,
			isSaving,
		};
	},

	setIsDeleting( isDeleting: boolean ) {
		return {
			type: SET_IS_DELETING,
			isDeleting,
		};
	},

	setCurrentPage( currentPage: number ) {
		return {
			type: SET_CURRENT_PAGE,
			currentPage,
		};
	},

	setPerPage( perPage: number ) {
		return {
			type: SET_PER_PAGE,
			perPage,
		};
	},

	setItems( items: Array< IProduct > ) {
		return {
			type: GET_ITEMS,
			items,
		};
	},

	setCurrentItem( currentItem: IProduct ) {
		return {
			type: GET_CURRENT_ITEM,
			currentItem,
		};
	},

	seSelectedItems( selectedItems: IProduct ) {
		return {
			type: GET_SELECTED_ITEMS,
			selectedItems,
		};
	},

	*saveItem( payload: IProduct ) {
		yield actions.setIsSaving( true );

		try {
			let response: IResponse = {};
			if ( payload.id && payload.id > 0 ) {
				response = yield {
					type: UPDATE_ITEM,
					payload,
				};
			} else {
				response = yield {
					type: ADD_ITEM,
					payload,
				};
			}

			if ( response?.id > 0 ) {
				yield actions.setForm( { ...defaultForm } );
				yield actions.setIsSaving( false );
			}
		} catch ( error ) {
			yield actions.setIsSaving( false );
		}
	},

	setTotalItems( total: number ) {
		return {
			type: SET_TOTAL_ITEMS,
			total,
		};
	},

	setTotalPages( totalPages: number ) {
		return {
			type: SET_TOTAL_PAGES,
			totalPages,
		};
	},

	fetchFromAPIUnparsed( path: string ) {
		return {
			type: FETCH_FROM_API,
			path,
		};
	},

	fetchFromAPI( path: string ) {
		return {
			type: FETCH_FROM_API,
			path,
		};
	},

	*deleteItems( payload: Array< number > ) {
		yield actions.setIsDeleting( true );

		try {
			const responseDeleteItems: IResponse = yield {
				type: DELETE_ITEM,
				payload,
			};

			if ( responseDeleteItems?.total > 0 ) {
				yield actions.setFilters( {} );
			}

			yield actions.setIsDeleting( false );
		} catch ( error ) {
			yield actions.setIsDeleting( false );
		}
	},

	*setFilters( filters = {} ) {
		yield actions.setIsLoading( true );
		yield actions.setFilterObject( filters );

		const queryParam = new URLSearchParams(
			filters as URLSearchParams
		).toString();

		const path = `${ endpoint }?${ queryParam }`;
		const response: {
			headers: Headers;
			data: any;
		} = yield actions.fetchFromAPIUnparsed( path );

		let totalPages = 0;
		let totalItems = 0;

		if ( response.headers !== undefined ) {
			totalPages = parseInt( response.headers.get( 'X-WP-TotalPages' ) );
			totalItems = parseInt( response.headers.get( 'X-WP-Total' ) );
		}

		yield actions.setTotalPages( totalPages );
		yield actions.setTotalItems( totalItems );
		yield actions.setItems( response.data );
		return actions.setIsLoading( false );
	},

	setFilterObject( filters: object ) {
		return {
			type: SET_FILTER,
			filters,
		};
	},

	setErrors( errors: object ) {
		return {
			type: SET_ERROR,
			errors,
		};
	},
};

export default actions;
