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
    Goal = new Goal();

    //Setup canvas and other variables
    frameRate(Settings.fps);
    createCanvas(Settings.canWidth, Settings.canHeight);
}

//Draws onto the canvas and initiates the next step of the dots movement
function draw() {
    noStroke();
    background(Settings.canColour);

    //Draws goal
    fill(Goal.goalColour);
    ellipse(Goal.goalVector.x, Goal.goalVector.y, Goal.goalRadius, Goal.goalRadius);

    //Draws all dots
    for (let i of Generations[Generations.length - 1].Dots) {
        fill(Settings.dotColour);
        ellipse(i.PVector.x, i.PVector.y, Settings.dotRaidus, Settings.dotRaidus);
    }

    //Draws the current generation number
    textSize(16);
    textStyle(BOLD);
    fill('black');
    text("Generation: " + (Generations.length - 1), 0, 16);

    //Initiates next step
    NextStep();
}

function NextStep() {
    if (Generations[Generations.length - 1].currentStep < Settings.lifeSpan) {
        Generations[Generations.length - 1].NextStep();
    }
    else {
        Generations[Generations.length - 1].CalculateFitness();
        for (let i of Generations[Generations.length - 1].Dots) {
            console.log(i.fitness);
        }
        NewGeneration();
    }
}

//Adds a new generation
function NewGeneration() {
    let NewPopulation = new Population(Settings.populationSize)
    Generations.push(NewPopulation);
}