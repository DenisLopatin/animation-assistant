interface IAnimationAssistant {
    addClasses(classes: string[]): IAnimationAssistant
    hiddenLaunch(): IAnimationAssistant;
    adaptation(): IAnimationAssistant;
    setLibrary(library: string): IAnimator;
}
