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

        case Types.GET_ITEM_TYPES:
            return {
                ...state,
                types: action.types,
            };

        case Types.SET_LOADING:
            return {
                ...state,
                loading: action.loading,
            };

        case Types.SET_TOTAL:
            return {
                ...state,
                total: action.total,
            };

        case Types.SET_TOTAL_PAGE:
            return {
                ...state,
                totalPage: action.totalPage,
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

        case Types.SET_SAVING:
            return {
                ...state,
                saving: action.saving,
            };
    }

    return state;
};

export default reducer;
