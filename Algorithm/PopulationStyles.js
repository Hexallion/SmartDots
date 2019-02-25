/*
SmartDots Algorithm - By Peter Cresswell

PopulationStyles
Used to ajust the poulation
*/

function PopulationStyles(NewPopulation) {
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