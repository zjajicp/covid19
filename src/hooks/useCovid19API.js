import {useGetRequest} from './useRequest';
import {useState} from 'react';

const BASE_URL = 'https://api.covid19api.com';

export default () => {
	const [filter, setFilter] = useState();
	const summary = useGetRequest(`${BASE_URL}/summary`, );
	const countries = useGetRequest(`${BASE_URL}/countries`);

	
	return {
	    summary,
		countries,
		filter,
		setFilter,
	};
};