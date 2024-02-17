/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

const NoPermission = () => {
	return (
		<div className="wp-plugin-kit-403">
			<h3>{__('Permission Denied!', 'wp-plugin-kit')}</h3>
		</div>
	);
};
export default NoPermission;
