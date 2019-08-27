import React from 'react';
import { Col } from 'reactstrap';

const Todos = (props) => {
    return (
        <Col xs="12">
            <section>
                <h3>Todos</h3>
                <ul>
                    <li>Need to make the page UX/UI look better. I'll probably work on this as I go along.</li>
                    <li>Add a toggle for a weighted/biased ladder where teams on top have a higher chance of victory.</li>
                    <li>Add a prediction for what the final ladder will most likely be, based off the simulations.</li>
                    <li className="line-through">Capability to click on a team and see the chances of that team making certain positions on the ladder at the end of season.</li>
                    <li>Add a way for people to make their own predictions on future games which then adjusts the table accordingly.</li>
                    <li>Possibly make the simulation stop once it normalises to decrease overall load on devices.</li>
                    <li className="line-through">Add each teams home qualifying final chance.</li>
                    <li>Add each teams chance of winning the grand final.</li>
                </ul>
            </section>
        </Col>
    );
}

export default Todos;