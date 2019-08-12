import React from 'react';
import { storm, roosters, raiders, rabbitohs, eagles, eels, broncos, sharks, tigers, panthers, knights, warriors, cowboys, dragons, bulldogs, titans } from './Teams';
import ladder from './Ladder';
import draw from './Draw';
import realResults from './Results';
import {teams, originalTeams} from './Record';


class Live extends React.Component {

    printLadder() {
        let currentLadder = [];
        ladder.map(function(team) {
            currentLadder.push(
                <tr>
                    <td>{team[0]}</td>
                    <td>{team[1]}</td>
                    <td>{team[2]}</td>
                </tr>
            )
            return false;
        });
        return currentLadder;
    }

    render() {
        return (
            <div className="ladder">
                <table>
                    <tbody>
                        <tr>
                            <th>Team</th>
                            <th>Points</th>
                            <th>F/A</th>
                        </tr>
                        {this.printLadder()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Live;