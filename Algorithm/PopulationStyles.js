/*
Project Caerus - By Peter Cresswell

PopulationStyles
Used to adjust the population
*/

//adjusts population size depending on settings
function PopulationStyles(NewPopulation) {
    //Sawtooth means that the population size is reduced over a period and then boosted back up with an injection of new random dots.
    if (Settings.sawtooth) {
        Settings.populationSize -= Settings.reduction;
        if ((generationNumber % Settings.period) == 0 && generationNumber != 0) {
            Settings.populationSize += (Settings.period * Settings.reduction);
            for (let i = 0; i < (Settings.period * Settings.reduction); i++) {
                NewPopulation.Dots.push(new Dot(Settings.startX, Settings.startY));
            }
        }
    }
    return NewPopulation;
}
//--------------------------------------------------------------------------------------------