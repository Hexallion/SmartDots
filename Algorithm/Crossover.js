/*
SmartDots Algorithm - By Peter Cresswell

Crossover
Crossover functions, collection of different corssover styles
*/

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