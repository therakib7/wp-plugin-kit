
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
     * Product Category ID.
     */
    category_id: number | null;

    /**
     * Status published or draft
     */
    is_active: boolean | number;

    /**
     * Product image ID.
     */
    image_id: number | null;

    /**
     * Product gallery IDS.
     */
    gallery_ids: Array<number>;
}

export interface IProductFormData extends IProduct {}

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