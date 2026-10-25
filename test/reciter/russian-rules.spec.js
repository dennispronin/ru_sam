import { assert } from 'chai'
import {CreateReciter} from "../../src/reciter/reciter.es6";
import * as russianTables from "../../src/reciter/tables-ru.es6";
import {Parser1} from "../../src/parser/parse1.es6";
import SamJs from "../../src/index.es6";
import {PlayBuffer, RenderBuffer} from "../../src/util/player.es6";

// A bare 'A' or 'U' is not a phoneme name and throws at playback time.
describe('tables-ru.es6 rule targets', () => {
  ['rules', 'rules2'].forEach((which) => {
    describe(`#${which}`, () => {
      russianTables[which].split('|').forEach((rule) => {
        const target = rule.split('=').pop().trim();
        if (target === '') {
          return;
        }
        it(`should produce a parseable target for "${rule}"`, () => {
          assert.doesNotThrow(() => Parser1(target, () => {}, () => {}));
        });
      });
    });
  });
});

describe('russian end to end', () => {
  const words = [
    'привет', 'прив+ет', 'три', 'друг', 'город', 'рыба', 'ум', 'вода',
    'работа', 'юг', 'съешь', 'объявление', 'подъезд', 'ы', 'ь', 'ъ',
    'СЭМ', 'что', 'жить', 'щука', 'солнце', 'здравствуйте',
    '0123456789', '$', '+', '50%', '#1', 'тест, раз. да!', 'a1б2в3',
    'abc XYZ', '', ' ', '...', '!', '?', '-', '"', '&', '*', '/', ':', ';',
    '=', '@', '^', '́', 'приве́т',
  ];

  const convert = CreateReciter(russianTables);

  words.forEach((word) => {
    it(`should convert and render "${word}"`, () => {
      const phonemes = convert(word);
      // NB strict: ' ' == false is true in javascript.
      assert.notStrictEqual(phonemes, false, 'reciter failed');
      assert.doesNotThrow(() => Parser1(phonemes, () => {}, () => {}));
    });
  });

  describe('#SamJs voices', () => {
    const spoken = {
      russian: 'Прив+ет, СЭМ.',
      english: 'Hello, my name is SAM.',
    };

    Object.keys(spoken).forEach((voice) => {
      it(`should render audio for the ${voice} voice`, () => {
        const buffer = new SamJs({voice: voice}).buf8(spoken[voice]);
        assert.notStrictEqual(buffer, false);
        assert.isAbove(buffer.length, 0);
      });
    });

    it('should not read cyrillic with the english voice', () => {
      assert.strictEqual(new SamJs({voice: 'english'}).buf8('Привет'), false);
    });
  });
});

// false used to reach the player, where createBuffer() threw and left the
// promise without an abort, killing the next speech.abort().
describe('player with nothing to play', () => {
  it('should reject but still expose a callable abort', () => {
    const promise = PlayBuffer(false);
    assert.instanceOf(promise, Promise);
    assert.isFunction(promise.abort);
    assert.doesNotThrow(() => promise.abort());
    return promise.then(
      () => assert.fail('should not resolve'),
      () => true
    );
  });

  it('should not try to build a wave file', () => {
    assert.doesNotThrow(() => RenderBuffer(false));
    assert.strictEqual(RenderBuffer(false), false);
    assert.strictEqual(RenderBuffer(new Uint8Array(0)), false);
  });

  it('should report a failed download instead of throwing', () => {
    const sam = new SamJs({voice: 'english'});
    assert.strictEqual(sam.buf8('Привет'), false);
    assert.doesNotThrow(() => sam.download('Привет'));
    assert.strictEqual(sam.download('Привет'), false);
  });
});
