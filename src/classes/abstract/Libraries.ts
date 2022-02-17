import {libraries} from '../../types';

export default abstract class Libraries {
    protected constructor(
        protected readonly elements: NodeListOf<HTMLElement>,
        protected stop: boolean = false,
        protected library = '',
    ) {
        this.elements = elements;
    }

    protected static version = '2.0';

    protected static supports = [
        'animate.css', 'animation.io', 'vivify', 'magic.css',
        'repaintless-css', 'tuesday-css', 'tachyons-animate',
        'rebound', 'all-animations', 'hover.css', 'CSShake',
        'animista', 'woah.css',
    ];

    protected libraries: libraries = {
        'animate.css': 'animate__animated',
        'animation.io': 'cssanimation',
        'vivify': 'animationObject',
        'magic.css': 'magictime',
        'repaintless-css': 'element-animated',
        'tuesday-css': 'animated',
        'tachyons-animate': 'animated',
        'woah.css': 'woah',
    };

    protected getLibraryPrefix(library: string): string {
        return this.libraries[library];
    }
}
