/**
 * External dependencies.
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import Card from '@/components/layout/Card';
import Submit from './Submit';
import store from '@/data/products';
import ProductFormSidebar from './FormSidebar';
import { IInputResponse, Input } from '@/components/inputs';
import { Select2SingleRow } from '@/components/inputs/Select2Input';
import { IProduct, IProductFormData } from '@/interfaces/product';

type Props = {
    product?: IProduct;
};

export default function ProductForm({ product }: Props) {
    const dispatch = useDispatch();

    const errors: object = useSelect(
        (select) => select(store).getErrors(),
        []
    );

    const categories: Array<Select2SingleRow> = useSelect(
        (select) => select(store).getCategories(),
        []
    );

    const form: IProductFormData = useSelect(
        (select) => select(store).getForm(),
        []
    );

    const isLoading: boolean = useSelect(
        (select) => select(store).getIsLoading(),
        []
    );

    const handleChange = (input: IInputResponse) => {
        dispatch(store).setForm({
            ...form,
            [input.name]:
                typeof input.value === 'object'
                    ? input.value?.value
                    : input.value,
        });
    };

    return (
        <div className="mt-10">
            <form>
                <div className="flex flex-col md:flex-row">
                    <div className="md:basis-1/5">
                        <ProductFormSidebar loading={isLoading} />
                    </div>

                    {isLoading ? (
                        <div className="md:basis-4/5">
                            <Card>
                                <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                                <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                                <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                            </Card>
                            <Card>
                                <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                                <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                                <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                            </Card>
                        </div>
                    ) : (
                        <>
                            <div className="md:basis-4/5">
                                <Card className="product-general">
                                    <Input
                                        id="title"
                                        className="field-title"
                                        hasError={!!errors.title}
                                        showErrorMessage={true}
                                        errorMessage={errors.title}
                                        value={form.title}
                                        type="text"
                                        label={__('Title', 'wp-plugin-kit')}
                                        placeholder={__('Enter title', 'wp-plugin-kit')}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        id="category_id"
                                        value={form.category_id}
                                        type="select"
                                        label={__('Categories', 'wp-plugin-kit')}
                                        options={categories}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        id="description"
                                        className="field-description"
                                        hasError={!!errors.description}
                                        showErrorMessage={true}
                                        errorMessage={errors.description}
                                        type="textarea"
                                        label={__('Description', 'wp-plugin-kit')}
                                        placeholder={__('Enter description', 'wp-plugin-kit')}
                                        value={form.description}
                                        onChange={handleChange}
                                    />
                                </Card>

                                <Card className="product-pricing">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Input
                                                type="number"
                                                label={__('Price', 'wp-plugin-kit')}
                                                id="price"
                                                placeholder={__('Enter price', 'wp-plugin-kit')}
                                                value={form.price}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                type="text"
                                                label={__('Currency', 'wp-plugin-kit')}
                                                id="currency"
                                                placeholder={__('Enter currency', 'wp-plugin-kit')}
                                                value={form.currency}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    {/*<Input
                                        type="text-editor"
                                        label={__('Price', 'wp-plugin-kit')}
                                        id="description"
                                        placeholder={__('Enter Product description and necessary requirements.', 'wp-plugin-kit')}
                                        editorHeight="150px"
                                        value={form.description}
                                        onChange={handleChange}
                                    />*/}
                                </Card>

                                <Card className="product-attachment">
                                    Attachment Fields
                                </Card>

                                <div className="flex justify-end md:hidden">
                                    <Submit />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </form>
        </div>
	);
}
