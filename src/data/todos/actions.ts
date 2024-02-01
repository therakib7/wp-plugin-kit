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

import { IItem, IItemForm, IResponse } from '@interfaces';
import { endpoint } from './endpoint';
import * as Types from './types';
import { defaultForm } from './default-state';

const actions = {
    setItems(items: Array<IItem>) {
        return {
            type: Types.GET_ITEMS,
            items,
        };
    },

    setItemDetail(item: IItem) {
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

    setFormData(form: IItemForm) {
        return {
            type: Types.SET_FORM,
            form,
        };
    },

    setLoading(loading: boolean) {
        return {
            type: Types.SET_LOADING,
            loading,
        };
    },

    setSaving(saving: boolean) {
        return {
            type: Types.SET_SAVING,
            saving,
        };
    },

    setDeleting(deleting: boolean) {
        return {
            type: Types.SET_DELETING,
            deleting,
        };
    },

    *setFilters(filters = {}) {
        yield actions.setLoading(true);
        yield actions.setFilterObject(filters);

        const queryParam = new URLSearchParams(
            filters as URLSearchParams
        ).toString();

        const path = `${endpoint}?${queryParam}`;
        const response: {
            headers: Headers;
            data: any;
        } = yield actions.fetchFromAPIUnparsed(path);

        let totalPage = 0;
        let totalCount = 0;

        if (response.headers !== undefined) {
            totalPage = parseInt(response.headers.get('X-WP-TotalPages'));
            totalCount = parseInt(response.headers.get('X-WP-Total'));
        }

        yield actions.setTotalPage(totalPage);
        yield actions.setTotal(totalCount);
        yield actions.setItems(response.data);
        return actions.setLoading(false);
    },

    setFilterObject(filters: object) {
        return {
            type: Types.SET_FILTER,
            filters,
        };
    },

    *saveItem(payload: IItemForm) {
        yield actions.setSaving(true);

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
                yield actions.setSaving(false);
            }
        } catch (error) {
            yield actions.setSaving(false);
        }
    },

    setTotal(total: number) {
        return {
            type: Types.SET_TOTAL,
            total,
        };
    },

    setTotalPage(totalPage: number) {
        return {
            type: Types.SET_TOTAL_PAGE,
            totalPage,
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
        yield actions.setDeleting(true);

        try {
            const responseDeleteItems: IResponse = yield {
                type: Types.DELETE_ITEM,
                payload,
            };

            if (responseDeleteItems?.total > 0) {
                yield actions.setFilters({});
            }

            yield actions.setDeleting(false);
        } catch (error) {
            yield actions.setDeleting(false);
        }
    },
};

export default actions;
