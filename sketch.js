/*
SmartDots Algorithm - By Peter Cresswell

sketch
Central script controlling the sketch
*/

//Setup the canvas
function setup() {
    //Initialtes objects
    Generations = [];
    Generations.push(new Population(Settings.populationSize));
    Goal = new Goal();
    Obstacles = new Obstacles();

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
    for (let i of Generations[Generations.length - 1].Dots) {
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
    text("Generation: " + (Generations.length - 1), 0, 16);
    //--------------------------------------------------------------------------------------------

    //Initiates next step
    NextStep();
}
//--------------------------------------------------------------------------------------------

//Dots make the next step, if at end of life, initiate new generation
function NextStep() {
    if (Generations[Generations.length - 1].currentStep < Settings.lifeSpan) {
        Generations[Generations.length - 1].NextStep();
    }
    else {
        if (Generations.length > 30) {
            location.reload();
        }
        NewGeneration();
    }
}
//--------------------------------------------------------------------------------------------

//Adds a new generation
function NewGeneration() {
    console.log('Generating new generation');

    let MatingPool = ProportionalSelection(Generations[Generations.length - 1]);
    console.log('\tCompleted Selection');

    let NewDots = OnePointCrossover(MatingPool);
    console.log('\tCompleted Crossover');

    let MutatedNewDots = Mutation(NewDots)
    console.log('\tCompleted Mutation');

    let NewGeneration = new Population();
    NewGeneration.Dots = MutatedNewDots;

    //Adding Elitism
    {
        let bestFitness = 0;
        let bestDot;
        for (let dot of Generations[Generations.length - 1].Dots) {
            if (dot.fitness > bestFitness) {
                bestFitness = dot.fitness;
                bestDot = dot;
            }
        }
        bestDot.dotColour = 'yellow';
        NewGeneration.Dots[NewGeneration.Dots.length - 1] = bestDot;
    }

    //Resetting dot values
    NewGeneration.currentStep = 0;
    for (let dot of NewGeneration.Dots) {
        dot.PVector = new createVector(Settings.startX, Settings.startY);
        dot.VVector = new createVector(0, 0);
        dot.status = 'Alive';
    }
    console.log('\tFinnished resetting dot status')
    Generations.push(NewGeneration);
}