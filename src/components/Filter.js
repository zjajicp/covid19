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
	height: 11px;
`;

const FilteredCountries = styled(Flex)`
	transform: translateY(-5px);
`;

const FilterItem = ({country, onRemove, ...props}) => {
	return <StyledFilterItem alignItems="center" {...props}>
		<Text mr="8px" fontSize={13}>{country.Country}</Text>
		<Box onClick={() => {
			onRemove(country);
		}}>
			<RemoveIcon/>
		</Box>
	</StyledFilterItem>;
};

const Filter = ({onAddCountry, onRemoveCountry, countryFilter, countries}) => {
	return (
		<Flex sx={{
			flexDirection: ['column', 'row'],
			alignItems: ['flex-start', 'center']
		}}>
			<CountryAutocomplete p={0} sx={{
				width: ['100%', 400]
			}} onFilterCountry={onAddCountry} countries={countries} />
			<FilteredCountries sx={{
				mt: [2, 0],
				ml: [0, '10px'],
				mb: ['20px', 0]
			}} flexWrap="wrap">
				{countryFilter.map((country) => (
					<FilterItem
						onRemove={onRemoveCountry}
						country={country} />
				))}
			</FilteredCountries>
		</Flex>
	);
};

export default Filter;
