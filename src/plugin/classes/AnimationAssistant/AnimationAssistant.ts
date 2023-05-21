import Animator from '../Animator/Animator';
import Events from '../Events/Events';
import LocationData from '../LocationData/LocationData';
import Listeners from '../Listeners/Listeners';
import Middleware from '../Middleware/Middleware';
import IAnimator from '../Animator/contract/IAnimator';
import { getLibraryPrefix } from '../../utils';
import { libraries } from '../../const';
import { nodeIterable } from '../../types';

export default class AnimationAssistant {
    constructor(protected readonly elements: nodeIterable) {}

    public setLibrary(library: keyof typeof libraries): IAnimator {
        this.elements.forEach((element) => element.classList.add(getLibraryPrefix(library)));
        return new Animator(
            this.elements,
            new Listeners(new Events(), new LocationData()),
            new Events(),
            new LocationData(),
            new Middleware(),
        );
    }
}
