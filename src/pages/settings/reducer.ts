import { State, Form } from '@interfaces/settings';

type Action =
	| { type: 'set_isLoading'; payload: boolean }
	| { type: 'set_isSaving'; payload: boolean }
	| { type: 'set_form'; payload: Form };

export const initialState: State = {
	isLoading: false,
	isSaving: false,
	form: {
		layout: 'one',
		position: 'top',
		close_after: 3
	},
};

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'set_isLoading':
			return { ...state, isLoading: action.payload };
		case 'set_isSaving':
			return { ...state, isSaving: action.payload };
		case 'set_form':
			return { ...state, form: action.payload };
		default:
			return state;
	}
};
