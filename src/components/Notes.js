import React from 'react';
import { Col } from 'reactstrap';

const Notes = (props) => {
    return (
        <Col xs="12">
            <section>
                <h3>Notes</h3>
                <ul>
                    <li>The data this is based on is up to date as of 6:37PM 25/08/19. I'll try to update this as often as I can but I can't guarantee it will always be up to date.</li>
                    <li>The speed changes the number of simulations per second. Slow is for dramatic effect, Fast is to calculate a more accurate average.</li>
                    <li>The for/against of each game is selected randomly from 100 real results recorded in the NRL.</li>
                    <li>Included in the real 100 results is a single 0 point margin constituting a draw. This occurs in approximately 1% of games.</li>
                    <li>The longer you leave the simulation running, the more accurate the simulation becomes.</li>
                    <li>The simluations do not consider which team is better, nor is it biased in anyway. Every team has roughly a 50% chance of winning each game. The simulation merely tries to find and calculate each teams chances based on a large number of scenarios.</li>
                    <li>This is not representitive of what the final ladder will look like as a whole as each teams average and percentage is independent of each other.</li>
                </ul>
            </section>
        </Col>
    );
}

export default Notes;