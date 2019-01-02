/*
SmartDots Algorithm - By Peter Cresswell

Mutation
Mutation functions, collection of different mutation styles
*/

function Mutation(NewDots) {
    for (let dot of NewDots) {
        //For every dna vector
        for (let dnaVector of dot.Brain.dna) {
            //if random value is lower than mutation rate, mutate the dna
            let rand = Math.random();
            if (rand < Settings.mutationRate) {
                //adds half a random vector (half to reduce mutation impact.)
                let randVector = p5.Vector.random2D();
                let halfRandVector = createVector(randVector.x / 2, randVector.x / 2);
                dnaVector.add(halfRandVector);
            }
        }
    }
    return NewDots;
}