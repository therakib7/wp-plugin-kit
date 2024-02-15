import { FC, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { get } from '@utils/api';

const General: FC = () => {
	const { data } = useQuery({
		queryKey: ['setting_general'],
		queryFn: () => get('settings', 'tab=test_tab'),
	});

	useEffect(() => {
		if (data) {
			//set state here
			// console.log(data)
		}
	}, [data]);

	return <div>General Settings</div>;
};
export default General;
