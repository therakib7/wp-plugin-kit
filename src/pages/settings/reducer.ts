import { State, Form } from '@interfaces/settings';

type Action =
	| { type: 'set_loading'; payload: boolean }
	| { type: 'set_saving'; payload: boolean }
	| { type: 'set_form'; payload: Form };

export const initState: State = {
	loading: false,
	saving: false,
	form: {
		layout: 'one',
		position: 'top',
		close_after: 3
	},
};

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'set_loading':
			return { ...state, loading: action.payload };
		case 'set_saving':
			return { ...state, saving: action.payload };
		case 'set_form':
			return { ...state, form: action.payload };
		default:
			return state;
	}
};
