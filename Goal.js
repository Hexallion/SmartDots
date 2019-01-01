/*
SmartDots Algorithm - By Peter Cresswell

Goal
Goal object, contains all of the details for the goal.
*/

function Goal() {
    //Goal setup
    this.goalVector = createVector(Settings.goalX, Settings.goalY);
    this.goalRadius = Settings.goalRadius;
    this.goalColour = Settings.goalColour;
}