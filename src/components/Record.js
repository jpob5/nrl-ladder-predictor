import { storm, roosters, raiders, rabbitohs, eagles, eels, broncos, sharks, tigers, panthers, knights, warriors, cowboys, dragons, bulldogs, titans } from './Teams';

let originalTeams = {
    Storm: {
        name: storm,
        top8: 0,
        top4: 0,
        highest: 0,
        lowest: 0,
        average: 0,
        averagePoints: 0,
        perPosition: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    Roosters: {
        name: roosters,
        top8: 0,
        top4: 0,
        highest: 0,
        lowest: 0,
        average: 0,
        averagePoints: 0,
        perPosition: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    Raiders: {
        name: raiders,
        top8: 0,
        top4: 0,
        highest: 0,
        lowest: 0,
        average: 0,
        averagePoints: 0,
        perPosition: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    Rabbitohs: {
        name: rabbitohs,
        top8: 0,
        top4: 0,
        highest: 0,
        lowest: 0,
        average: 0,
        averagePoints: 0,
        perPosition: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    'Sea Eagles': {
        name: eagles,
        top8: 0,
        top4: 0,
        highest: 0,
        lowest: 0,
        average: 0,
        averagePoints: 0,
        perPosition: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    Eels: {
        name: eels,
        top8: 0,
        top4: 0,
        highest: 0,
        lowest: 0,
        average: 0,
        averagePoints: 0,
        perPosition: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    Broncos: {
        name: broncos,
        top8: 0,
        top4: 0,
        highest: 0,
        lowest: 0,
        average: 0,
        averagePoints: 0,
        perPosition: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    Sharks: {
        name: sharks,
        top8: 0,
        top4: 0,
        highest: 0,
        lowest: 0,
        average: 0,
        averagePoints: 0,
        perPosition: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    Tigers: {
        name: tigers,
        top8: 0,
        top4: 0,
        highest: 0,
        lowest: 0,
        average: 0,
        averagePoints: 0,
        perPosition: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    Panthers: {
        name: panthers,
        top8: 0,
        top4: 0,
        highest: 0,
        lowest: 0,
        average: 0,
        averagePoints: 0,
        perPosition: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    Knights: {
        name: knights,
        top8: 0,
        top4: 0,
        highest: 0,
        lowest: 0,
        average: 0,
        averagePoints: 0,
        perPosition: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    Warriors: {
        name: warriors,
        top8: 0,
        top4: 0,
        highest: 0,
        lowest: 0,
        average: 0,
        averagePoints: 0,
        perPosition: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    Cowboys: {
        name: cowboys,
        top8: 0,
        top4: 0,
        highest: 0,
        lowest: 0,
        average: 0,
        averagePoints: 0,
        perPosition: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    Dragons: {
        name: dragons,
        top8: 0,
        top4: 0,
        highest: 0,
        lowest: 0,
        average: 0,
        averagePoints: 0,
        perPosition: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    Bulldogs: {
        name: bulldogs,
        top8: 0,
        top4: 0,
        highest: 0,
        lowest: 0,
        average: 0,
        averagePoints: 0,
        perPosition: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    Titans: {
        name: titans,
        top8: 0,
        top4: 0,
        highest: 0,
        lowest: 0,
        average: 0,
        averagePoints: 0,
        perPosition: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }
}

export {
    originalTeams
}