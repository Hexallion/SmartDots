/*
SmartDots Algorithm - By Peter Cresswell

Selection
Selection functions, collection of different selection styles
*/

function ProportionalSelection(Population) {
    console.time("ProportionalSelection");
    //let Calculate fitnesses of population
    Population.CalculateFitness();

    //Adds dot index to array proportional to their fitness
    let indexArray = [];
    for (let dot in Population.Dots) {
        for (let g = 0; g < Math.round(Population.Dots[dot].fitness); g++) {
            indexArray.push(dot);
        }
    }
    //Randomly selects indexes from indexArray equal to the population size.
    let MatingPool = [];
    for (let i = 0; i < Settings.populationSize; i++) {
        //Selecting dot
        let rand = Math.floor(Math.random() * indexArray.length)
        let selectedDot = Population.Dots[indexArray[rand]];

        //Deep copying dot
        let tempDot = new Dot(0, 0);
        for (let vectorIndex in selectedDot.Brain.dna) {
            tempDot.Brain.dna[vectorIndex] = selectedDot.Brain.dna[vectorIndex].copy();
        }
        MatingPool.push(tempDot);
    }
    console.timeEnd("ProportionalSelection");
    return MatingPool;
}

function RankingSelection(Population) {
    console.time("RankingSelection");
    //let Calculate fitnesses of population
    Population.CalculateFitness();

    //Sorts array by fitness value
    Population.Dots = Population.Dots.sort(function(a, b) {
        return b.fitness - a.fitness
    });

    //Adds dot's index to array equal to array length - dot's index
    let indexArray = [];
    for (let dot in Population.Dots) {
        for (let g = 0; g < Population.Dots.length - dot; g++) {
            indexArray.push(dot);
        }
    }

    //Randomly selects indexes from indexArray equal to the population size.
    let MatingPool = [];
    for (let i = 0; i < Settings.populationSize; i++) {
        //Selecting dot
        let rand = Math.floor(Math.random() * indexArray.length)
        let selectedDot = Population.Dots[indexArray[rand]];

        //Deep copying dot
        let tempDot = new Dot(0, 0);
        for (let vectorIndex in selectedDot.Brain.dna) {
            tempDot.Brain.dna[vectorIndex] = selectedDot.Brain.dna[vectorIndex].copy();
        }
        MatingPool.push(tempDot);
    }
    console.timeEnd("RankingSelection");
    return MatingPool;
}