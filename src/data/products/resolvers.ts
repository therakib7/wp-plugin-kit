/**
 * Internal dependencies.
 */
import actions from './actions';

import {
	endpoint,
	categoriesEndpoint
} from './endpoint';

import { IResponse } from '@/interfaces';
import { IProductCategories } from '@/interfaces/product';
import { formatSelect2Data } from '@/utils/Select2Helper';
import { prepareItemForSubmit } from './utils';

const resolvers = {
	*getItems( filters: object ) {
		if ( filters === undefined ) {
			filters = {};
		}

		const queryParam = new URLSearchParams(
			filters as URLSearchParams
		).toString();

		const response: IResponse = yield actions.fetchFromAPIUnparsed(
			`${ endpoint }?${ queryParam }`
		);
		let totalPages = 0;
		let totalCount = 0;

		if ( response.headers !== undefined ) {
			totalPages = response.headers.get( 'X-WP-TotalPages' );
			totalCount = response.headers.get( 'X-WP-Total' );
		}

		/* yield actions.setItems( [{
			id: 1,
			title: 'This is title',
			description: 'This is title',
			category_id: null,
			image_id: null,
			gallery_ids: [],
			is_active: true
		}] );
		yield actions.setTotalPages( 1 );
		yield actions.setTotalItems( 1 ); */
		yield actions.setItems( response.data );
		yield actions.setTotalPages( totalPages );
		yield actions.setTotalItems( totalCount );
		return actions.setIsLoading( false );
	},

	*getCurrentItem( id: number ) {
		yield actions.setIsLoading( true );
		const path = `${ endpoint }/${ id }`;
		const response = yield actions.fetchFromAPI( path );

		if ( response.id ) {
			const data = prepareItemForSubmit( response );

			yield actions.setForm( data );
		}

		return actions.setIsLoading( false );
	},

	*getCategories() {
        /* const response: IResponse = yield actions.fetchFromAPIUnparsed(
            categoriesEndpoint
        );

        const categories: Array<IProductCategories> = response.data; */

        yield actions.setCategories([
			{
				label: 'Computer',
				value: 1
			},
			{
				label: 'Mobile',
				value: 2
			},
			{
				label: 'Laptop',
				value: 3
			}
		] );
        // yield actions.setCategories(formatSelect2Data(categories));
    },
};

export default resolvers;
