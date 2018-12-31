/*
SmartDots Algorithm - By Peter Cresswell

sketch
Central script controlling the sketch
*/

function setup() {

    //console.log("In Setup")
    //Initialtes objects
    Population = new Population(Settings.populationSize);

    //Setup canvas and other variables
    frameRate(Settings.fps);
    createCanvas(Settings.canWidth, Settings.canHeight);
}

function draw() {
    noStroke();
    background(255, 255, 0);

    Population.NextStep();
    //Draws all dots
    for (let i of Population.Dots) {
        ellipse(i.PVector.x, i.PVector.y, Settings.dotRaidus, Settings.dotRaidus).fill(Settings.dotColour);
    }
}