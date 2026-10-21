import { assert } from 'chai'
import {CreateReciter} from "../../src/reciter/reciter.es6";
import * as russianTables from "../../src/reciter/tables-ru.es6";
import loadFixture from '../fixture-reader.js';

const TextToPhonemes = CreateReciter(russianTables);

export default function (files) {
  describe('tables-ru.es6', () => {
    files.forEach((file) => {
      describe(`#Reciter.TextToPhonemes(${file})`, () => {
        loadFixture('reciter/fixtures/' + file).forEach((word) => {
          it(`should convert: "${word.input}" to "${word.output}".` , () => {
            const result = TextToPhonemes(word.input);
            assert.notEqual(result, false);
            assert.equal(result.trim(), word.output.trim());
          });
        });
      });
    });
  });
}
