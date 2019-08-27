import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import Head from './components/Head';
import Live from './components/Live';
import Notes from './components/Notes';
import Todos from './components/Todos';
import './styles/styles.scss';

function App() {
	return (
		<>
			<Head />
			<div className="App">
				{/* <Route exact path={'/'} render={() => <Live/>} /> */}
				<Container>
                    <Row>
                        <Col xs="12">
                            <h1>NRL Ladder Predictor</h1>
                            <p>This project compiles the results over many simulations for the rest of the season to find each teams chance of making the top 8. Click on a team to see a breakdown of their chances at each position.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Live />
                    </Row>
                    <Row>
                        <Notes />
                        <Todos />
                    </Row>
                </Container>
			</div>
		</>
	);
}

export default App;
