import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import $ from 'jquery';
import { log } from './Helpers';
import realLadder from './RealLadder';
import draw from './Draw';
import realResults from './Results';
import { originalTeams } from './Record';
import Ladder from './Ladder';


class Live extends React.Component {

    constructor(props) {
        super(props);

        this.ladder = realLadder;
        this.currentIterations = 0;
        this.iterations = 1;

        this.loopTime = 1000;

        this.ladderType = 'dynamic';

        this.teamLadder = [];
        this.chosenTeam = null;

        this.loop = null;
        this.state = {
            currentIterations: 0,
            showTeamLadder: false,
            speed: 'slow'
        }

        this.record = $.extend(true, {}, originalTeams);
    }

    componentDidMount() {
        this.loop = setInterval(() => {
            this.calculatePercentage()
        }, this.loopTime);
    }

    componentWillUnmount() {
        clearInterval(this.loop);
    }

    calculateSeasonResults(newLadder) {
        for (let j = 0; j < newLadder.length; j++) {
            let name = newLadder[j][0];
            if (j < (8)) {
                this.record[name].top8++;
            } else if (newLadder[j][1] === newLadder[8 - 1][1] && this.ladderType === 'basic') {
                this.record[name].top8++;
            }
            if (j < (4)) {
                this.record[name].top4++;
            } else if (newLadder[j][1] === newLadder[4 - 1][1] && this.ladderType === 'basic') {
                this.record[name].top4++;
            }
            if (this.record[name].lowest === 0 || this.record[name].lowest < (j + 1)) {
                this.record[name].lowest = j + 1;
            }
            if (this.record[name].highest === 0 || this.record[name].highest > (j + 1)) {
                this.record[name].highest = j + 1;
            }
            this.record[name].average = ((this.record[name].average * (this.currentIterations - 1)) + (j + 1)) / this.currentIterations;
            this.record[name].averagePoints = ((this.record[name].averagePoints * (this.currentIterations - 1)) + newLadder[j][1]) / this.currentIterations;
            this.record[name].perPosition[j] += 1;
        }
    }

    calculatePercentage() {
        for (let x = 0; x < this.iterations; x++) {
            this.currentIterations++;
            var newLadder = realLadder.map(function (arr) {
                return arr.slice();
            });
            for (let i = 0; i < draw.length; i++) {
                const winNum = Math.floor(Math.random() * 2);
                const winner = winNum === 1 ? draw[i][1] : draw[i][0];
                const loser = winNum === 1 ? draw[i][0] : draw[i][1];
                const winningAmount = realResults[Math.floor(Math.random() * realResults.length)];
                let points = 2;
                if (winningAmount === 0) {
                    points = 1;
                }
                for (let j = 0; j < newLadder.length; j++) {
                    if (newLadder[j][0] === winner) {
                        newLadder[j][1] += points;
                        if (this.ladderType === 'dynamic') {
                            newLadder[j][2] += winningAmount;
                        }
                    }
                    if (newLadder[j][0] === loser) {
                        if (points === 0) {
                            newLadder[j][1] += points;
                        }
                        if (this.ladderType === 'dynamic') {
                            newLadder[j][2] -= winningAmount;
                        }
                    }
                }
            }
            newLadder.sort(this.compareSecondColumn);
            this.calculateSeasonResults(newLadder);
        }
        this.setState({});
    }

    createTeamLadder(team) {
        if (this.chosenTeam !== team) {
            this.teamLadder = [];
            this.chosenTeam = team;
            this.chosenTeam.perPosition.map((amount, index) => {
                this.teamLadder.push(
                    <tr key={index} className={this.chosenTeam.name}>
                        <td>{(index + 1)}</td>
                        <td>{amount}</td>
                        {/* <td>{team[1].averagePoints.toFixed(2)}</td> */}
                    </tr>
                );
                return false;
            });
            this.setState({
                showTeamLadder: true
            });
        } else {
            this.chosenTeam = null;
            this.setState({
                showTeamLadder: false
            });
        }
    }

    printLadder() {
        let currentLadder = [];
        const recordAsArray = Object.entries(this.record);
        recordAsArray.sort(this.compareTop8Column);
        recordAsArray.map((team, index) => {
            const percentage = (Math.floor((recordAsArray[index][1].top8 / this.currentIterations) * 10000) / 100);
            const safePercentage = isNaN(percentage) ? 0 : percentage;
            const top4Percentage = (Math.floor((recordAsArray[index][1].top4 / this.currentIterations) * 10000) / 100);
            const top4SafePercentage = isNaN(top4Percentage) ? 0 : top4Percentage;
            const homeFinal = Math.floor(((team[1].perPosition[0] + team[1].perPosition[1] + team[1].perPosition[4] + team[1].perPosition[5]) / this.currentIterations) * 10000) / 100;
            const safeHomeFinal = isNaN(homeFinal) ? 0 : homeFinal
            if (this.state.showTeamLadder) {
                const teamPercentage = (Math.floor((this.chosenTeam.perPosition[index] / this.currentIterations) * 10000) / 100);
                const teamSafePercentage = isNaN(teamPercentage) ? 0 : teamPercentage;
                currentLadder.push(
                    <tr key={index} className={team[1].name + (this.chosenTeam.name === team[1].name ? ' active-team' : '')} onClick={() => this.createTeamLadder(team[1])}>
                        <td>{(index + 1)}</td>
                        <td>{team[1].name}</td>
                        <td className="rank-percentage">{teamSafePercentage.toFixed(2)}</td>
                        <td>{this.chosenTeam.name === team[1].name ? top4SafePercentage.toFixed(2) : '###'}</td>
                        <td>{this.chosenTeam.name === team[1].name ? team[1].highest : '###'}</td>
                        <td>{this.chosenTeam.name === team[1].name ? team[1].lowest : '###'}</td>
                        <td>{this.chosenTeam.name === team[1].name ? team[1].average.toFixed(2) : '###'}</td>
                        <td>{this.chosenTeam.name === team[1].name ? safeHomeFinal.toFixed(2) : '###'}</td>
                        {/* <td>{team[1].averagePoints.toFixed(2)}</td> */}
                    </tr>
                )
            } else {
                currentLadder.push(
                    <tr key={index} className={team[1].name} onClick={() => this.createTeamLadder(team[1])}>
                        <td>{(index + 1)}</td>
                        <td>{team[1].name}</td>
                        <td>{safePercentage.toFixed(2)}</td>
                        <td>{top4SafePercentage.toFixed(2)}</td>
                        <td>{team[1].highest}</td>
                        <td>{team[1].lowest}</td>
                        <td>{team[1].average.toFixed(2)}</td>
                        <td>{safeHomeFinal.toFixed(2)}</td>
                        {/* <td>{team[1].averagePoints.toFixed(2)}</td> */}
                    </tr>
                )
            }
            return false;
        });
        return currentLadder;
    }

    compareSecondColumn(a, b) {
        if (a[1] === b[1]) {
            return (a[2] > b[2]) ? -1 : 1;
        }
        else {
            return (a[1] > b[1]) ? -1 : 1;
        }
    }

    compareTop8Column(a, b) {
        if (a[1].top8 === b[1].top8) {
            return (a[1].average < b[1].average) ? -1 : 1;
        }
        else {
            return (a[1].top8 > b[1].top8) ? -1 : 1;
        }
    }

    changeSpeed(speed) {
        this.setState({
            speed: speed
        });
        if (speed === 'slow') {
            this.loopTime = 1000;
            this.iterations = 1;
        } else if (speed === 'medium') {
            this.loopTime = 200;
            this.iterations = 10;
        } else if (speed === 'fast') {
            this.loopTime = 25;
            this.iterations = 250;
        }
        clearInterval(this.loop);
        this.loop = setInterval(() => {
            this.calculatePercentage()
        }, this.loopTime);
    }

    render() {
        return (
            <>
                <Container>
                    <Row>
                        <Col xs="12">
                            <h1>NRL Ladder Predictor</h1>
                            <p>This project compiles the results over many simulations for the rest of the season to find each teams chance of making the top 8. Click on a team to see a breakdown of their chances at each position.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" lg="12">
                            <div className={'ladder ' + (this.state.showTeamLadder ? 'show-team-percentages' : '')}>
                                <Ladder>{this.printLadder()}</Ladder>
                            </div>
                        </Col>
                        <Col xs="12" lg="12">
                            <section>
                                <h3>Controls</h3>
                                <div className="controls" role="radiogroup">
                                    <div>Simulations: {this.currentIterations}</div>
                                    <div className="speed-controls">
                                        <div id="loop-speed">Speed:</div>
                                        <div>
                                            <label className="radio-container" htmlFor="slow">
                                                <input id="slow"
                                                    name="speed"
                                                    type="radio"
                                                    onChange={(e) => { this.changeSpeed('slow') }}
                                                    checked={this.state.speed === 'slow' ? 'checked' : ''} /> Slow (1 sim/s)
                                            </label>
                                        </div>
                                        {/* <div>
                                            <label className="radio-container" htmlFor="medium">
                                                <input id="medium"
                                                    name="speed"
                                                    type="radio"
                                                    onChange={(e) => { this.changeSpeed('medium') }}
                                                    checked={this.state.speed === 'medium' ? 'checked' : ''} /> Medium (50 sim/s)
                                            </label>
                                        </div> */}
                                        <div>
                                            <label className="radio-container" htmlFor="fast">
                                                <input id="fast"
                                                    name="speed"
                                                    type="radio"
                                                    onChange={(e) => { this.changeSpeed('fast') }}
                                                    checked={this.state.speed === 'fast' ? 'checked' : ''} /> Fast (10,000 sim/s)
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </Col>
                    </Row>
                    <Row>
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
                                </ul>
                            </section>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Live;