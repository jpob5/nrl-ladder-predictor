import React from 'react';
import Live from './components/Live'
import './styles/styles.scss';

function App() {
	return (
		<>
			<link href="https://fonts.googleapis.com/css?family=Oxygen&display=swap" rel="stylesheet"></link>
			<link href="https://fonts.googleapis.com/css?family=Cutive+Mono&display=swap" rel="stylesheet"></link>
			<div className="App">
				<Live />
			</div>
		</>
	);
}

export default App;
