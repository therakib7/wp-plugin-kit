/**
 * External dependencies
 */
import { StrictMode, createRoot } from '@wordpress/element';

/**
 * Internal dependencies
 */
import '@data/store';
import App from './App';

const rootElement = document.getElementById('wp-plugin-kit');
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<App />
		</StrictMode>
	);
}
