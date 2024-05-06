/**
 * Internal dependencies.
 */
import { CrudState } from '@/interfaces';
import { IProduct } from '@/interfaces/product';

export const defaultForm: IProduct = {
	id: null,
	is_active: 1,
	title: '',
	description: '',
	category_id: 0,
	price: '',
	currency: '',
	image_id: null,
	gallery_ids: [],
};

export const defaultState: CrudState = {
	form: { ...defaultForm },
	categories: [],
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
