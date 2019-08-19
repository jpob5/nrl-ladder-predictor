import React from 'react';

class Ladder extends React.Component {
    render() {
        return (
            <>
                <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>Team</th>
                            <th>Top 8 %</th>
                            <th>Top 4 %</th>
                            <th>Highest</th>
                            <th>Lowest</th>
                            <th>Avg Pos.</th>
                            {/* <th>Points</th> */}
                        </tr>
                        {this.props.children}
                    </tbody>
                </table>
            </>
        )
    }
}

export default Ladder;