/**
 * Internal dependencies.
 */
import { IItem } from '@interfaces';

export const prepareItemForSubmit = (item: IItem) => {
    const data = {
        ...item,
        type_id: item.type_id,
    };

    if (item.is_active !== undefined) {
        data.is_active = item.is_active;
    } else {
        data.is_active = 1;
    }

    // Remove unnecessary data.
    delete data.status;

    return data;
};
