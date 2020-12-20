import React from 'react';
import {ThemeProvider} from 'styled-components';

const breakpoints = {
	xs: '0',
	sm: '768px', //768px
	md: '992px', //992px
	lg: '1200px', //1200px
	xl: '1440px', //1440px
};

const bpsArray = Object.entries(breakpoints).reduce((arr, bp) => {
	arr.push(bp[1]);
	return arr;
}, []);

const mq = {};
Object.keys(breakpoints).forEach(bp => {
	mq[bp] = `@media (min-width: ${breakpoints[bp]})`;
	mq[`${bp}Inverted`] = `@media (max-width: ${breakpoints[bp]})`;
});

const theme = {
	mq,
	breakpoints: bpsArray,
	colors: {
		primary: '#1890ff',
		white: '#fff',
		borders: '#e8e8e8',
		orange: '#e66723',
		warning: '#f5a623',
		error: '#E31C12',
		iceBlue: '#eceded',
		green: '#569B07',
		dark: '#000',
	},
	space: [0, 4, 8, 16, 24, 32, 40, 48, 56, 64, 128, 256],
	fonts: {
		sans: '"myriad-pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
		body: '"myriad-pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
		heading: '"myriad-pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
		mono: 'Menlo, monospace',
	},
	fontSizes: [12, 13, 16, 21, 24, 32, 48],
	shadows: {
		small: '0 0 4px rgba(0, 0, 0, .125)',
		large: '0 0 24px rgba(0, 0, 0, .125)',
	},
};

export default ({children}) => (
	<ThemeProvider theme={theme}>{children}</ThemeProvider>
);

