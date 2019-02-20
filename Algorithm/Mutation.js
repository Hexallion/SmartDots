/*
SmartDots Algorithm - By Peter Cresswell

Mutation
Mutation functions, collection of different mutation styles
*/

function Mutation(NewDots) {
    for (let dot of NewDots) {
        //For every dna vector
        for (let geneIndex in dot.Brain.dna) {
            //if random value is lower than mutation rate, mutate the dna
            let rand = Math.random();
            if (rand < Settings.mutationRate) {
                dot.Brain.dna[geneIndex] = GeneModification(dot.Brain.dna[geneIndex], 1, 0.5);
            }
        }
    }
    return NewDots;
}

function GeneModification(gene, currentMultiplyer, mutationMultiplyer) {
    let mutation = p5.Vector.random2D();
    mutation.x = mutation.x * mutationMultiplyer;
    mutation.y = mutation.y * mutationMultiplyer;

    let currentGene = gene.copy();
    currentGene.x = currentGene.x * currentMultiplyer;
    currentGene.y = currentGene.y * currentMultiplyer;

    mutation.add(currentGene);
    return mutation;
}