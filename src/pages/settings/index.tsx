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
import Spinner from '@components/preloader/spinner';
import Topbar from '@components/topbar';
import PageContent from '@components/page-content';
import { get, add } from '@utils/api';
import { reducer, initialState } from './reducer';

/**
 * Settings
 *
 * @since 0.1.0
 */
const Settings = () => {
	const queryClient = useQueryClient();
	const [state, dispatch] = useReducer(reducer, initialState);
	const { isLoading, isSaving, form } = state;

	const { data, isLoading } = useQuery({
		queryKey: ['settings'],
		queryFn: () => get('settings', 'tab=general'),
	});

	useEffect(() => {
		if (data) {
			const { form } = data;
			dispatch({ type: 'set_form', payload: form });
		}
	}, [data]);

	useEffect(() => {
		dispatch({ type: 'set_isLoading', payload: isLoading });
	}, [isLoading]);

	const submitMutation = useMutation({
		mutationFn: () => add('settings', { ...form, tab: 'general' }),
		onSuccess: () => {
			toast.success(__('Successfully Changed', 'wp-plugin-kit'));
			queryClient.invalidateQueries({ queryKey: ['settings'] });
			dispatch({ type: 'set_isSaving', payload: false });
		},
		onError: () => {
			dispatch({ type: 'set_isSaving', payload: false });
		},
	});

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		dispatch({ type: 'set_form', payload: { ...form, [name]: value } });
	};

	const handleChangeSwitch = (name: string, value: string) => {
		dispatch({ type: 'set_form', payload: { ...form, [name]: value } });
	};

	const handleSubmit = async () => {
		dispatch({ type: 'set_isSaving', payload: true });
		submitMutation.mutate();
	};

	return (
		<>
			<Topbar
				label={__(
					'Settings',
					'wp-plugin-kit'
				)}
			>
				{!isLoading && (
					<button
						onClick={handleSubmit}
						className="wp-plugin-kit-submit"
						disabled={isSaving}
					>
						{__('Save Changes', 'wp-plugin-kit')}
					</button>
				)}
			</Topbar>

			<PageContent>
				{isLoading && <Spinner />}

				{!isLoading && (
					<div className="wp-plugin-kit-settings wp-plugin-kit-form">
						<div className="wp-plugin-kit-field">
							<label>{__('Layout', 'wp-plugin-kit')}</label>
							<div className="wp-plugin-kit-field-img-switch">
								<button
									type="button"
									name="layout"
									value="one"
									onClick={() =>
										handleChangeSwitch('layout', 'one')
									}
									className={
										form.layout === 'one' ? 'selected' : ''
									}
								>
									<img
										src="https://img001.prntscr.com/file/img001/xzSPRQrWTLW_xokXWqQQJA.png"
										alt="Layout One"
									/>
								</button>
								<button
									type="button"
									name="layout"
									value="two"
									onClick={() =>
										handleChangeSwitch('layout', 'two')
									}
									className={
										form.layout === 'two' ? 'selected' : ''
									}
								>
									<img
										src="https://img001.prntscr.com/file/img001/Kc9YjGlaRRqiAIYdXoVY6Q.png"
										alt="Layout Two"
									/>
								</button>
							</div>
						</div>

						<div className="wp-plugin-kit-field">
							<label>{__('Position', 'wp-plugin-kit')}</label>
							<div className="wp-plugin-kit-field-button-switch">
								<button
									type="button"
									name="position"
									value="top"
									onClick={handleChange}
									className={
										form.position === 'top'
											? 'selected'
											: ''
									}
								>
									{__('Top', 'wp-plugin-kit')}
								</button>
								<button
									type="button"
									name="position"
									value="bottom"
									onClick={handleChange}
									className={
										form.position === 'bottom'
											? 'selected'
											: ''
									}
								>
									{__('Bottom', 'wp-plugin-kit')}
								</button>
							</div>
						</div>

						<div className="wp-plugin-kit-field">
							<label>
								{__(
									'Close After (Seconds)',
									'wp-plugin-kit'
								)}
							</label>
							<div className="wp-plugin-kit-field-range">
								<input
									type="range"
									min="1"
									max="20"
									name="close_after"
									value={form.close_after}
									onChange={handleChange}
									className="range-slider"
									style={{
										background: `linear-gradient(to right, #3264fe ${(form.close_after / 20) * 100
											}%, #ccd6ff ${(form.close_after / 20) * 100
											}%)`,
									}}
								/>
								<input
									type="number"
									min="1"
									max="20"
									name="close_after"
									value={form.close_after}
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>
				)}
			</PageContent>
		</>
	);
};

export default Settings;
