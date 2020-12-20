import {useGetRequest} from './useRequest';

const BASE_URL = 'https://api.covid19api.com';

export default () => {
	const summary = useGetRequest(`${BASE_URL}/summary`, {
		poolingInterval: 60 * 1000
	});
	const countries = useGetRequest(`${BASE_URL}/countries`);

	
	return {
	    summary,
		countries
	};
};