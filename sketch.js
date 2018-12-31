/*
SmartDots Algorithm - By Peter Cresswell

sketch
Central script controlling the sketch
*/

function setup() {
	//Initialtes objects
	dot = new Dot(Settings.startX, Settings.startY);

	//Setup canvas and other variables
	frameRate(Settings.fps)
	createCanvas(Settings.canWidth, Settings.canHeight);
}

function draw() {
	noStroke();
	background(255, 255, 0)
	ellipse(dot.PVector.x, dot.PVector.y, Settings.dotRaidus, Settings.dotRaidus).fill(Settings.dotColour)
}
