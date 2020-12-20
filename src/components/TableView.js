import React from 'react';
import {Table} from 'react-bootstrap';
import {calculateActive} from '../utils';
import FormatNumber from './FormatNumber';

const TableView = ({summary, totals}) => {
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

			<tbody>
			
				{summary.map((item, index) => (
					<tr key={item.CountryCode}>
						<td>{index + 1}</td>
						<td>{item.Country}</td>
						<td><FormatNumber>{calculateActive(item)}</FormatNumber></td>
						<td><FormatNumber>{item.TotalDeaths}</FormatNumber></td>
						<td><FormatNumber>{item.TotalRecovered}</FormatNumber></td>
					</tr>
				))}

				<tr>
					<td></td>
					<td></td>
					<td><FormatNumber>{totals.active}</FormatNumber></td>
					<td><FormatNumber>{totals.deaths}</FormatNumber></td>
					<td><FormatNumber>{totals.recovered}</FormatNumber></td>
				</tr>
			
			</tbody>

		</Table>
	);
};

export default React.memo(TableView);
