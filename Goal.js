/*
Project Caerus - By Peter Cresswell

Goal
Goal object, contains all of the details for the goal.
*/

function Goal() {
    //Goal setup
    this.goalVector = createVector(Settings.goalX, Settings.goalY);
    this.goalSize = Settings.goalSize;
    this.goalColour = Settings.goalColour;
}