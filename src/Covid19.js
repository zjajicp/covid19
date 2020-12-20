import React from 'react';
import useCovid19 from './hooks/useCovid19';
import {Flex, Box} from 'rebass';
import TableView from './components/TableView';
import {Alert, Spinner} from 'react-bootstrap';
import Filter from './components/Filter';
import ViewSwitcher from './components/ViewSwitcher';
import BarChartView from './components/BarChartView';
import styled from 'styled-components';

const Container = styled(Flex)`
	background: wheat;
	min-height: 100vh;
`;

const renderView = ({ view, summary, message, totals}) => {
	if (message) {
		return <Alert variant="warning">API Message: {message}</Alert>;
	}
	return <Box mt="30px">
		{view === 'table' ? <TableView totals={totals}  summary={summary} /> : <BarChartView summary={summary} />}
	</Box>;
};

function Covid19() {
	const {state, actions} = useCovid19();
	const {addCountryFilter, removeCountryFilter, setView } = actions;

	const { summaryLoading, countryFilter, allCountries, summary, view, message, totals} = state;
	return (
		<Container
			height="100%"
			background="wheat"
			py="40px"
			sx={{
				px: [10, 40, 60],
			}}
			flexDirection="column">
			<Flex mb={4} justifyContent="space-between" sx={{
				flexDirection: ['column', 'row']
			}}>
				<Filter
					onRemoveCountry={removeCountryFilter}
					countries={allCountries}
					onAddCountry={addCountryFilter}
					countryFilter={countryFilter} />
				<ViewSwitcher view={view} onSwitch={setView} />
			</Flex>

			{summaryLoading ?  (
				<Flex height="100vh" alignItems="center" justifyContent="center">
					<Spinner animation="border" role="status">
						<span className="sr-only">Loading...</span>
					</Spinner>
				</Flex>
			) : renderView({
				totals,
				view,
				summary,
				message
			})}

		</Container>
	);
}

export default Covid19;
