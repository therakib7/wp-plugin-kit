/**
 * External dependencies
 */
import { Suspense } from '@wordpress/element';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Internal dependencies
 */
import Header from '@/components/layout/Header';
import routes from './routes';
import Spinner from './components/preloader/spinner';

const App = () => {
	return (
		<HashRouter>
            <div>
				<ToastContainer hideProgressBar />
                <Header />
                <hr className="wp-header-end" />
				<Suspense fallback={ <Spinner /> }>
					<Routes>
						{routes.map((route, index) => (
							<Route
								key={index}
								path={route.path}
								element={<route.element />}
							/>
						))}
					</Routes>
				</Suspense>
            </div>
        </HashRouter>
	);
};

export default App;
