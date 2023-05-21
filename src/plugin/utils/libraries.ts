import { libraries } from '../const';

export function getLibraryPrefix(library: keyof typeof libraries): string {
    return libraries[library];
}
