/**
 * External dependencies.
 */
import { createReduxStore } from '@wordpress/data';

/**
 * Internal dependencies.
 */
import reducer from './reducer';
import actions from './actions';
import selectors from './selectors';
import controls from './controls';
import resolvers from './resolvers';

const itemStore = createReduxStore('wp-plugin-kit/items', {
    reducer,
    actions,
    selectors,
    controls,
    resolvers,
});

export default itemStore;
