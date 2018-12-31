/*
SmartDots Algorithm - By Peter Cresswell

Population
Population Object, The container wich contains all of the individual dots
*/

function Population(populationSize) {
    this.Dots = [];
    this.currentStep = 0;
    console.log("In Population");

    //Generates the array of dots
    for (let i = 0; i < populationSize; i++) {
        this.Dots.push(new Dot(Settings.startX, Settings.startY));
    }


    this.NextStep = function() {
        for (let dot of this.Dots) {
            dot.ApplyForce(dot.Brain.dna[this.currentStep]);
        }

        this.currentStep++;
    }
}