/*
SmartDots Algorithm - By Peter Cresswell

sketch
Central script controlling the sketch
*/

function setup() {

    //console.log("In Setup")
    //Initialtes objects
    population = new Population(Settings.populationSize);

    //Setup canvas and other variables
    frameRate(Settings.fps)
    createCanvas(Settings.canWidth, Settings.canHeight);
}

function draw() {
    noStroke();
    background(255, 255, 0)

    //Draws all dots
    for (let i of population.dots) {
        ellipse(i.PVector.x, i.PVector.y, Settings.dotRaidus, Settings.dotRaidus).fill(Settings.dotColour)
    }
}
