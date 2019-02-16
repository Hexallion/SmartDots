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
    fps: 50,
    //----------------------------------

    //Population settings
    populationSize: 100,
    lifeSpan: 250,
    mutationRate: 0.5,
    //----------------------------------

    //Dot settings
    startX: 700 / 2,
    startY: 700 / 2 + 200,
    dotRaidus: 10,
    dotColour: 'black',
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
    tournamentParticipents: 10
    //----------------------------------
};