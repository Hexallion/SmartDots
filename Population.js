/*
SmartDots Algorithm - By Peter Cresswell

Population
Population Object, The container which contains all of the individual dots
*/

function Population(populationSize) {

    //Sets up the population with a population of dots
    this.Dots = [];
    this.currentStep = 0;
	this.noDead = 0;
	this.noReachedGoal = 0;
    //Generates the array of dots
    for (let i = 0; i < populationSize; i++) {
        this.Dots.push(new Dot(Settings.startX, Settings.startY));
    }
    //--------------------------------------------------------------------------------------------

    //Applys the next dna action
    this.NextStep = function() {
		this.noDead = 0;
		this.noReachedGoal = 0;
        for (let dot of this.Dots) {
            switch (dot.status) {
                case 'Alive':
                    this.intersectsObstacles(dot);
                    this.intersectsGoal(dot);
                    dot.ApplyForce(dot.Brain.dna[this.currentStep]);
                    break;

                case 'Best':
                    this.intersectsObstacles(dot);
                    this.intersectsGoal(dot);
                    dot.ApplyForce(dot.Brain.dna[this.currentStep]);
                    break;

                case 'Dead':
					this.noDead++;
                    break;

                case 'Goal':
					this.noReachedGoal++;
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
        if (Dot.PVector.x > Goal.goalVector.x && Dot.PVector.x < Goal.goalVector.x + Goal.goalSize) {
            //check if within y bounds
            if (Dot.PVector.y > Goal.goalVector.y && Dot.PVector.y < Goal.goalVector.y + Goal.goalSize) {
                Dot.status = 'Goal';
                Dot.dotColour = 'green';
            }
        }
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

    this.SavePopulation = function() {
		let bestDot = this.BestDot();
        let population = {
            bestDotDna: bestDot.Brain.dna,
			bestDotFitness: bestDot.fitness,
			noDead: this.noDead,
			noReachedGoal: this.noReachedGoal
        };
        return population;
    }

    this.BestDot = function () {
        let bestDotIndex = 0;
        for(let i in this.Dots){
			this.Dots[i].Fitness();
            if(this.Dots[bestDotIndex].fitness < this.Dots[i].fitness){bestDotIndex = i;}
        }
        return this.Dots[bestDotIndex];
    }
}