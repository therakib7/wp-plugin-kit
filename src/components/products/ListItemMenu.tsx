/**
 * External dependencies.
 */
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Fragment } from '@wordpress/element';
import { Menu, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEdit,
    faEllipsisV,
    faPencilAlt,
    faTrash,
    faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { __ } from '@wordpress/i18n';
import { dispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies.
 */
import jobStore from '@/data/products/index';
import { IProduct } from '@/interfaces/product';
import { prepareItemForSubmit } from '@/data/products/utils';

export default function ListItemMenu({ job }: IProduct) {
    const { id, status } = job;

    const isDeleting: boolean = useSelect(
        (select) => select(jobStore).getIsDeleting(),
        []
    );

    const showDeleteAlert = () => {
        Swal.fire({
            title: __('Are you sure?', 'wp-plugin-kit'),
            text: __('Are you sure to delete the job?', 'wp-plugin-kit'),
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            confirmButtonColor: '#1c64f2',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return dispatch(jobStore)
                    .deleteItems({
                        ids: [id],
                    })
                    .then(() => {
                        return true;
                    })
                    .catch((error) => {
                        Swal.showValidationMessage(
                            `Request failed: ${error.message}`
                        );
                    });
            },
            allowOutsideClick: () => isDeleting,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(__('Deleted!', 'wp-plugin-kit'), '', 'success');
            }
        });
    };

    const changeProductStatus = () => {
        dispatch(jobStore)
            .saveItem(
                prepareItemForSubmit({
                    ...job,
                    is_active: 'published' === status ? 0 : 1,
                })
            )
            .then(() => {
                Swal.fire({
                    title: __('Product status updated', 'wp-plugin-kit'),
                    text: __('Product has been updated successfully.', 'wp-plugin-kit'),
                    icon: 'success',
                    toast: true,
                    position: 'bottom',
                    showConfirmButton: false,
                    timer: 2000,
                });
                dispatch(jobStore).setFilters({});
            });
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center w-full pr-3 pl-0 py-2 text-sm font-medium">
                    <FontAwesomeIcon
                        icon={faEllipsisV}
                        color={'#ddd'}
                        className="mr-1"
                    />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute w-40 z-10 top-4 -left-28 mt-2 origin-top-right rounded-md shadow-lg bg-white p-2 border-gray-dark">
                    <div className="px-1 py-1 bg-white">
                        <Menu.Item>
                            <Link
                                to={`/products/edit/${id}`}
                                className="text-left hover:opacity-80 block text-slate-600 hover:text-slate-700 group items-center w-full px-3 text-sm bg-white outline-none hover:outline-none focus:outline-none focus:shadow-none mb-2"
                            >
                                <FontAwesomeIcon icon={faPencilAlt} />
                                <span className="ml-2">
                                    {__('Edit', 'wp-plugin-kit')}
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <button
                                onClick={showDeleteAlert}
                                className="text-left hover:opacity-80 block text-slate-600 hover:text-slate-700 group items-center w-full px-3 text-sm bg-white outline-none hover:outline-none focus:outline-none focus:shadow-none mb-2"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                                <span className="ml-2">
                                    {__('Delete', 'wp-plugin-kit')}
                                </span>
                            </button>
                        </Menu.Item>
                        <Menu.Item>
                            <button
                                onClick={changeProductStatus}
                                className="text-left hover:opacity-80 block text-slate-600 hover:text-slate-700 group items-center w-full px-3 text-sm bg-white outline-none hover:outline-none focus:outline-none focus:shadow-none mb-2"
                            >
                                <span>
                                    {'published' === status ? (
                                        <>
                                            <FontAwesomeIcon icon={faEdit} />{' '}
                                            <span className="ml-2">
                                                {__('Make Draft', 'wp-plugin-kit')}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                            />{' '}
                                            <span className="ml-2">
                                                {__('Make Publish', 'wp-plugin-kit')}
                                            </span>
                                        </>
                                    )}
                                </span>
                            </button>
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
