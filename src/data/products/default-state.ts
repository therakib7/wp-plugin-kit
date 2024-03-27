/**
 * Internal dependencies.
 */
import { CrudState } from '@interfaces';
import { IProduct } from '@interfaces/product';

export const defaultForm: IProduct = {
    id: null,
    title: '',
    description: '',
    category_id: null,
    is_active: 1,
    image_id: null,
    gallery_ids: []
};

export const defaultState: CrudState = {
    form: {
        ...defaultForm
    },
    itemList: [],
    currentItem: {
        ...defaultForm
    },
    isLoading: false,
    isSaving: false,
    isDeleting: false,
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    perPage: 10,
    selectedItems: [],
    filters: {},
    errors: {}
};
