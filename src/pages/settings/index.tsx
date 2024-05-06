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
import { get, add } from '@/utils/api';
import { reducer, initialState } from './reducer';

/**
 * Settings
 *
 * @since 0.1.0
 */
const Settings = () => {
	return (
		<>
			Settings Page
		</>
	);
};

export default Settings;
