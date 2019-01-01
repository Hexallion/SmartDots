/*
SmartDots Algorithm - By Peter Cresswell

DNA
DNA object, contains the directions of the dots
*/

function Brain(lifeSpan) {
    //Brain setup
    this.dna = [];
    //--------------------------------------------------------------------------------------------

    //Generates the random initial DNA
    for (let i = 0; i < lifeSpan; i++) {
        this.dna.push(p5.Vector.random2D());
    }
    //--------------------------------------------------------------------------------------------
}