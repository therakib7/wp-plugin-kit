/**
 * External dependencies
 */
import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { toast } from 'react-toastify';

/**
 * react-query instead of showing error multiple place show it ones
 *
 * @since 0.1.0
 */

const onError = (error: Error | Error[]) => {
	if (Array.isArray(error)) {
		error.forEach((err) => {
			toast.error(err.message);
		});
	} else {
		toast.error(error.message);
	}
};

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
			retry: false,
		},
	},
	queryCache: new QueryCache({
		onError,
	}),
	mutationCache: new MutationCache({
		onError,
	}),
});

export { queryClient };
