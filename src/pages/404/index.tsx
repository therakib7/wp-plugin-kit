/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

const NotFound = () => {
	return (
		<div className="wp-plugin-kit-404">
			<h3>{__('404 Not Found', 'wp-plugin-kit')}</h3>
		</div>
	);
};
export default NotFound;
