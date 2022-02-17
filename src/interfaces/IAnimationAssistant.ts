import IAnimator from './IAnimator';
import IAnimationIO from './IAnimationIO';

export default interface IAnimationAssistant {
    addClasses(classes: string[]): IAnimationAssistant
    hide(): IAnimationAssistant;
    adaptation(): IAnimationAssistant;
    cancelOnStartScreen(): IAnimationAssistant;
    setLibrary(library?: string, instance?: string): IAnimationAssistant;
    getInstance(): IAnimator;
    getAnimationIOInstance(): IAnimationIO
}
