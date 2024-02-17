import React, { ReactNode } from 'react';

interface Props {
	label: string;
	children: ReactNode;
}

const Topbar: React.FC<Props> = ({ label, children }) => {
	return (
		<div className="wp-plugin-kit-topbar">
			<div className="wp-plugin-kit-topbar-content flex justify-between items-center">
				<h2 className="wp-plugin-kit-topbar-label text-gray-900">
					{label}
				</h2>
				<div className="wp-plugin-kit-topbar-action">{children}</div>
			</div>
		</div>
	);
};

export default Topbar;
