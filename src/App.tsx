/**
 * External dependencies
 */
import { Suspense } from '@wordpress/element';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Internal dependencies
 */
import Router from './routes';
import Spinner from '@components/preloader/spinner';
import NotFound from '@pages/404';

const App = () => {
	return (
		<>
			<ToastContainer hideProgressBar />
			<Suspense fallback={<Spinner />}>
				<RouterProvider
					router={Router}
					fallbackElement={<NotFound />}
				/>
			</Suspense>
		</>
	);
};

export default App;
