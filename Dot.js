/*
SmartDots Algorithm - By Peter Cresswell

Dot
Dot Object, The object that learns
*/

function Dot(startX, startY) {
    this.PVector = createVector(startX, startY);
    this.VVector = createVector(0, 0);
    this.AVector = createVector(0, 0);
    this.fitness;

    this.Brain = new Brain(Settings.lifeSpan);

    this.ApplyForce = function(force) {
        this.AVector = createVector(0, 0);
        this.AVector.add(force);
        this.VVector.add(this.AVector);
        this.PVector.add(this.VVector);
    }

    this.Fitness = function() {
        this.fitness = this.PVector.dist(Goal.goalVector);
    }
}