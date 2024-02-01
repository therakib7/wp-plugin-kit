/**
 * Internal dependencies.
 */
import { IItems } from '@interfaces';

export const defaultForm = {
    id: 0,
    title: '',
    description: '',
    type_id: 0,
    is_active: 1
};

export const defaultState: IItems = {
    form: {
        ...defaultForm
    },
    items: [],
    item: {
        ...defaultForm
    },
    loading: false,
    saving: false,
    deleting: false,
    total: 0,
    totalPage: 0,
    currentPage: 1,
    perPage: 10,
    selectedItems: [],
    filters: {},
    errors: {},
    types: [],
};
