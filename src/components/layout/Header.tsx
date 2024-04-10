interface Props {
	label: string;
	children: any;
}

const Header = ( { label, children }: Props ) => {
	return (
		<div className="wp-plugin-kit-header">
			<div className="wp-plugin-kit-header-content flex justify-between items-center">
				<h2 className="wp-plugin-kit-header-label text-gray-900">
					{ label }
				</h2>
				<div className="wp-plugin-kit-header-action">{ children }</div>
			</div>
		</div>
	);
};

export default Header;
