/*
SmartDots Algorithm - By Peter Cresswell

sketch
Central script controlling the sketch
*/

function setup() {
	settings = new Settings();
	dot = new Dot(settings.WinWidth/2, settings.WinHeight - 100);
	createCanvas(settings.WinWidth, settings.WinHeight);
}

function draw() {
	noStroke();
	background(255, 255, 0)
	ellipse(dot.PVector.x, dot.PVector.y, 50, 50).fill('black')
}
