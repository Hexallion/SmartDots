/*
SmartDots Algorithm - By Peter Cresswell

Population
Population Object, The container wich contains all of the individual dots
*/

function Population(populationSize) {
    this.dots = []
    console.log("In Population")

    //Generates the array of dots
    for (let i = 0; i < populationSize; i++) {
        this.dots.push(new Dot(Settings.startX, Settings.startY));
    }
}
