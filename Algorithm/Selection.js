/*
SmartDots Algorithm - By Peter Cresswell

Selection
Selection functions, collection of different selection styles
*/

function ProportionalSelection(Population) {
    console.time("ProportionalSelection");
    //Calculate fitnesses of population
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
    //Calculate fitnesses of population
    Population.CalculateFitness();

    //Sorts array by fitness value acending order
    Population.Dots = Population.Dots.sort(function(a, b) {
        return a.fitness - b.fitness
    });

    //Adds dot's index to array equal to dot's index
    let indexArray = [];
    for (let dot in Population.Dots) {
        for (let g = 0; g <= dot; g++) {
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

function TournamentSelection(Population) {
    console.time("TournamentSelection");
    //Calculate fitnesses of population
    Population.CalculateFitness();

    //Number of tournaments equal to the nuber of parents needed
    let MatingPool = [];
    for (let i = 0; i < Settings.populationSize; i++) {
        let participents = [];
        for (let i = 0; i < Settings.tournamentParticipents; i++) {
            participents.push(Population.Dots[Math.floor(Math.random() * Population.Dots.length)]);
        }

        //Sorts array by fitness value decending order
        participents = participents.sort(function(a, b) {
            return b.fitness - a.fitness
        })

        //Deep copying dot
        let tempDot = new Dot(0, 0);
        for (let vectorIndex in participents[0].Brain.dna) {
            tempDot.Brain.dna[vectorIndex] = participents[0].Brain.dna[vectorIndex].copy();
        }
        MatingPool.push(tempDot);
    }

    console.timeEnd("TournamentSelection");
    return MatingPool;
}