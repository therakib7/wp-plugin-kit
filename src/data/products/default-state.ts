/**
 * Internal dependencies.
 */
import { CrudState } from '@/interfaces';
import { IProduct } from '@/interfaces/product';

export const defaultForm: IProduct = {
	id: null,
	title: '',
	description: '',
	category_ids: [],
	is_active: 1,
	image_id: null,
	gallery_ids: [],
};

export const defaultState: CrudState = {
	form: { ...defaultForm },
	isLoading: false,
	isSaving: false,
	isDeleting: false,
	currentPage: 1,
	perPage: 10,
	items: [],
	totalItems: 0,
	totalPages: 0,
	currentItem: { ...defaultForm },
	selectedItems: [],
	filters: {},
	errors: {},
};
