export interface IProduct {
	/**
	 * Product ID.
	 */
	id: number | null;

	/**
	 * Product title.
	 */
	title: string;

	/**
	 * Product description.
	 */
	description: string;

	/**
	 * Product Category IDs.
	 */
	category_id: number | null;

	/**
	 * Product Price.
	 */
	price: string | null;

	/**
	 * Product Currency.
	 */
	currency: string | null;

	/**
	 * Product image ID.
	 */
	image_id: number | null;

	/**
	 * Product gallery IDS.
	 */
	gallery_ids: Array< number >;

	/**
	 * Status published or draft
	 */
	is_active: boolean | number;
}

export interface IProductFormData extends IProduct {}

export interface IProductFilter {
    /**
     * Job filter by page no.
     */
    page?: number;

    /**
     * Job search URL params.
     */
    search?: string;
}

export interface IProductCategories {
	/**
	 * Product type id.
	 */
	id: number;

	/**
	 * Product type name.
	 */
	name: string;

	/**
	 * Product type slug.
	 */
	slug: string;

	/**
	 * Product type description.
	 */
	description: string | null;
}
