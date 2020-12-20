import {useEffect, useState} from 'react';
import axios from 'axios';

const createRequestHook = (method) => (url, {lazy = false, ...options} = {}) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const [data, setData] = useState();
	const request =  (redefinedParams) => { 
		setLoading(true);
		return axios[method](url, {
			...options,
			...redefinedParams
		}).catch(error => {
		    setLoading(false);
			setError(error);
		}).then(result => {
			setLoading(false);
			setData(result && result.data);
		});
	};

	useEffect(() => {
		if (!lazy) {
			request();
		}
	}, []);

	return {
		loading,
		error,
		data,
		refresh: request
	};
};

export const useGetRequest = createRequestHook('get');

export const usePostRequest = createRequestHook('post');