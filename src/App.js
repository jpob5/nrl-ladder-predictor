import React from 'react';
import Head from './components/Head';
import Live from './components/Live';
import './styles/styles.scss';

function App() {
	return (
		<>
			<Head />
			<div className="App">
				{/* <Route exact path={'/'} render={() => <Live/>} /> */}
				<Live />
			</div>
		</>
	);
}

export default App;
