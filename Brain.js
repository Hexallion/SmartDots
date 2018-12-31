/*
SmartDots Algorithm - By Peter Cresswell

DNA
DNA object, contains the directions of the dots
*/

function Brain(lifeSpan) {
    this.dna = [];

    //Generates the random initial DNA
    for (let i = 0; i < lifeSpan; i++) {
        this.dna.push(p5.Vector.random2D());
        //console.log(this.Dna[i]);
    }
}