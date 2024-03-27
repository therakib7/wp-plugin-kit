export interface Form {
	layout: string;
	position: string;
	close_after: number;
}

export interface State {
	isLoading: boolean;
	isSaving: boolean;
	form: Form;
}
