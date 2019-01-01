/*
SmartDots Algorithm - By Peter Cresswell

sketch
Central script controlling the sketch
*/

//Setup the canvas
function setup() {
    //Initialtes objects
    Generations = [];
    NewGeneration();

    //Setup canvas and other variables
    frameRate(Settings.fps);
    createCanvas(Settings.canWidth, Settings.canHeight);
}

//Draws onto the canvas and initiates the next step of the dots movement
function draw() {
    noStroke();
    background(Settings.canColour);

    //Draws all dots
    for (let i of Generations[Generations.length - 1].Dots) {
        ellipse(i.PVector.x, i.PVector.y, Settings.dotRaidus, Settings.dotRaidus).fill(Settings.dotColour);
    }

    //Draws the current generation number
    textSize(16);
    textStyle(BOLD);
    text("Generation: " + (Generations.length - 1), 0, 16);

    NextStep();
}

function NextStep() {
    if (Generations[Generations.length - 1].currentStep < Settings.lifeSpan) {
        Generations[Generations.length - 1].NextStep();
    }
    else {
        NewGeneration();
    }
}

//Adds a new generation
function NewGeneration() {
    let NewPopulation = new Population(Settings.populationSize)
    Generations.push(NewPopulation);
}