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
            switch (dot.status) {
                case 'Alive':
                    this.intersectsObstacles(dot);
                    this.intersectsGoal(dot);
                    dot.ApplyForce(dot.Brain.dna[this.currentStep]);
                    break;

                case 'Dead':
                    break;

                case 'Goal':
                    break;
            }
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

    this.intersectsGoal = function(Dot) {

    }

    this.intersectsObstacles = function(Dot) {
        //For every obstacle
        for (let obstacle of Obstacles.obstacles) {
            //check if within x bounds
            if (Dot.PVector.x > obstacle.PVector.x && Dot.PVector.x < obstacle.PVector.x + obstacle.width) {
                //check if within y bounds
                if (Dot.PVector.y > obstacle.PVector.y && Dot.PVector.y < obstacle.PVector.y + obstacle.height) {
                    Dot.status = 'Dead';
                    Dot.dotColour = 'red';
                }
            }
        }
    }
}