/**
 * External dependencies
 */
import { useReducer, useEffect } from '@wordpress/element';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Spinner from '@/components/preloader/spinner';
import { Header, Content } from '@/components/layout';

/**
 * Products
 *
 * @since 0.1.0
 */
const Products = () => {


	return (
		<>
			<Header label={ __( 'Products', 'wp-plugin-kit' ) }>
				Save
				{/* { ! isLoading && (
					<button
						onClick={ handleSubmit }
						className="wp-plugin-kit-submit"
						disabled={ isSaving }
					>
						{ __( 'Save Changes', 'wp-plugin-kit' ) }
					</button>
				) } */}
			</Header>

			<Content>
				Product content
			</Content>
		</>
	);
};

export default Products;
