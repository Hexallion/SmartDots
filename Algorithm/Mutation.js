/*
Project Caerus - By Peter Cresswell

Mutation
Mutation functions, collection of different mutation styles
*/

//Selects Mutation method to be used
function Mutation(NewDots) {
    for (let dotIndex in NewDots) {
        //Dot specific - only certain dots get mutated, otherwise all do
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
//--------------------------------------------------------------------------------------------

//applies gene mutation
function GeneMutation(dot) {
    for (let geneIndex in dot.Brain.dna) {
        //geneSpecific only specific genes get modified, otherwise all do
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
//--------------------------------------------------------------------------------------------

//Modifies dots gene
function GeneModification(gene) {
    let currentMultiplyer = Settings.currentMultiplier;
    let mutationMultiplyer = Settings.mutationMultiplier;

    //Generate mutation
	let mutation = p5.Vector.random2D();
    mutation.x = mutation.x * mutationMultiplyer;
    mutation.y = mutation.y * mutationMultiplyer;
	
	//truncate mutation
	mutation.x = parseFloat(mutation.x.toFixed(4));
	mutation.y = parseFloat(mutation.y.toFixed(4));

    let currentGene = gene.copy();
    currentGene.x = currentGene.x * currentMultiplyer;
    currentGene.y = currentGene.y * currentMultiplyer;

	//add currentGene to mutation gene
    mutation.add(currentGene);
    return mutation;
}
//--------------------------------------------------------------------------------------------
