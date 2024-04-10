interface Props {
	className?: string;
	children: any;
}

const Content = ( { className = '', children }: Props ) => {
	return (
		<div className={ `wp-plugin-kit-content ${ className }` }>
			{ children }
		</div>
	);
};

export default Content;
