/**
 * Internal dependencies.
 */
import actions from './actions';

import {
    endpoint,
    typesEndpoint
} from './endpoint';

import {
    IItemFilter,
    IItemTypes,
    IResponse
} from '@interfaces';

import { prepareItemForSubmit } from './utils';

const resolvers = {
    *getItems(filters: IItemFilter) {
        if (filters === undefined) {
            filters = {};
        }

        const queryParam = new URLSearchParams(
            filters as URLSearchParams
        ).toString();

        const response: IResponse = yield actions.fetchFromAPIUnparsed(
            `${endpoint}?${queryParam}`
        );
        let totalPage = 0;
        let totalCount = 0;

        if (response.headers !== undefined) {
            totalPage = response.headers.get('X-WP-TotalPages');
            totalCount = response.headers.get('X-WP-Total');
        }

        yield actions.setItems(response.data);
        yield actions.setTotalPage(totalPage);
        yield actions.setTotal(totalCount);
        return actions.setLoading(false);
    },

    *getItemDetail(id: number) {
        yield actions.setLoading(true);
        const path = `${endpoint}/${id}`;
        const response = yield actions.fetchFromAPI(path);

        if (response.id) {
            const data = prepareItemForSubmit(response);

            yield actions.setFormData(data);
        }

        return actions.setLoading(false);
    },

    *getItemTypes() {
        const response: IResponse = yield actions.fetchFromAPIUnparsed(
            typesEndpoint
        );

        const types: Array<IItemTypes> = response.data;

        // yield actions.setTypes(formatSelect2Data(types));
    }
};

export default resolvers;
