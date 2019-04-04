/*
SmartDots Algorithm - By Peter Cresswell

Settings
Static object containing the settings.
*/

var Settings = {
    //Window settings
    canWidth: 700,
    canHeight: 700,
    canColour: 'grey',
    fps: 60,
    //----------------------------------

    //Population settings
    populationSize: 100,
    lifeSpan: 250,
    noGenerations: 30,
    sawtooth: false,
    reduction: 2,
    period: 10,
    //----------------------------------

    //Dot settings
    startX: 700 / 2,
    startY: 700 / 2 + 200,
    dotRadius: 10,
    dotColour: 'black',
    bestDotColour: 'yellow',
    //----------------------------------

    //Goal Settings
    goalX: 700 / 2 - 15,
    goalY: 100,
    goalSize: 30,
    goalColour: 'blue',
    //----------------------------------

    //Obstacle Settings
    obstacleX: 700 / 2 - 150,
    obstacleY: 700 / 2 - 75,
    obstacleWidth: 300,
    obstacleHeight: 75,
    obstacleColour: 'black',
    //----------------------------------

    //Selection Settings
    tournamentParticipents: 10,
    selectionType: "ProportionalSelection",
    //----------------------------------

    //Crossover settings
    noCrossings: 1,
    //----------------------------------

    //Mutation Settings
    mutationRate: 0.5,
    DotSpecificMutation: false,
    GeneSpecificMutation: true,
    currentMultiplyer: 1,
    mutationMultiplyer: 0.5,
    //----------------------------------
};