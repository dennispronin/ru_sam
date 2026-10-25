import {CreateReciter} from './reciter.es6';
import * as englishTables from './tables.es6';

/**
 * The reciter of the original SAM. Separate module so a bundle using one
 * language does not pull in the other one's rules.
 *
 * @param {string} input The input string to convert.
 *
 * @return {boolean|string}
 */
export const TextToPhonemes = CreateReciter(englishTables);

export default TextToPhonemes;
