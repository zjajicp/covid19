import useCovid19API from './useCovid19API';
import {useMemo, useState} from 'react';
import {pathOr} from 'ramda';
import {calculateActive} from '../utils';

export default () => {
	const [countryFilter, setCountryFilter] = useState([]);
	const {countries: countriesApi, summary: summaryApi} = useCovid19API();
	const [view, setView] = useState('table');
	
	const toggleView = () => {
		setView(currentView => currentView === 'table' ? 'bar' : 'table');
	};
	
	const {data: allCountries} = countriesApi;
	
	const {data: summary = {}, loading: summaryLoading, refresh: refreshSummary} = summaryApi;
	
	const addCountryFilter = (country) => {
		setCountryFilter(currentFilter => currentFilter
			.filter(filteredCountry => filteredCountry.Slug !== country.Slug)
			.concat(country));
	};
	
	const removeCountryFilter = (country) => {
		setCountryFilter(currentFilter => currentFilter
			.filter(filteredCountry => filteredCountry.Slug !== country.Slug));
	};

	const filteredCountriesMap = useMemo(() => {
		if (!countryFilter || !countryFilter.length) {
			return;
		}

		return countryFilter.reduce((acc, country) => ({
			...acc,
			[country.Slug]: country
		}), {});
	}, [countryFilter]);
	
	const filteredSummary = useMemo(() => {
		return filteredCountriesMap ?
			summary.Countries.filter(country => !!filteredCountriesMap[country.Slug]) :
			pathOr([], ['Countries'], summary);
	}, [summary, filteredCountriesMap]);

	const totals = useMemo(() => {
		return filteredSummary.reduce((acc, country) => {
			return {
				active: acc.active + calculateActive(country),
				deaths: acc.deaths + country.TotalDeaths,
				recovered: acc.recovered + country.TotalRecovered
			};
		}, {
			active: 0,
			deaths: 0,
			recovered: 0
		});
	}, [filteredSummary]);
	
	return {
	    state: {
	        allCountries,
			summary: filteredSummary,
			summaryLoading,
			message: summary.Message,
			filteredCountries: countryFilter,
			view,
			countryFilter,
			totals
		},
		actions: {
	        refreshSummary,
			addCountryFilter,
			removeCountryFilter,
			toggleView,
			setView
		}
	};
};