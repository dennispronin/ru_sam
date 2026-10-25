/**
 * Russian tables for the reciter.
 *
 * Uses the phoneme inventory of the original SAM as is - russian sounds are
 * approximated with existing allophones, see the README for the mapping.
 *
 * Single char phoneme names are written without the '*' pad of
 * PhonemeNameTable ('P', not 'P*') - the parser matches two char names first
 * and would take the '*' for phoneme 43.
 */

/** Sounds SAM has no real equivalent for. Compare them on tune.html. */
export const TUNE = {
  YERY: 'IH',   // ы        - no counterpart at all; try IX, UX, ER, UH
  KH:   '/X',   // х        - alternative /H
  R:    'R',    // р        - alternative DX, an alveolar flap
  SHCH: 'SHSH', // щ        - alternative SH
  U:    'UW',   // у        - alternative UX, without the [w] offglide
  SOFT: 'Y',    // мягкость - the glide a soft consonant is built from;
                //            'YX' is weaker, '' drops it altogether
};

/**
 * Char flags. Same bits as the english table, different meaning - the rule
 * operator reading each one is in brackets.
 *
 *  0x01        numeric
 *  0x02        use rule set 2
 *  0x04  ['@'] voiced obstruent, voices what precedes it (б г д ж з, not в)
 *  0x08  ['.'] voiceless obstruent, devoices what precedes it
 *  0x10  ['&'] always hard (ж ш ц) - no palatalisation, и -> ы
 *  0x20  ['^'] consonant (ь, ъ too, so clusters can be walked over)
 *  0x40  ['#'] vowel
 *  0x80        alpha or stress mark
 */
export const charFlags = {
  ' ':  0,
  // Stress mark: alpha so rules can match it, rule set 2 so the loop eats it.
  '\'': 0 | 0x80                                    | 0x02,
  '!':  0                                           | 0x02,
  '"':  0                                           | 0x02,
  '#':  0                                           | 0x02,
  '$':  0                                           | 0x02,
  '%':  0                                           | 0x02,
  '&':  0                                           | 0x02,
  '(':  0,
  ')':  0,
  '*':  0                                           | 0x02,
  '+':  0                                           | 0x02,
  ',':  0                                           | 0x02,
  '-':  0                                           | 0x02,
  '.':  0                                           | 0x02,
  '/':  0                                           | 0x02,
  '0':  0                                           | 0x02 | 0x01,
  '1':  0                                           | 0x02 | 0x01,
  '2':  0                                           | 0x02 | 0x01,
  '3':  0                                           | 0x02 | 0x01,
  '4':  0                                           | 0x02 | 0x01,
  '5':  0                                           | 0x02 | 0x01,
  '6':  0                                           | 0x02 | 0x01,
  '7':  0                                           | 0x02 | 0x01,
  '8':  0                                           | 0x02 | 0x01,
  '9':  0                                           | 0x02 | 0x01,
  ':':  0                                           | 0x02,
  ';':  0                                           | 0x02,
  '=':  0                                           | 0x02,
  '?':  0                                           | 0x02,
  '@':  0                                           | 0x02,
  '^':  0                                           | 0x02,
  // Vowels.
  'А':  0 | 0x80 | 0x40,
  'Е':  0 | 0x80 | 0x40,
  'Ё':  0 | 0x80 | 0x40,
  'И':  0 | 0x80 | 0x40,
  'О':  0 | 0x80 | 0x40,
  'У':  0 | 0x80 | 0x40,
  'Ы':  0 | 0x80 | 0x40,
  'Э':  0 | 0x80 | 0x40,
  'Ю':  0 | 0x80 | 0x40,
  'Я':  0 | 0x80 | 0x40,
  // Consonants.
  'Б':  0 | 0x80        | 0x20               | 0x04,
  'В':  0 | 0x80        | 0x20,
  'Г':  0 | 0x80        | 0x20               | 0x04,
  'Д':  0 | 0x80        | 0x20               | 0x04,
  'Ж':  0 | 0x80        | 0x20 | 0x10        | 0x04,
  'З':  0 | 0x80        | 0x20               | 0x04,
  'Й':  0 | 0x80        | 0x20,
  'К':  0 | 0x80        | 0x20        | 0x08,
  'Л':  0 | 0x80        | 0x20,
  'М':  0 | 0x80        | 0x20,
  'Н':  0 | 0x80        | 0x20,
  'П':  0 | 0x80        | 0x20        | 0x08,
  'Р':  0 | 0x80        | 0x20,
  'С':  0 | 0x80        | 0x20        | 0x08,
  'Т':  0 | 0x80        | 0x20        | 0x08,
  'Ф':  0 | 0x80        | 0x20        | 0x08,
  'Х':  0 | 0x80        | 0x20        | 0x08,
  'Ц':  0 | 0x80        | 0x20 | 0x10 | 0x08,
  'Ч':  0 | 0x80        | 0x20        | 0x08,
  'Ш':  0 | 0x80        | 0x20 | 0x10 | 0x08,
  'Щ':  0 | 0x80        | 0x20        | 0x08,
  // Signs - consonants for cluster walking, but neither voiced nor voiceless.
  'Ь':  0 | 0x80        | 0x20,
  'Ъ':  0 | 0x80        | 0x20,
};

/** The '+' operator: vowels that soften the consonant before them, plus ь.
 * Ъ is absent on purpose, it blocks palatalisation. */
export const plusChars = ['Е', 'Ё', 'И', 'Ю', 'Я', 'Ь'];

/** The '@' operator has no exception character in russian. */
export const atChar = '';
export const atCheckChars = [];

/** The '&' operator is a pure flag check here, no digraphs. */
export const ampersandPrefixDigraphs = [];
export const ampersandSuffixDigraphs = [];

const VOWELS = 'АЕЁИОУЫЭЮЯ';

/** Latin input, so mixed script text does not abort the conversion. */
const LATIN = {
  'A': 'А', 'B': 'Б', 'C': 'К', 'D': 'Д', 'E': 'Е', 'F': 'Ф', 'G': 'Г',
  'H': 'Х', 'I': 'И', 'J': 'Ж', 'K': 'К', 'L': 'Л', 'M': 'М', 'N': 'Н',
  'O': 'О', 'P': 'П', 'Q': 'К', 'R': 'Р', 'S': 'С', 'T': 'Т', 'U': 'У',
  'V': 'В', 'W': 'В', 'X': 'КС', 'Y': 'Й', 'Z': 'З',
};

/**
 * Normalise the input. Stress cannot be derived by rule in russian, so every
 * way of writing it (приве́т, прив+ет, ё) becomes one apostrophe behind the
 * stressed vowel, which is where the rules look for it. Unmarked words keep
 * their full vowels.
 *
 * @param {string} input
 *
 * @return {string}
 */
export const normalize = (input) => {
  let text = input.toUpperCase();

  // Combining acute or grave behind a vowel is the stress mark.
  text = text.replace(
    new RegExp('([' + VOWELS + '])[̀́́]', 'g'),
    '$1\''
  );
  // A '+' in front of a vowel is the plain ascii way of marking stress.
  text = text.replace(new RegExp('\\+([' + VOWELS + '])', 'g'), '$1\'');
  // Ё always carries the stress.
  text = text.replace(/Ё(?!')/g, 'Ё\'');
  // A '+' not in front of a vowel is a typo, not the word "плюс".
  text = text.replace(/([А-ЯЁ])\+/g, '$1').replace(/\+([А-ЯЁ])/g, '$1');
  // Latin letters are transliterated.
  text = text.replace(/[A-Z]/g, (c) => LATIN[c]);
  // Doubled consonants are pronounced as one.
  text = text.replace(/([БВГДЖЗКЛМНПРСТФХЦЧШЩ])\1/g, '$1');
  // Unknown chars would abort the conversion.
  text = text.replace(/[^АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0-9 '!"#$%&*+,\-./:;=?@^]/g, ' ');

  return text;
};

const buildRules = (a) =>
  // А
  '(А)\'=AA4|' +
  '(А):#:#\'=AX|' +
  '(А):#\'=AH|' +
  '\':(А)=AX|' +
  '\':#:(А)=AX|' +
  '(А)=AA|' +
  // Б
  '(Б)Ь =P' + a.SOFT + '|' +
  '(Б)@ =P|' +
  '(Б) =P|' +
  '(Б).=P|' +
  '(Б)+=B' + a.SOFT + '|' +
  '(Б)=B|' +
  // В
  // в drops out of -вств- (чувство, здравствуй)
  '(В)СТВ=|' +
  '(В)Ь =F' + a.SOFT + '|' +
  '(В)@ =F|' +
  '(В) =F|' +
  '(В).=F|' +
  '(В)+=V' + a.SOFT + '|' +
  '(В)=V|' +
  // Г
  // Adverbs that keep their Г.
  ' МНО(Г)О =G|' +
  ' СТРО(Г)О =G|' +
  ' ДОРО(Г)О =G|' +
  ' УБО(Г)О =G|' +
  ' ПОЛО(Г)О =G|' +
  // -ого / -его are spoken -ово / -ево.
  'О(Г)О =V|' +
  'Е(Г)О =V|' +
  '(Г)Ь =K' + a.SOFT + '|' +
  '(Г)@ =K|' +
  '(Г) =K|' +
  '(Г).=K|' +
  '(Г)+=G' + a.SOFT + '|' +
  '(Г)=G|' +
  // Д
  // здн -> зн, рдц -> рц
  'З(Д)Н=|' +
  'Р(Д)Ц=|' +
  '(Д)Ь =T' + a.SOFT + '|' +
  '(Д)@ =T|' +
  '(Д) =T|' +
  '(Д).=T|' +
  '(Д)+=D' + a.SOFT + '|' +
  '(Д)=D|' +
  // Е
  '&(Е)\'=EH4|' +
  '&(Е)=EH|' +
  'Ь(Е)\'=EH4|' +
  'Ь(Е):#\'=IH|' +
  'Ь(Е)=EH|' +
  'Ъ(Е)\'=EH4|' +
  'Ъ(Е):#\'=IH|' +
  'Ъ(Е)=EH|' +
  ' (Е)\'=YEH4|' +
  ' (Е):#\'=YIH|' +
  ' (Е)=YEH|' +
  '#\'(Е)=YIH|' +
  '#(Е)\'=YEH4|' +
  '#(Е):#\'=YIH|' +
  '#(Е)=YEH|' +
  '(Е)\'=EH4|' +
  '\':(Е)=IH|' +
  '(Е):#\'=IH|' +
  '(Е)=EH|' +
  // Ё
  'Ь(Ё)=OH4|' +
  'Ъ(Ё)=OH4|' +
  ' (Ё)=YOH4|' +
  '#\'(Ё)=YOH4|' +
  '#(Ё)=YOH4|' +
  '(Ё)=OH4|' +
  // Ж
  '(Ж)@ =SH|' +
  '(Ж) =SH|' +
  '(Ж).=SH|' +
  '(Ж)=ZH|' +
  // З
  '(З)Ь =S' + a.SOFT + '|' +
  '(З)@ =S|' +
  '(З) =S|' +
  '(З).=S|' +
  '(З)+=Z' + a.SOFT + '|' +
  '(З)=Z|' +
  // И
  '&(И)\'=' + a.YERY + '4|' +
  '&(И)=' + a.YERY + '|' +
  '(И)\'=IY4|' +
  '(И)=IH|' +
  // Й
  '(Й)=Y|' +
  // К
  '(К)@=G|' +
  '(К)+=K' + a.SOFT + '|' +
  '(К)=K|' +
  // Л
  // л drops out of -лнц- (солнце)
  '(Л)НЦ=|' +
  '(Л)+=L' + a.SOFT + '|' +
  '(Л)=L|' +
  // М
  '(М)+=M' + a.SOFT + '|' +
  '(М)=M|' +
  // Н
  '(Н)К=NX|' +
  '(Н)Г=NX|' +
  '(Н)+=N' + a.SOFT + '|' +
  '(Н)=N|' +
  // О
  '(О)\'=OH4|' +
  '(О):#:#\'=AX|' +
  '(О):#\'=AH|' +
  '\':(О)=AX|' +
  '\':#:(О)=AX|' +
  '(О)=OH|' +
  // П
  '(П)@=B|' +
  '(П)+=P' + a.SOFT + '|' +
  '(П)=P|' +
  // Р
  '(Р)+=' + a.R + a.SOFT + '|' +
  '(Р)=' + a.R + '|' +
  // С
  '(С)Ч=SH|' +
  '(С)Ш=SH|' +
  '(С)Ж=ZH|' +
  '(С)Ь =S' + a.SOFT + '|' +
  '(С)@=Z|' +
  '(С)+=S' + a.SOFT + '|' +
  '(С)=S|' +
  // Т
  // -тся / -ться are spoken -цца.
  '(ТЬСЯ) =TSAX|' +
  '(ТСЯ) =TSAX|' +
  // стн -> сн, стл -> сл
  'С(Т)Н=|' +
  'С(Т)Л=|' +
  '(Т)Ь =T' + a.SOFT + '|' +
  '(Т)@=D|' +
  '(Т)+=T' + a.SOFT + '|' +
  '(Т)=T|' +
  // У
  '(У)\'=' + a.U + '4|' +
  '\':(У)=UH|' +
  '(У):#\'=UH|' +
  '(У)=' + a.U + '|' +
  // Ф
  '(Ф)+=F' + a.SOFT + '|' +
  '(Ф)=F|' +
  // Х
  '(Х)+=' + a.KH + a.SOFT + '|' +
  '(Х)=' + a.KH + '|' +
  // Ц
  '(Ц)=TS|' +
  // Ч
  ' (ЧТОБ)=SHTOH4B|' +
  ' (ЧТО)=SHTOH4|' +
  'КОНЕ(ЧН)О=SHN|' +
  '(Ч)=CH|' +
  // Ш
  '(Ш)=SH|' +
  // Щ
  '(Щ)=' + a.SHCH + '|' +
  // Ъ
  '(Ъ)#=Y|' +
  '(Ъ)=|' +
  // Ы
  '(Ы)\'=' + a.YERY + '4|' +
  '(Ы)=' + a.YERY + '|' +
  // Ь
  '(Ь)=|' +
  // Э
  '(Э)\'=EH4|' +
  '(Э)=EH|' +
  // Ю
  'Ь(Ю)\'=' + a.U + '4|' +
  'Ь(Ю):#\'=UH|' +
  'Ь(Ю)=' + a.U + '|' +
  'Ъ(Ю)\'=' + a.U + '4|' +
  'Ъ(Ю):#\'=UH|' +
  'Ъ(Ю)=' + a.U + '|' +
  ' (Ю)\'=Y' + a.U + '4|' +
  ' (Ю):#\'=YUH|' +
  ' (Ю)=Y' + a.U + '|' +
  '#\'(Ю)=YUH|' +
  '#(Ю)\'=Y' + a.U + '4|' +
  '#(Ю):#\'=YUH|' +
  '#(Ю)=Y' + a.U + '|' +
  '(Ю)\'=' + a.U + '4|' +
  '\':(Ю)=UH|' +
  '(Ю):#\'=UH|' +
  '(Ю)=' + a.U + '|' +
  // Я
  'Ь(Я)\'=AA4|' +
  'Ь(Я):#\'=IH|' +
  'Ь(Я)=AA|' +
  'Ъ(Я)\'=AA4|' +
  'Ъ(Я):#\'=IH|' +
  'Ъ(Я)=AA|' +
  ' (Я)\'=YAA4|' +
  ' (Я):#\'=YIH|' +
  ' (Я)=YAA|' +
  '#\'(Я) =YAX|' +
  '#\'(Я)=YIH|' +
  '#(Я)\'=YAA4|' +
  '#(Я) =YAX|' +
  '#(Я):#\'=YIH|' +
  '#(Я)=YAA|' +
  '(Я)\'=AE4|' +
  // Unstressed word final -я is much the commoner case (дядя, время), so it
  // reduces even without a mark.
  '(Я) =AX|' +
  '\':(Я)=IH|' +
  '(Я):#\'=IH|' +
  '(Я)=AE'
;

const buildRules2 = (a) =>
  '(\')=|' +
  '(!)=.|' +
  '(")=|' +
  '(#)= NOHMIHR|' +
  '($)= DOHLAAR|' +
  '(%)= PRAHTSEH4NT|' +
  '(&)= IH|' +
  '(*)= ZVYOH4ZDAHCHKAH|' +
  '(+)= PLY' + a.U + 'S|' +
  '(,)=,|' +
  ' (-) =-|' +
  '(-)=|' +
  '(.)= TOH4CHKAH|' +
  '(/)= DRAH4PY|' +
  '(0)= NOHLY|' +
  '(1)= AHDIY4N|' +
  '(2)= DVAA4|' +
  '(3)= TRIY4|' +
  '(4)= CHIH' + a.YERY + '4RYIH|' +
  '(5)= PYAE4TY|' +
  '(6)= SHEH4STY|' +
  '(7)= SYEH4MY|' +
  '(8)= VOH4SYIHMY|' +
  '(9)= DYEH4VYIHTY|' +
  '(:)=.|' +
  '(;)=.|' +
  '(=)= RAA4VNOH|' +
  '(?)=?|' +
  '(@)= SAHBAA4KAH|' +
  '(^)= KRY4SHKAH'
;

export const rules = buildRules(TUNE);
export const rules2 = buildRules2(TUNE);
