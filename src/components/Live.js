import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import $ from 'jquery';
//import { storm, roosters, raiders, rabbitohs, eagles, eels, broncos, sharks, tigers, panthers, knights, warriors, cowboys, dragons, bulldogs, titans } from './Teams';
import { log } from './Helpers';
import ladder from './Ladder';
import draw from './Draw';
import realResults from './Results';
import { originalTeams } from './Record';


class Live extends React.Component {

    constructor(props) {
        super(props);

        this.ladder = ladder;
        this.currentIterations = 0;
        this.iterations = 1;

        this.loopTime = 500;

        this.ladderType = 'dynamic';

        this.loop = null;
        this.state = {
            currentIterations: 0,
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
        }
    }

    calculatePercentage() {
        for (let x = 0; x < this.iterations; x++) {
            this.currentIterations++;
            var newLadder = ladder.map(function (arr) {
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

    printLadder() {
        let currentLadder = [];
        const recordAsArray = Object.entries(this.record);
        recordAsArray.sort(this.compareTop8Column);
        recordAsArray.map((team, index) => {
            const percentage = (Math.floor((recordAsArray[index][1].top8 / this.currentIterations) * 10000) / 100);
            const safePercentage = isNaN(percentage) ? 0 : percentage;
            const top4Percentage = (Math.floor((recordAsArray[index][1].top4 / this.currentIterations) * 10000) / 100);
            const top4SafePercentage = isNaN(top4Percentage) ? 0 : top4Percentage;
            currentLadder.push(
                <tr key={index}>
                    <td>{(index + 1)}</td>
                    <td>{team[1].name}</td>
                    <td>{safePercentage.toFixed(2)}</td>
                    <td>{top4SafePercentage.toFixed(2)}</td>
                    <td>{team[1].highest}</td>
                    <td>{team[1].lowest}</td>
                    <td>{team[1].average.toFixed(2)}</td>
                    <td>{team[1].averagePoints.toFixed(2)}</td>
                </tr>
            )
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
        if (a[1].average === b[1].average) {
            return 0;
        }
        else {
            return (a[1].average < b[1].average) ? -1 : 1;
        }
    }

    changeSpeed(speed) {
        this.setState({
            speed: speed
        });
        if (speed === 'slow') {
            this.loopTime = 500;
            this.iterations = 1;
        } else if (speed === 'medium') {
            this.loopTime = 200;
            this.iterations = 1;
        } else if (speed === 'fast') {
            this.loopTime = 50;
            this.iterations = 100;
        }
        clearInterval(this.loop);
        this.loop = setInterval(() => {
            this.calculatePercentage()
        }, this.loopTime);
    }

    render() {
        return (
            <>
                <h1>NRL Ladder Predictor</h1>
                <Container>
                    <Row>
                        <Col xs="12" md="3">

                            <div className="controls" role="radiogroup">
                                <div>Simulations: {this.currentIterations} </div>
                                <div id="loop-speed">Speed:</div>
                                <div>
                                    <label className="radio-container" htmlFor="slow">
                                        <input id="slow"
                                            name="speed"
                                            type="radio"
                                            onChange={(e) => { this.changeSpeed('slow') }}
                                            checked={this.state.speed === 'slow' ? 'checked' : ''} /> Slow
                                    </label>
                                </div>
                                <div>
                                    <label className="radio-container" htmlFor="medium">
                                        <input id="medium"
                                            name="speed"
                                            type="radio"
                                            onChange={(e) => { this.changeSpeed('medium') }}
                                            checked={this.state.speed === 'medium' ? 'checked' : ''} /> Medium
                                    </label>
                                </div>
                                <div>
                                    <label className="radio-container" htmlFor="fast">
                                        <input id="fast"
                                            name="speed"
                                            type="radio"
                                            onChange={(e) => { this.changeSpeed('fast') }}
                                            checked={this.state.speed === 'fast' ? 'checked' : ''} /> Fast
                                    </label>
                                </div>
                            </div>
                        </Col>
                        <Col xs="12" md="9">
                            <div className="ladder">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Pos.</th>
                                            <th>Team</th>
                                            <th>Top 8 %</th>
                                            <th>Top 4 %</th>
                                            <th>Highest</th>
                                            <th>Lowest</th>
                                            <th>Average</th>
                                            <th>Points</th>
                                        </tr>
                                        {this.printLadder()}
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Live;