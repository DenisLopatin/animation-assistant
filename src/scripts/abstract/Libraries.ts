import {libraries} from '../types';

export default abstract class Libraries {
    protected libraries: libraries = {
        'animate.css': 'animate__animated',
        'css-animation': 'cssanimation',
        'css-shake': 'shake',
        'magic.css': 'magictime',
        'repaintless-css': 'element-animated',
        'tuesday-css': 'animated',
    }

    protected getLibraryPrefix(library: string): string {
        return this.libraries[library] || '';
    }
}
