import {CreateReciter} from './reciter.es6';
import * as englishTables from './tables.es6';

/**
 * Convert english text to a phoneme string.
 *
 * This is the reciter of the original SAM. It lives in its own module so that
 * a bundle using only one language does not include the other one's rules.
 *
 * @param {string} input The input string to convert.
 *
 * @return {boolean|string}
 */
export const TextToPhonemes = CreateReciter(englishTables);

export default TextToPhonemes;
