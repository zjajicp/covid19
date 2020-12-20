import React from 'react';
import {Dropdown} from 'react-bootstrap';

const ViewSwitcher = ({ onSwitch, view}) => {
	return (
		<Dropdown onSelect={(eventKey) => {
			onSwitch(eventKey);
		}}>
			<Dropdown.Toggle variant="success" id="dropdown-basic">
				{view === 'table' ? 'Table' : 'Bar Chart'}
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<Dropdown.Item eventKey="table">Table</Dropdown.Item>
				<Dropdown.Item eventKey="bar">Bar Chart</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default ViewSwitcher;
