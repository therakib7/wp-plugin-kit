/**
 * External dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { useNavigate } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Button from '@/components/button';
import Layout from '@/components/layout/Layout';
import Table from '@/components/table/Table';
import TableLoading from '@/components/preloader/TableLoading';
import PageHeading from '@/components/layout/PageHeading';
import { useSelect, useDispatch } from '@wordpress/data';
import store from '@/data/products';
import {
    useTableHeaderData,
    useTableRowData,
} from '@/components/products/use-table-data';
import SelectCheckBox from '@/components/products/SelectCheckBox';
import { Input } from '@/components/inputs';
import { IProductFilter } from '@/interfaces/product';

export default function Products() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(
        new URLSearchParams(location.search).get('pages') || 1
    );
    const searched = new URLSearchParams(location.search).get('s');
    const [search, setSearch] = useState<string>(
        typeof searched === 'string' ? searched : ''
    );
    const [checkedAll, setCheckedAll] = useState(false);

    const products: Array< object > = useSelect(
        (select) => select(store).getItems(),
        []
    );
    const totalItems: number = useSelect(
        (select) => select(store).getTotalItems(),
        []
    );
    const itemFilters: IProductFilter = useSelect(
        (select) => select(store).getFilters(),
        []
    );
    const isLoading: boolean = useSelect(
        (select) => select(store).getIsLoading(),
        []
    );

    useEffect(() => {
        dispatch(store).setFilters({
            ...itemFilters,
            page,
            search,
        });
    }, [page, search]);

    /**
     * Process search-bar, tab and pagination clicks.
     *
     * @param  pagePassed
     * @param  searchPassed
     * @return {void}
     */
    const processAndNavigate = (
        pagePassed: number = 0,
        searchPassed: string | null = null
    ) => {
        const pageData = pagePassed === 0 ? page : pagePassed;
        const searchData = searchPassed === '' ? search : searchPassed;
        navigate(`/products?pages=${pageData}&s=${searchData}`);
        setPage(pageData);

        dispatch(store).setFilters({
            ...itemFilters,
            page: pageData,
            search: searchData,
        });
    };

    // TODO: Implement this later.
    const [checked, setChecked] = useState<Array<number>>([]);
    const checkProduct = (itemId: number, isChecked = false) => {
        const productsData = [];
        if (itemId === 0) {
            if (isChecked) {
                productsData.push(...products.map((item) => item.id));
            }
            setChecked(productsData);
        } else {
            setChecked([...checked, itemId]);
        }
    };

    /**
     * Handle Checked and unchecked.
     */
    useEffect(() => {
        console.error('In index', products)
        if (products.length === checked.length && checked.length > 0) {
            setCheckedAll(true);
        } else {
            setCheckedAll(false);
        }
    }, [products, checked]);

    /**
     * Get Page Content - Title and New Product button.
     *
     * @return JSX.Element
     */
    const pageTitleContent = (
        <div className="flex">
            <div className="flex-6 mr-3">
                <PageHeading text={__('Products', 'wp-plugin-kit')} />
            </div>
            <div className="flex-1 text-left">
                <Button
                    text={__('New', 'wp-plugin-kit')}
                    type="primary"
                    icon={faPlus}
                    onClick={() => navigate('/products/add')}
                />
            </div>
        </div>
    );

    /**
     * Get Right Side Content - Products Search Input.
     *
     * @param  data
     */
    const pageRightSideContent = (
        <Input
            type="text"
            placeholder={__('Search Products…', 'wp-plugin-kit')}
            onChange={(data) => {
                setSearch(data.value);
                processAndNavigate(page, data.value);
            }}
            value={search}
            className="w-full md:w-80"
        />
    );

    const tableResponsiveColumns = ['sl', 'title', 'actions'];
    const tableHeaders = useTableHeaderData();
    const tableRows = useTableRowData(products, checked);

    return (
        <Layout
            title={pageTitleContent}
            slug="products"
            hasRightSideContent={true}
            rightSideContent={pageRightSideContent}
        >
            {isLoading ? (
                <TableLoading
                    headers={tableHeaders}
                    responsiveColumns={tableResponsiveColumns}
                    hasCheckbox={false}
                    count={5}
                />
            ) : (
                <>
                    {checked.length > 0 && (
                        <SelectCheckBox
                            checked={checked}
                            onChange={(response) => checkProduct()}
                        />
                    )}

                    <Table
                        headers={tableHeaders}
                        rows={tableRows}
                        totalItems={totalItems}
                        perPage={10}
                        onCheckAll={(isChecked: boolean) => {
                            checkProduct(0, isChecked);
                            setCheckedAll(isChecked);
                        }}
                        responsiveColumns={tableResponsiveColumns}
                        checkedAll={checkedAll}
                        noDataMessage={__(
                            'Sorry !! No products found…',
                            'wp-plugin-kit'
                        )}
                        currentPage={
                            typeof page === 'number' ? parseInt(page) : 1
                        }
                        onChangePage={(page) =>
                            processAndNavigate(page, search)
                        }
                    />
                </>
            )}
        </Layout>
    );
}
