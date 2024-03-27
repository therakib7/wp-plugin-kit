/**
 * Internal dependencies.
 */
import * as Types from './types';
import { defaultState } from './default-state';

const reducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case Types.GET_ITEMS:
            return {
                ...state,
                items: action.items,
            };

        case Types.GET_ITEM_DETAIL:
            return {
                ...state,
                item: action.item,
            };

        case Types.SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };

        case Types.SET_TOTAL_ITEMS:
            return {
                ...state,
                total: action.total,
            };

        case Types.SET_TOTAL_PAGES:
            return {
                ...state,
                totalPages: action.totalPages,
            };

        case Types.SET_FILTER:
            return {
                ...state,
                filters: action.filters,
            };

        case Types.SET_FORM:
            return {
                ...state,
                form: action.form,
            };

        case Types.SET_IS_SAVING:
            return {
                ...state,
                isSaving: action.isSaving,
            };
    }

    return state;
};

export default reducer;
