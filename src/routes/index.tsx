/**
 * All common routes
 *
 * @since 0.1.0
 */

/**
 * External dependencies
 */
import { createHashRouter } from 'react-router-dom';

/**
 * Internal dependencies
 */
import Settings from '@pages/settings';
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
