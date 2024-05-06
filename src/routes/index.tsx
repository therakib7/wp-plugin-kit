/**
 * All common routes
 *
 * @since 0.1.0
 */

/**
 * External dependencies
 */
import { lazy } from '@wordpress/element';

/**
 * Internal dependencies
 */
const Settings = lazy( () => import( '@/pages/settings' ) );
const Products = lazy( () => import( '@/pages/products' ) );
const ProductAdd = lazy( () => import( '@/pages/products/Add' ) );
const ProductEdit = lazy( () => import( '@/pages/products/Edit' ) );
import NotFound from '@/pages/404';

const routes = [
	{
		path: '/',
		element: Settings,
	},
	{
		path: '/products',
		element: Products,
	},
	{
		path: '/products/add',
		element: ProductAdd,
	},
	/* {
		path: '/products/:id',
		element: ProductsForm,
	}, */
	{
		path: '/products/:id/edit',
		element: ProductEdit,
	},
	{
		path: '/settings',
		element: Settings,
	},
	{
		path: '*',
		element: NotFound,
	},
];

export default routes;
