import React, { useMemo } from 'react';
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart} from 'recharts';

const BarChartView = ({ summary = [] }) => {
	const chartData = useMemo(() => {
		return summary.map(item => ({
			name: item.Country,
			active: item.TotalConfirmed - item.TotalDeaths - item.TotalRecovered,
			deaths: item.TotalDeaths,
			recovered: item.TotalRecovered
		}));
	}, [summary]);
	
	
	return (
		<ResponsiveContainer width="100%" height={500}>
			<BarChart width={600} height={300} data={chartData}
					  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
				<CartesianGrid strokeDasharray="3 3"/>
				<XAxis dataKey="name"/>
				<YAxis/>
				<Tooltip/>
				<Legend />
				<Bar dataKey="active" fill="blue" />
				<Bar dataKey="deaths" fill="red" />
				<Bar dataKey="recovered" fill="green" />

			</BarChart>
		</ResponsiveContainer>
	);
};

export default BarChartView;
