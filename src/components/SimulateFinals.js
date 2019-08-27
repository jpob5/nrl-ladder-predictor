function SimulateFinals(newLadder) {
    let finalsTeams = [];
    for (let i = 0; i < (newLadder.length / 2); i++) {
        finalsTeams.push([newLadder[i][0], false, false, false, false]);
    }

    // Qualifying
    let secondRound = [];
    let byes = [];
    let winNum = Math.floor(Math.random() * 2);
    if (winNum < 1) {
        finalsTeams[0][1] = true;
        finalsTeams[0][2] = true;
        byes.push(finalsTeams[0]);
        secondRound.push(finalsTeams[3]);
    } else {
        finalsTeams[3][1] = true;
        finalsTeams[3][2] = true;
        byes.push(finalsTeams[3]);
        secondRound.push(finalsTeams[0]);
    }
    winNum = Math.floor(Math.random() * 2);
    if (winNum < 1) {
        finalsTeams[1][1] = true;
        finalsTeams[1][2] = true;
        byes.push(finalsTeams[1]);
        secondRound.push(finalsTeams[2]);
    } else {
        finalsTeams[2][1] = true;
        finalsTeams[2][2] = true;
        byes.push(finalsTeams[2]);
        secondRound.push(finalsTeams[1]);
    }
    winNum = Math.floor(Math.random() * 2);
    if (winNum < 1) {
        finalsTeams[4][1] = true;
        secondRound.push(finalsTeams[4]);
    } else {
        finalsTeams[7][1] = true;
        secondRound.push(finalsTeams[7]);
    }
    winNum = Math.floor(Math.random() * 2);
    if (winNum < 1) {
        finalsTeams[5][1] = true;
        secondRound.push(finalsTeams[5]);
    } else {
        finalsTeams[6][1] = true;
        secondRound.push(finalsTeams[6]);
    }

    // Semi
    let thirdRound = [byes[0], byes[1]];
    winNum = Math.floor(Math.random() * 2);
    if (winNum < 1) {
        secondRound[0][2] = true;
        thirdRound.push(secondRound[0]);
    } else {
        secondRound[2][2] = true;
        thirdRound.push(secondRound[2]);
    }
    winNum = Math.floor(Math.random() * 2);
    if (winNum < 1) {
        secondRound[1][2] = true;
        thirdRound.push(secondRound[1]);
    } else {
        secondRound[3][2] = true;
        thirdRound.push(secondRound[3]);
    }

    // Prelim
    let fourthRound = [];
    winNum = Math.floor(Math.random() * 2);
    if (winNum < 1) {
        thirdRound[0][3] = true;
        fourthRound.push(thirdRound[0]);
    } else {
        thirdRound[3][3] = true;
        fourthRound.push(thirdRound[3]);
    }
    winNum = Math.floor(Math.random() * 2);
    if (winNum < 1) {
        thirdRound[1][3] = true;
        fourthRound.push(thirdRound[1]);
    } else {
        thirdRound[2][3] = true;
        fourthRound.push(thirdRound[2]);
    }

    // Grand Final
    let winner = '';
    winNum = Math.floor(Math.random() * 2);
    if (winNum < 1) {
        fourthRound[0][4] = true;
        winner = fourthRound[0][0];
    } else {
        fourthRound[1][4] = true;
        winner = fourthRound[1][0];
    }
    return winner;
}

export default SimulateFinals;