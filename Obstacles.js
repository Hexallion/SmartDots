/*
Project Caerus - By Peter Cresswell

Obstacles
Obstacles Object, collection of all Obstacles
*/

function Obstacles() {
    this.obstacles = [];
    this.obstacles.push(new Obstacle(Settings.obstacleX, Settings.obstacleY, Settings.obstacleWidth, Settings.obstacleHeight))
}

function Obstacle(x, y, width, height) {
    this.PVector = createVector(x, y);
    this.width = width;
    this.height = height;
}