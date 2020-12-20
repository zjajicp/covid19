import React from 'react';
import Covid19 from './Covid19';
import ThemeProvider from './theme/ThemeProvider';

function App() {
	return (
		<ThemeProvider>
			<Covid19 />
		</ThemeProvider>
	);
}

export default App;
