/*
Project Caerus - By Peter Cresswell

Crossover
Crossover functions, collection of different crossover styles -> added n point discrete crossover, therefore all discrete crossover styles covered in one function.
*/

/*
function OnePointCrossover(MatingPool) {
    let NewDots = [];
    for (let firstDotIndex = 0; firstDotIndex < MatingPool.length; firstDotIndex += 2) {
        let firstDot = MatingPool[firstDotIndex];
        let secondDot = MatingPool[firstDotIndex + 1]
        let midPoint = Math.floor(Settings.lifeSpan / 2)

        for (let i = midPoint; i < Settings.lifeSpan; i++) {
            let tempdnaVector = firstDot.Brain.dna[i];
            firstDot.Brain.dna[i] = secondDot.Brain.dna[i];
            secondDot.Brain.dna[i] = tempdnaVector;
        }
        NewDots.push(firstDot);
        NewDots.push(secondDot);
    }
    return NewDots;
}
*/

//Crosses over parents genes (n times) so that children have genes from both parents
function NPointDiscreteCrossover(MatingPool) {
    let NewDots = [];
    let interval = Math.floor(Settings.lifeSpan / Settings.noCrossings + 1);

    //Interates through dots selecting two parents each time
    for (let firstDotIndex = 0; firstDotIndex < MatingPool.length; firstDotIndex += 2) {
        let firstDot = MatingPool[firstDotIndex];
        let secondDot = MatingPool[firstDotIndex + 1];
        let child1 = new Dot(0, 0);
        let child2 = new Dot(0, 0);

        //iterates through all of the genes, swapping which parent it is taken from within each interval
        for (let parent = 1,
                point = interval,
                gene = 0; gene < Settings.lifeSpan; gene++) {
            if (parent === 1) {
                child1.Brain.dna[gene] = firstDot.Brain.dna[gene].copy();
                child2.Brain.dna[gene] = secondDot.Brain.dna[gene].copy();
            }
            if (parent === 2) {
                child1.Brain.dna[gene] = secondDot.Brain.dna[gene].copy();
                child2.Brain.dna[gene] = firstDot.Brain.dna[gene].copy();
            }

            //Swapps parent if it has reached swapping point.
            if (gene === point) {
                point += interval;
                if (parent === 1) {
                    parent = 2
                }
                else {
                    parent = 1
                }
            }
        }
        NewDots.push(child1, child2);
    }

    //if population size is odd then mating pool was increase by 1 to be even (for having two parents each) so need to remove last dot.
    if((Settings.populationSize % 2) !== 0) {
        NewDots.pop();
    }
    return NewDots;
}
//--------------------------------------------------------------------------------------------