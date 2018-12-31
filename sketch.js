/*
SmartDots Algorithm - By Peter Cresswell

sketch
Central script controlling the sketch
*/

function setup() {
	//Initialtes objects
	dot = new Dot(Settings.StartX, Settings.StartY);

	//Setup canvas and other variables
	frameRate(Settings.fps)
	createCanvas(Settings.CanWidth, Settings.CanHeight);
}

function draw() {
	noStroke();
	background(255, 255, 0)
	ellipse(dot.PVector.x, dot.PVector.y, Settings.DotRaidus, Settings.DotRaidus).fill(Settings.DotColour)
}
