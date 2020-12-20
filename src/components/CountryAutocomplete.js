import React, {useEffect, useState} from 'react';
import {Flex, Box} from 'rebass';
import ReactAutocomplete from 'react-autocomplete';
import {Form, Dropdown} from 'react-bootstrap';
import styled from 'styled-components';

const MenuItem = styled(Dropdown.Item)`
	background: ${props => props.isHighlighted ? '#ccc' : undefined};
	white-space: normal;
`;

const Menu = styled(Box)`
	z-index: 999;
	position: absolute;
	background: #fff;
	border: 1px solid ${props => props.theme.colors.borders};
	border-radius: 5px;
	max-height: 200px;
    overflow-y: scroll;
`;

const InputControl = styled(Form.Control)`
	width: 100%;
`;

const Autocomplete = styled(ReactAutocomplete)`
	width: 100%;
`;

const CountryAutocomplete = ({countries = [], onFilterCountry, ...props}) => {
	const [searchWord, setSearchWord] = useState('');
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const offClickHandler = (evt) => {
			const inputElement = document.querySelector('.filter-input');
			if (evt.target !== inputElement) {
				setMenuOpen(false);
			}
		};

		window.addEventListener('click', offClickHandler);

		return () => {
			window.removeEventListener('click', offClickHandler);
		};
	}, []);

	return (
		<Flex className="container" {...props}>
			<Autocomplete
				wrapperProps={{
					style: {
						width: '100%'
					}
				}}
				className="test"
				open={menuOpen}
				renderMenu={(items, value, style) => (
					<Menu  style={{
						...style,
						maxWidth: style.minWidth
					}}>
						{items}
					</Menu>
				)}
				getItemValue={(item) => item.Country}
				items={countries}
				shouldItemRender={item => item.Country.toLowerCase().includes(searchWord.toLowerCase())}
				renderItem={(item, isHighlighted) =>
					<MenuItem isHighlighted={isHighlighted}>
						{item.Country}
					</MenuItem>
				}
				renderInput={inputProps => (
						  <InputControl
							  className="filter-input"
							  type="text"
							  placeholder="filter country"
							  {...inputProps}
							  onFocus={() => {
							setMenuOpen(true);
							  }}
							  onBlur={() => {
							setSearchWord('');
						  }} />
				)}
				value={searchWord}
				onChange={(evt) => {
					if (!menuOpen) {
						setMenuOpen(true);
					}
					setSearchWord(evt.target.value);

				}}
				onSelect={(_, item) => {
					setSearchWord('');
					setMenuOpen(false);
					onFilterCountry(item);
				}} />

		</Flex>
	);
};

export default CountryAutocomplete;
