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
    ellipse(Goal.goalVector.x, Goal.goalVector.y, Goal.goalRadius, Goal.goalRadius);
    //--------------------------------------------------------------------------------------------

    //Draws all dots
    for (let i of Generations[Generations.length - 1].Dots) {
        fill(Settings.dotColour);
        ellipse(i.PVector.x, i.PVector.y, Settings.dotRaidus, Settings.dotRaidus);
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
        NewGeneration();
    }
}
//--------------------------------------------------------------------------------------------

//Adds a new generation
function NewGeneration() {
    console.log('Generating new generation');

    let MatingPool = ProportionalSelection(Generations[Generations.length - 1].Dots);
    console.log('\tCompleted Selection');

    let NewDots = OnePointCrossover(MatingPool);
    console.log('\tCompleted Crossover');

    let MutatedNewDots = Mutation(NewDots)
    console.log('\tCompleted Mutation');

    let NewGeneration = new Population();
    NewGeneration.Dots = MutatedNewDots;
    //Resetting dot positions and current step
    NewGeneration.currentStep = 0;
    for (let dot of NewGeneration.Dots) {
        dot.PVector = new createVector(Settings.startX, Settings.startY);
        dot.VVector = new createVector(0, 0);
    }
    console.log('\tFinnished resetting dot status')
    Generations.push(NewGeneration);
}