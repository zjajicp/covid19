import React from 'react';
import './App.css';
import useCovid19 from './hooks/useCovid19';
import {Flex, Box} from 'rebass';
import TableView from './components/TableView';
import {  Spinner} from 'react-bootstrap';
import Filter from './components/Filter';
import ViewSwitcher from './components/ViewSwitcher';
import BarChartView from './components/BarChartView';
import styled from 'styled-components';

const AppContainer = styled(Flex)`
	background: wheat;
	min-height: 100vh;
`;

const renderView = ({ view, summary}) => {
	return <Box mt="30px">
		{view === 'table' ? <TableView  summary={summary} /> : <BarChartView summary={summary} />}
	</Box>;
};

function App() {
	const {state, actions} = useCovid19();
	const {addCountryFilter, removeCountryFilter, setView } = actions;

	const { summaryLoading, countryFilter, allCountries, summary, view} = state;
	return (
		<AppContainer background="wheat" py="40px" px="20px" flexDirection="column">
			<Flex justifyContent="space-between">
				<Filter
					onRemoveCountry={removeCountryFilter}
					countries={allCountries}
					onAddCountry={addCountryFilter}
					countryFilter={countryFilter} />

				<ViewSwitcher view={view} onSwitch={setView} />
			</Flex>

			{summaryLoading ?  (<Flex alignitems="center" justifyContent="center">
				<Spinner animation="border" role="status">
					<span className="sr-only">Loading...</span>
				</Spinner>
			</Flex>) : renderView({
				view,
				summary,
			})}
			
		</AppContainer>
	);
}

export default App;
