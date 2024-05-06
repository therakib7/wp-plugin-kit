/**
 * External dependencies.
 */
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelect } from '@wordpress/data';
import { scroller } from 'react-scroll';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import store from '../../data/products';
import Button from '@/components/button';
import { IProductFormData } from '@/interfaces/product';
import { defaultForm } from '@/data/products/default-state';

export default function Submit() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const form: IProductFormData = useSelect(
        (select) => select(store).getForm(),
        []
    );

    const isSaving: boolean = useSelect(
        (select) => select(store).getIsSaving(),
        []
    );

    const validate = () => {
        const errors: Record<string, string> = {};

        if (!form.title.length) {
            errors.title = __('Please give a product title.', 'wp-plugin-kit');
        }

        if (form.category_id === null) {
            errors.category_id = __('Please select product category.', 'wp-plugin-kit');
        }

        if (!form.description.length) {
            errors.description = __('Please give product description.', 'wp-plugin-kit');
        }

        return errors;
    };

    const onSubmit = () => {
        //Validate
        const errors = validate();
        const fields = Object.keys(errors);
        if (fields.length > 0) {
            dispatch(store).setErrors(errors);

            scroller.scrollTo(`field-${fields[0]}`, {
                duration: 800,
                delay: 0,
                offset: -150,
                smooth: 'easeInOutQuart',
            });

            return;
        }

        // Submit
        dispatch(store)
            .saveItem(form)
            .then(() => {
                toast.success( __( 'Product has been saved successfully.', 'wp-plugin-kit' ) );
                dispatch(store).setForm({
                    ...defaultForm,
                });
                navigate('/products');
            })
            .catch((error) => {
                toast.error( error.message );
            });
    };

    return (
        <>
            <Button
                text={__('Cancel', 'wp-plugin-kit')}
                type="default"
                onClick={() => navigate('/products') }
                buttonCustomClass="mr-3"
            />

            <Button
                text={
                    isSaving
                        ? __('Saving…', 'wp-plugin-kit')
                        : __('Save', 'wp-plugin-kit')
                }
                type="primary"
                icon={faCheckCircle}
                disabled={isSaving}
                onClick={onSubmit}
            />
        </>
    );
}
