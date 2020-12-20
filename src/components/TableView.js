import React from 'react';
import {Table} from 'react-bootstrap';

const TableView = ({summary}) => {
	return  (
		<Table responsive variant="dark" striped bordered hover>
			<thead>
				<tr>
					<th>#</th>
					<th>Country</th>
					<th>Active cases</th>
					<th>Deaths</th>
					<th>Recoveries</th>
				</tr>
			</thead>

			<tbody>{summary.map((item, index) => (
				<tr key={item.CountryCode}>
					<td>{index + 1}</td>
					<td>{item.Country}</td>
					<td>{item.TotalConfirmed - item.TotalDeaths - item.TotalRecovered}</td>
					<td>{item.TotalDeaths}</td>
					<td>{item.TotalRecovered}</td>
				</tr>
			))}</tbody>

		</Table>
	);
};

export default TableView;
