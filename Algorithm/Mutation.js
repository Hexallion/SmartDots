/*
SmartDots Algorithm - By Peter Cresswell

Mutation
Mutation functions, collection of different mutation styles
*/

function Mutation(NewDots) {
    for (let dotIndex in NewDots) {
        if (Settings.DotSpecificMutation) {
            //if random value is lower than mutation rate, mutate the dot
            let rand = Math.random();
            if (rand < Settings.mutationRate) {
                GeneMutation(NewDots[dotIndex]);
            }
        }
        else {
            GeneMutation(NewDots[dotIndex])
        }
    }
    return NewDots;
}

function GeneMutation(dot) {
    for (let geneIndex in dot.Brain.dna) {
        if (Settings.GeneSpecificMutation) {
            //if random value is lower than mutation rate, mutate the dot
            let rand = Math.random();
            if (rand < Settings.mutationRate) {
                dot.Brain.dna[geneIndex] = GeneModification(dot.Brain.dna[geneIndex]);
            }
        }
        else {
            dot.Brain.dna[geneIndex] = GeneModification(dot.Brain.dna[geneIndex]);
        }
    }
}

function GeneModification(gene) {
    let currentMultiplyer = Settings.currentMultiplyer;
    let mutationMultiplyer = Settings.mutationMultiplyer;

    let mutation = p5.Vector.random2D();
    mutation.x = mutation.x * mutationMultiplyer;
    mutation.y = mutation.y * mutationMultiplyer;

    let currentGene = gene.copy();
    currentGene.x = currentGene.x * currentMultiplyer;
    currentGene.y = currentGene.y * currentMultiplyer;

    mutation.add(currentGene);
    return mutation;
}