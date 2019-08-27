import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import $ from 'jquery';
import { log, prettifyNumber } from './Helpers';
import realLadder from './RealLadder';
import draw from './Draw';
import realResults from './Results';
import { originalTeams } from './Record';
import Ladder from './Ladder';
import SimulateFinals from './SimulateFinals';
import Controls from './Controls';
import {sortLadder, sortSimulation} from './Sorts';

class Live extends React.Component {

    constructor(props) {
        super(props);

        this.ladder = realLadder;
        this.currentIterations = 0;
        this.iterations = 1;

        this.loopTime = 1000;

        this.ladderType = 'dynamic';

        this.chosenTeam = null;

        this.loop = null;
        this.state = {
            currentIterations: 0,
            showTeamLadder: false,
            speed: 'slow'
        }

        this.record = $.extend(true, {}, originalTeams);

        this.setSpeed = this.setSpeed.bind(this);
    }

    componentDidMount() {
        this.startLoop();
    }

    componentWillUnmount() {
        clearInterval(this.loop);
    }

    startLoop() {
        this.loop = setInterval(() => {
            this.simulateSeason()
        }, this.loopTime);
    }

    calculateSeasonResults(newLadder) {
        const gfWinner = SimulateFinals(newLadder);
        for (let j = 0; j < newLadder.length; j++) {
            let name = newLadder[j][0];
            if (j < (8)) {
                this.record[name].top8++;
            }
            if (j < (4)) {
                this.record[name].top4++;
            }
            if (this.record[name].lowest === 0 || this.record[name].lowest < (j + 1)) {
                this.record[name].lowest = j + 1;
            }
            if (this.record[name].highest === 0 || this.record[name].highest > (j + 1)) {
                this.record[name].highest = j + 1;
            }
            if (gfWinner === name) {
                this.record[name].gfWins++;
            }
            this.record[name].average = ((this.record[name].average * (this.currentIterations - 1)) + (j + 1)) / this.currentIterations;
            this.record[name].averagePoints = ((this.record[name].averagePoints * (this.currentIterations - 1)) + newLadder[j][1]) / this.currentIterations;
            this.record[name].perPosition[j] += 1;
        }
    }

    simulateSeason() {
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
                        newLadder[j][2] += winningAmount;

                    }
                    if (newLadder[j][0] === loser) {
                        if (points === 0) {
                            newLadder[j][1] += points;
                        }
                        newLadder[j][2] -= winningAmount;
                    }
                }
            }
            newLadder.sort(sortSimulation);
            this.calculateSeasonResults(newLadder);
        }
        this.setState({});
    }

    createTeamLadder(team) {
        if (this.chosenTeam !== team) {
            this.chosenTeam = team;
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

    getPercentage(wins) {
        const percentage = wins / this.currentIterations;
        return prettifyNumber(percentage);
    }

    setSpeed(speed) {
        this.setState({
            speed: speed
        });
        if (speed === 'slow') {
            this.loopTime = 1000;
            this.iterations = 1;
        } else if (speed === 'fast') {
            this.loopTime = 25;
            this.iterations = 250;
        }
        clearInterval(this.loop);
        this.startLoop();
    }

    renderLadder() {
        let currentLadder = [];
        const recordAsArray = Object.entries(this.record);
        recordAsArray.sort(sortLadder);
        recordAsArray.map((team, index) => {
            const percentage = this.getPercentage(recordAsArray[index][1].top8);
            const top4Percentage = this.getPercentage(recordAsArray[index][1].top4);
            const homeFinal = this.getPercentage(team[1].perPosition[0] + team[1].perPosition[1] + team[1].perPosition[4] + team[1].perPosition[5]);
            const grandFinal = this.getPercentage(recordAsArray[index][1].gfWins);
            const teamPercentage = this.state.showTeamLadder ? this.getPercentage(this.chosenTeam.perPosition[index]) : 0;
            const isCurrentTeam = this.state.showTeamLadder ? this.chosenTeam.name === team[1].name : false;
            currentLadder.push(
                <tr key={index} className={team[1].name + (isCurrentTeam ? ' active-team' : '')} onClick={() => this.createTeamLadder(team[1])}>
                    <td>{(index + 1)}</td>
                    <td>{team[1].name}</td>
                    <td className={this.state.showTeamLadder ? "rank-percentage" : ''}>{this.state.showTeamLadder ? teamPercentage : percentage}</td>
                    <td>{(isCurrentTeam || !this.state.showTeamLadder) ? top4Percentage : '###'}</td>
                    <td>{(isCurrentTeam || !this.state.showTeamLadder) ? team[1].highest : '###'}</td>
                    <td>{(isCurrentTeam || !this.state.showTeamLadder) ? team[1].lowest : '###'}</td>
                    <td>{(isCurrentTeam || !this.state.showTeamLadder) ? team[1].average.toFixed(2) : '###'}</td>
                    <td>{(isCurrentTeam || !this.state.showTeamLadder) ? homeFinal : '###'}</td>
                    <td>{(isCurrentTeam || !this.state.showTeamLadder) ? grandFinal : '###'}</td>
                </tr>
            )
            return false;
        });
        return currentLadder;
    }

    render() {
        return (
            <>
                <Col xs="12" lg="12">
                    <div className={'ladder ' + (this.state.showTeamLadder ? 'show-team-percentages' : '')}>
                        <Ladder>{this.renderLadder()}</Ladder>
                    </div>
                </Col>
                <Col xs="12" lg="12">
                    <Controls iterations={this.currentIterations} setSpeed={this.setSpeed} currentSpeed={this.state.speed} />
                </Col>
            </>
        );
    }
}

export default Live;