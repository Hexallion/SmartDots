/*
SmartDots Algorithm - By Peter Cresswell

Selection
Selection functions, collection of different selection styles
*/

function ProportionalSelection(Population) {
    //let MatingPool = Population;
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
    return MatingPool;
}
