/**
 * External dependencies
 */
import { useEffect } from '@wordpress/element';
import { dispatch } from '@wordpress/data';
import { useNavigate } from 'react-router-dom';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Layout from '@/components/layout/Layout';
import PageHeading from '@/components/layout/PageHeading';
import Form from '@/components/products/Form';
import Submit from '@/components/products/Submit';
import store from '@/data/products';
import { defaultState } from '@/data/products/default-state';

export default function AddProduct() {
    const navigate = useNavigate();

    useEffect(() => {
        /* dispatch(store).setForm({
            ...defaultState,
        }); */
    }, []);

    /**
     * Get Page Content - Title and New Product button.
     *
     * @return JSX.Element
     */
    const pageTitleContent = (
        <div className="">
            <div className="mr-3 mb-4">
                <button
                    onClick={ () => navigate('/products') }
                    className="text-gray-dark border-none"
                >
                    ← {__('Back to products', 'wp-plugin-kit')}
                </button>
            </div>
            <div className="text-left">
                <PageHeading text={__('Add New Product', 'wp-plugin-kit')} />
            </div>
        </div>
    );

    /**
     * Get Right Side Content - Add Product form data.
     */
    const pageRightSideContent = (
        <div className="mt-7 fixed invisible md:visible md:top-28 right-10 z-50">
            <Submit />
        </div>
    );

    return (
        <Layout
            title={pageTitleContent}
            slug="create-job"
            hasRightSideContent={true}
            rightSideContent={pageRightSideContent}
        >
            <Form />
        </Layout>
    );
}
