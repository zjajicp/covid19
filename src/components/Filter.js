import React from 'react';
import {Box, Flex, Text} from 'rebass';
import CountryAutocomplete from './CountryAutocomplete';
import {FaTimes} from 'react-icons/fa';
import styled from 'styled-components';

const StyledFilterItem = styled(Flex)`
	padding: 5px 10px;
`;

const RemoveIcon = styled(FaTimes)`
	cursor: pointer;
`;

const FilteredCountries = styled(Flex)`
	transform: translateY(-5px);
`;

const FilterItem = ({country, onRemove, ...props}) => {
	return <StyledFilterItem alignItems="center" {...props}>
		<Text mr="10px" fontSize={13}>{country.Country}</Text>
		<Box onClick={() => {
			onRemove(country);
		}}>
			<RemoveIcon/>
		</Box>
	</StyledFilterItem>;
};

const Filter = ({onAddCountry, onRemoveCountry, countryFilter, countries}) => {
	return (
		<Flex alignItems="center">
			<CountryAutocomplete onFilterCountry={onAddCountry} countries={countries} />
			<FilteredCountries ml="10px" flexWrap="wrap">
				{countryFilter.map((country, index) => (
					<FilterItem
						mr={index !== countryFilter.length - 1 ? '10px' : 0}
						onRemove={onRemoveCountry}
						country={country} />
				))}
			</FilteredCountries>
		</Flex>
	);
};

export default Filter;
