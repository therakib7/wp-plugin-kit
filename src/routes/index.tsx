/**
 * All common routes
 *
 * @since 0.1.0
 */

/**
 * External dependencies
 */
import { lazy } from '@wordpress/element';
import { createHashRouter } from 'react-router-dom';

/**
 * Internal dependencies
 */
const Settings = lazy(() => import('@pages/settings'));
import NotFound from '@pages/404';

const Router = createHashRouter([
	{
		path: '/',
		element: <Settings />,
	},
	{
		path: '/settings',
		element: <Settings />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

export default Router;
