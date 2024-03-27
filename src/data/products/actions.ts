/**
 * Internal dependencies.
 */

interface Types {
    /**
     * Select2 option label.
     */
    label: string;

    /**
     * Select2 option value.
     */
    value: string;
}

import { IResponse } from '@interfaces';
import { IProduct } from '@interfaces/product';
import { endpoint } from './endpoint';
import * as Types from './types';
import { defaultForm } from './default-state';

const actions = {
    setItems(items: Array<IProduct>) {
        return {
            type: Types.GET_ITEMS,
            items,
        };
    },

    setItemDetail(item: IProduct) {
        return {
            type: Types.GET_ITEM_DETAIL,
            item,
        };
    },

    setTypes(types: Array<Types>) {
        return {
            type: Types.GET_ITEM_TYPES,
            types,
        };
    },

    setFormData(form: IProduct) {
        return {
            type: Types.SET_FORM,
            form,
        };
    },

    setIsLoading(isLoading: boolean) {
        return {
            type: Types.SET_IS_LOADING,
            isLoading,
        };
    },

    setIsSaving(isSaving: boolean) {
        return {
            type: Types.SET_IS_SAVING,
            isSaving,
        };
    },

    setIsDeleting(deleting: boolean) {
        return {
            type: Types.SET_DELETING,
            deleting,
        };
    },

    *setFilters(filters = {}) {
        yield actions.setIsLoading(true);
        yield actions.setFilterObject(filters);

        const queryParam = new URLSearchParams(
            filters as URLSearchParams
        ).toString();

        const path = `${endpoint}?${queryParam}`;
        const response: {
            headers: Headers;
            data: any;
        } = yield actions.fetchFromAPIUnparsed(path);

        let totalPages = 0;
        let totalCount = 0;

        if (response.headers !== undefined) {
            totalPages = parseInt(response.headers.get('X-WP-TotalPages'));
            totalCount = parseInt(response.headers.get('X-WP-Total'));
        }

        yield actions.setTotalPages(totalPages);
        yield actions.setTotalItems(totalCount);
        yield actions.setItems(response.data);
        return actions.setIsLoading(false);
    },

    setFilterObject(filters: object) {
        return {
            type: Types.SET_FILTER,
            filters,
        };
    },

    *saveItem(payload: IProduct) {
        yield actions.setIsSaving(true);

        try {
            let response: IResponse = {};
            if (payload.id > 0) {
                response = yield {
                    type: Types.UPDATE_ITEM,
                    payload,
                };
            } else {
                response = yield {
                    type: Types.ADD_ITEM,
                    payload,
                };
            }

            if (response?.id > 0) {
                yield actions.setFormData({ ...defaultForm });
                yield actions.setIsSaving(false);
            }
        } catch (error) {
            yield actions.setIsSaving(false);
        }
    },

    setTotalItems(total: number) {
        return {
            type: Types.SET_TOTAL_ITEMS,
            total,
        };
    },

    setTotalPages(totalPages: number) {
        return {
            type: Types.SET_TOTAL_PAGES,
            totalPages,
        };
    },

    fetchFromAPI(path: string) {
        return {
            type: Types.FETCH_FROM_API,
            path,
        };
    },

    fetchFromAPIUnparsed(path: string) {
        return {
            type: Types.FETCH_FROM_API_UNPARSED,
            path,
        };
    },

    *deleteItems(payload: Array<number>) {
        yield actions.setIsDeleting(true);

        try {
            const responseDeleteItems: IResponse = yield {
                type: Types.DELETE_ITEM,
                payload,
            };

            if (responseDeleteItems?.total > 0) {
                yield actions.setFilters({});
            }

            yield actions.setIsDeleting(false);
        } catch (error) {
            yield actions.setIsDeleting(false);
        }
    },
};

export default actions;
