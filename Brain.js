/*
Project Caerus - By Peter Cresswell

DNA
DNA object, contains the directions of the dots
*/

function Brain(lifeSpan) {
    //Brain setup
    this.dna = [];
    //--------------------------------------------------------------------------------------------

    //Generates the random initial DNA
    for (let i = 0; i < lifeSpan; i++) {
		let newVector = p5.Vector.random2D();
		newVector.x = parseFloat(newVector.x.toFixed(4));
		newVector.y = parseFloat(newVector.y.toFixed(4));
        this.dna.push(newVector);
    }
    //--------------------------------------------------------------------------------------------
}