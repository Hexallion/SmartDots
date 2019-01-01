/*
SmartDots Algorithm - By Peter Cresswell

Population
Population Object, The container which contains all of the individual dots
*/

function Population(populationSize) {

    //Sets up the population with a population of dots
    this.Dots = [];
    this.currentStep = 0;
    //Generates the array of dots
    for (let i = 0; i < populationSize; i++) {
        this.Dots.push(new Dot(Settings.startX, Settings.startY));
    }
    //--------------------------------------------------------------------------------------------

    //Applys the next dna action
    this.NextStep = function() {
        for (let dot of this.Dots) {
            dot.ApplyForce(dot.Brain.dna[this.currentStep]);
        }
        this.currentStep++;
        //console.log(this.currentStep);
    }
    //--------------------------------------------------------------------------------------------

    //Calculates the fitness of all dots at the end of their life
    this.CalculateFitness = function() {
        for (let dot of this.Dots) {
            dot.Fitness();
        }
    }
    //--------------------------------------------------------------------------------------------

    //Calculates the sum of all the fitnesses of the dots
    this.FitnessSum = function() {
        this.CalculateFitness();
        let total = 0;
        for (let dot of this.Dots) {
            total += dot.fitness;
        }
    }
}