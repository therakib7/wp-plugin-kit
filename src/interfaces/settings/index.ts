export interface Form {
	layout: string;
	position: string;
	close_after: number;
}

export interface State {
	loading: boolean;
	saving: boolean;
	form: Form;
}
