function sortSimulation(a, b) {
    if (a[1] === b[1]) {
        return (a[2] > b[2]) ? -1 : 1;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}

function sortLadder(a, b) {
    if (a[1].top8 === b[1].top8) {
        return (a[1].average < b[1].average) ? -1 : 1;
    }
    else {
        return (a[1].top8 > b[1].top8) ? -1 : 1;
    }
}

export {
    sortSimulation,
    sortLadder
}