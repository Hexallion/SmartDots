/*
SmartDots Algorithm - By Peter Cresswell

Settings
Static object containing the settings.
*/

function Goal() {
    this.goalVector = createVector(Settings.goalX, Settings.goalY);
    this.goalRadius = Settings.goalRadius;
    this.goalColour = Settings.goalColour;
}