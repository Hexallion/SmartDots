/*
Project Caerus - By Peter Cresswell

sketch
Central script controlling the sketch
*/

//Setup the canvas
function setup() {
    //Initialtes objects
    setupSettings();

    CurrentPopulation = new Population(Settings.populationSize);
    generationNumber = 0;

    Goal = new Goal();
    Obstacles = new Obstacles();

    SavedGenerations = [];
    //Setup canvas and other variables
    frameRate(Settings.fps);
    createCanvas(Settings.canWidth, Settings.canHeight);
}
//--------------------------------------------------------------------------------------------

//Setup Settings -> use Session storage, if not use default
function setupSettings() {
    if(sessionStorage.Settings){
        console.log("Session Settings exists!");
        Settings = JSON.parse(sessionStorage.Settings);
    }
    else{
        console.log("Session Settings does not exist :(");
    }
}
//--------------------------------------------------------------------------------------------

//Draws onto the canvas and initiates the next step of the dots movement
function draw() {
    noStroke();
    background(Settings.canColour);

    //Draws goal
    fill(Goal.goalColour);
    rect(Goal.goalVector.x, Goal.goalVector.y, Goal.goalSize, Goal.goalSize);
    //--------------------------------------------------------------------------------------------

    //Draws all dots
    for (let i of CurrentPopulation.Dots) {
        fill(i.dotColour);
        ellipse(i.PVector.x, i.PVector.y, Settings.dotRadius, Settings.dotRadius);
    }
    //--------------------------------------------------------------------------------------------

    //Draws obstacles
    for (let obstacle of Obstacles.obstacles) {
        fill(Settings.obstacleColour);
        rect(obstacle.PVector.x, obstacle.PVector.y, obstacle.width, obstacle.height);
    }
    //--------------------------------------------------------------------------------------------

    //Draws the current generation number
    textSize(16);
    textStyle(BOLD);
    fill('black');
    text("Generation: " + generationNumber, 5, 20);
	textAlign(RIGHT, BOTTOM);
	text("Number Dead: " + CurrentPopulation.noDead, Settings.canWidth - 20, Settings.canHeight);
	textAlign(LEFT, BOTTOM);
	text("Number Reached Goal: " + CurrentPopulation.noReachedGoal, 5, Settings.canHeight);
    //--------------------------------------------------------------------------------------------

    //Initiates next step
    NextStep();
}
//--------------------------------------------------------------------------------------------

//Dots make the next step, if at end of life, initiate new generation
function NextStep() {
    if (CurrentPopulation.currentStep < Settings.lifeSpan) {
        CurrentPopulation.NextStep();
    }
    else {
        SaveCurrentPopulation();
        if (generationNumber >= Settings.noGenerations) {
			SaveDemonstration();
        }
        else {
            NewGeneration();
            generationNumber++;
        }
    }
}
//--------------------------------------------------------------------------------------------

//Adds a new generation
function NewGeneration() {
    console.log('Generating new generation');

    let MatingPool = Selection(CurrentPopulation);
    console.log('\tCompleted Selection');

    let NewDots = NPointDiscreteCrossover(MatingPool);
    console.log('\tCompleted Crossover');

    let MutatedNewDots = Mutation(NewDots);
    console.log('\tCompleted Mutation');

    let NewPopulation = new Population();
    NewPopulation.Dots = MutatedNewDots;

    //Adding Elitism
    {
        let bestFitness = 0;
        let bestDot;
        for (let dot of CurrentPopulation.Dots) {
            if (dot.fitness > bestFitness) {
                bestFitness = dot.fitness;
                bestDot = dot;
            }
        }
        bestDot.dotColour = Settings.bestDotColour;
        NewPopulation.Dots[Settings.populationSize - 1] = bestDot;
    }

    //Resetting dot values
    NewPopulation.currentStep = 0;
    for (let dot of NewPopulation.Dots) {
        dot.PVector = new createVector(Settings.startX, Settings.startY);
        dot.VVector = new createVector(0, 0);
        //dot.status = 'Alive';
    }
    NewPopulation.Dots[Settings.populationSize - 1].status = 'Best';
    //NewPopulation.Dots[Settings.populationSize - 1].color = Settings.bestDotColour;

    console.log('\tFinnished resetting dot status');

    NewPopulation = PopulationStyles(NewPopulation);
    CurrentPopulation = NewPopulation;
}
//--------------------------------------------------------------------------------------------

//pushed current population onto the SavedGenerations list
function SaveCurrentPopulation() {
    SavedGenerations.push(CurrentPopulation.SavePopulation());
}
//--------------------------------------------------------------------------------------------

//Displays the save/ exit buttons
function SaveDemonstration(){
	saveButton = createButton('Save and Exit', "save");
	let sButtonX = (Settings.canWidth - saveButton.elt.offsetWidth) / 2;
	let sButtonY = (Settings.canHeight / 2 - saveButton.elt.offsetHeight);
	saveButton.position(sButtonX, sButtonY);
	saveButton.mousePressed(SaveDemo);
	
	exitButton = createButton('Exit', "exit");
	let eButtonX = (Settings.canWidth - exitButton.elt.offsetWidth) / 2;
	let eButtonY = (Settings.canHeight) / 2;
	exitButton.position(eButtonX, eButtonY);
	exitButton.mousePressed(ExitDemo);
	noLoop();
}
//--------------------------------------------------------------------------------------------

//saves the demonstration to the server and goes back to the main page.
function SaveDemo(){
    //Disables save button and displays that the demo is saving.
    saveButton.mousePressed(false);
    saveButton.elt.textContent = "Saving... This may take up to a minute...";
    let sButtonX = (Settings.canWidth - saveButton.elt.offsetWidth) / 2;
    let sButtonY = (Settings.canHeight / 2 - saveButton.elt.offsetHeight);
    saveButton.position(sButtonX, sButtonY);

    let host = window.location.host;
    let protocol = window.location.protocol;
    let url = protocol + "//" + host + "/saveResults";
    let demonstration = {
        populations: SavedGenerations,
        settings: Settings,
		//id: 1
    };
    //POST request to server
    httpDo(
        url,
        'POST',
        'json',
        demonstration,
        function (result){
            sessionStorage.clear();
            sessionStorage.setItem("demoId", result);
            location.href = (protocol + "//" + host);
        },
        function (error) {
            //If error then save to sessions storage so user can still see results
            console.log(error);
            sessionStorage.setItem("demo", demonstration);
			location.href = ("../index.html");
        }
    )
}
//--------------------------------------------------------------------------------------------

//Exits back to main page
function ExitDemo(){
	let host = window.location.host;
	let protocol = window.location.protocol;
	location.href = ( protocol + "//" + host);
}
//--------------------------------------------------------------------------------------------