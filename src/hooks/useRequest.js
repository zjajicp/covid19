import {useEffect, useState, useRef} from 'react';
import axios from 'axios';

const createRequestHook = (method) => (url, {lazy = false, poolingInterval,  ...options} = {}) => {
	const [loading, setLoading] = useState(false);
	const [pooling, setPooling] = useState(false);
	const [error, setError] = useState();
	const [data, setData] = useState();
	const request = (redefinedParams, isPooling) => {
		const setLoader = (value) => {
			if (isPooling) {
				setPooling(value);
			} else {
				setLoading(value);
			}
		};

		setLoader(true);
		return axios[method](url, {
			...options,
			...redefinedParams
		}).catch(error => {
		    setLoader(false);
			setError(error);
		}).then(result => {
			setLoader(false);
			setData(result && result.data);
		});
	};

	useEffect(() => {
		if (!lazy) {
			request();
		}
	}, []);
	
	const poolingRef = useRef();
	
	useEffect(() => {
		if (poolingInterval > 0) {
			poolingRef.current = setInterval(() => {
				request(null, true);
			}, poolingInterval);
		}

		return () => {
			clearInterval(poolingRef.current);
		};
	}, []);

	const stopPooling = () => {
		clearInterval(poolingRef.current);
	};

	return {
		loading,
		error,
		data,
		pooling,
		refresh: request,
		stopPooling
	};
};

export const useGetRequest = createRequestHook('get');

export const usePostRequest = createRequestHook('post');