/*
SmartDots Algorithm - By Peter Cresswell

sketch
Central script controlling the sketch
*/

//Setup the canvas
function setup() {
    //Initialtes objects
    CurrentPopulation = new Population(Settings.populationSize);
    generationNumber = 0;

    Goal = new Goal();
    Obstacles = new Obstacles();

    SavedGenerations = [];
    //Setup canvas and other variables
    frameRate(Settings.fps);
    createCanvas(Settings.canWidth, Settings.canHeight);
}
//--------------------------------------------------------------------------------------------

//Draws onto the canvas and initiates the next step of the dots movement
function draw() {
    noStroke();
    background(Settings.canColour);

    //Draws goal
    fill(Goal.goalColour);
    rect(Goal.goalVector.x, Goal.goalVector.y, Goal.goalSize, Goal.goalSize);
    //--------------------------------------------------------------------------------------------

    //Draws all dots
    for (let i of CurrentPopulation.Dots) {
        fill(i.dotColour);
        ellipse(i.PVector.x, i.PVector.y, Settings.dotRaidus, Settings.dotRaidus);
    }
    //--------------------------------------------------------------------------------------------

    //Draws obstacles
    for (let obstacle of Obstacles.obstacles) {
        fill(Settings.obstacleColour);
        rect(obstacle.PVector.x, obstacle.PVector.y, obstacle.width, obstacle.height);
    }
    //--------------------------------------------------------------------------------------------

    //Draws the current generation number
    textSize(16);
    textStyle(BOLD);
    fill('black');
    text("Generation: " + generationNumber, 0, 16);
    //--------------------------------------------------------------------------------------------

    //Initiates next step
    NextStep();
}
//--------------------------------------------------------------------------------------------

//Dots make the next step, if at end of life, initiate new generation
function NextStep() {
    if (CurrentPopulation.currentStep < Settings.lifeSpan) {
        CurrentPopulation.NextStep();
    }
    else {
        if (generationNumber > Settings.noGenerations) {
            //console.log(JSON.stringify(SavedGenerations));
            location.reload();
        }
        SaveCurrentPopulation();
        NewGeneration();
        generationNumber++;
    }
}
//--------------------------------------------------------------------------------------------

//Adds a new generation
function NewGeneration() {
    console.log('Generating new generation');

    let MatingPool = Selection(CurrentPopulation);
    console.log('\tCompleted Selection');

    let NewDots = NPointDiscreteCrossover(MatingPool);
    console.log('\tCompleted Crossover');

    let MutatedNewDots = Mutation(NewDots)
    console.log('\tCompleted Mutation');

    let NewPopulation = new Population();
    NewPopulation.Dots = MutatedNewDots;

    //Adding Elitism
    {
        let bestFitness = 0;
        let bestDot;
        for (let dot of CurrentPopulation.Dots) {
            if (dot.fitness > bestFitness) {
                bestFitness = dot.fitness;
                bestDot = dot;
            }
        }
        bestDot.dotColour = 'yellow';
        NewPopulation.Dots[Settings.populationSize - 1] = bestDot;
    }

    //Resetting dot values
    NewPopulation.currentStep = 0;
    for (let dot of NewPopulation.Dots) {
        dot.PVector = new createVector(Settings.startX, Settings.startY);
        dot.VVector = new createVector(0, 0);
        dot.status = 'Alive';
    }
    console.log('\tFinnished resetting dot status')
    CurrentPopulation = NewPopulation;
}

function SaveCurrentPopulation() {
    SavedGenerations.push(CurrentPopulation.SavePopulation());
}