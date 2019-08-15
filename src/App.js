import React from 'react';
import Live from './components/Live'
import './styles/styles.scss';
import { HashRouter, Route } from 'react-router-dom';

function App() {
	return (
		<>
			<link href="https://fonts.googleapis.com/css?family=Oxygen&display=swap" rel="stylesheet"></link>
			<link href="https://fonts.googleapis.com/css?family=Cutive+Mono&display=swap" rel="stylesheet"></link>
			<HashRouter basename="/">
				<div className="App">
					<Route exact path={'/'} component={Live} />
					{/* <Live /> */}
				</div>
			</HashRouter>
		</>
	);
}

export default App;
