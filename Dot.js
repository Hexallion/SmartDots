/*
SmartDots Algorithm - By Peter Cresswell

Dot
Dot Object, The object that learns
*/

function Dot(startX, startY) {
    //Sets up the Dot
    this.PVector = createVector(startX, startY);
    this.VVector = createVector(0, 0);
    this.AVector = createVector(0, 0);
    this.fitness = 0;
    this.dotColour = Settings.dotColour;
    this.status = 'Alive';
    this.Brain = new Brain(Settings.lifeSpan);
    //--------------------------------------------------------------------------------------------

    //Applys the force to the dot.
    this.ApplyForce = function(force) {
        this.AVector = force;
        this.VVector.add(this.AVector);
        this.VVector.limit(5);
        this.PVector.add(this.VVector);
    }
    //--------------------------------------------------------------------------------------------

    //Calculates the fitness of the dot.
    this.Fitness = function() {
        this.temp = this.PVector.dist(Goal.goalVector);
        this.fitness = (1 / this.temp) * 10000;
    }
    //--------------------------------------------------------------------------------------------


    //Saves data for dot -> only required data
    this.SaveDot = function() {
        this.Fitness();
        let dot = {
            dna: this.Brain.dna,
            status: this.status,
            fitness: this.fitness
        }
        return dot;
    }
    //--------------------------------------------------------------------------------------------
}