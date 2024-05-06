/**
 * External dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
// import { Input } from '../inputs/Input';
import Badge from '@/components/badge/Badge';
import ListItemMenu from './ListItemMenu';
import { ITableHeader, ITableRow } from '@/components/table/TableInterface';
import { capitalize } from '@/utils/StringHelper';

export const useTableHeaderData = (): ITableHeader[] => {
    return [
        {
            key: 'sl',
            title: 'Sl',
            className: '',
        },
        {
            key: 'title',
            title: __('Title', 'wp-plugin-kit'),
            className: '',
        },
        {
            key: 'category',
            title: __('Category', 'wp-plugin-kit'),
            className: '',
        },
        {
            key: 'status',
            title: __('Status', 'wp-plugin-kit'),
            className: '',
        },
        {
            key: 'actions',
            title: __('Action', 'wp-plugin-kit'),
            className: '',
        },
    ];
};

export const useTableRowData = (products = [], checked: number[]): ITableRow[] => {
    const rowsData: ITableRow[] = [];

    products.forEach((row, index) => {
        rowsData.push({
            id: row.id,
            cells: [
                {
                    key: 'sl',
                    value: (
                        // <Input
                        //     value={checked.includes(row.id) ? '1' : '0'}
                        //     type="checkbox"
                        //     //  onChange={() => checkProduct(row.id)}
                        // />
                        <>
                            <b>{index + 1}</b>
                        </>
                    ),
                    className: '',
                },
                {
                    key: 'title',
                    value: row.title,
                    className: '',
                },
                {
                    key: 'category',
                    value: row.category?.label,
                    className: '',
                },
                {
                    key: 'status',
                    value: (
                        <Badge
                            text={capitalize(row.status)}
                            type={
                                row.status === 'published'
                                    ? 'success'
                                    : 'default'
                            }
                            hasIcon={true}
                        />
                    ),
                    className: '',
                },
                {
                    key: 'actions',
                    value: (
                        <div>
                            <ListItemMenu job={row} />
                        </div>
                    ),
                    className: '',
                },
            ],
        });
    });

    return rowsData;
};
