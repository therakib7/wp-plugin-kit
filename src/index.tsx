import { StrictMode, createRoot } from '@wordpress/element';
import App from './App';

const rootElement = document.getElementById('wp-plugin-kit');
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<App />
		</StrictMode>
	);
}
