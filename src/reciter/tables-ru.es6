/**
 * Russian language tables for the reciter ("СЭМ").
 *
 * The phoneme inventory is *exactly* the one of the original SAM - no formant
 * data was added or changed, so the voice stays bit for bit the one of the
 * 1982 original. Russian sounds are approximated with existing allophones:
 *
 *   б п д т г к в ф з с  ->  B P D T G K V F Z S
 *   ж ш ч                ->  ZH SH CH
 *   м н                  ->  M N  (NX before к/г)
 *   л р й                ->  L R Y
 *   х                    ->  /X   (unused by the english rules)
 *   ц                    ->  TS   (affricate spelled out)
 *   щ                    ->  SHSH (long soft ш)
 *   soft consonants      ->  consonant + Y, e.g. ть -> TY
 *   а о у э и            ->  AA OH UW EH IY  (stressed)
 *                            AH AX UH EH IH  (reduced)
 *   я е ё ю              ->  AE EH OH UW with a leading Y where iotated
 *   ы                    ->  IH (see TUNE below)
 *
 * Note that single character phoneme names are written without the '*' pad
 * character used in PhonemeNameTable - 'P' not 'P*' - as the parser matches
 * two character names first and would read a literal '*' as phoneme 43.
 */

/**
 * Phonemes that are a compromise and may be tuned by ear.
 *
 * ы has no counterpart at all in SAM's inventory, х and р only a rough one.
 * They are kept in one place so they can be A/B tested without touching the
 * rules below.
 */
export const TUNE = {
  YERY: 'IH',   // ы     - alternatives: 'IX', 'UX', 'ER', 'UH'
  KH:   '/X',   // х     - alternatives: '/H'
  R:    'R',    // р     - alternatives: 'DX' (alveolar flap, a single tap)
  SHCH: 'SHSH', // щ     - alternatives: 'SH'
};

const Y = TUNE.YERY;
const H = TUNE.KH;
const R = TUNE.R;
const Q = TUNE.SHCH;

/**
 * Char flags.
 *
 * The bit positions are the ones of the original, their *meaning* is remapped
 * to the classes russian phonology actually needs. The rule operators that
 * read them are noted in brackets:
 *
 *  0x01        numeric
 *  0x02        use rule set 2
 *  0x04  ['@'] voiced obstruent - triggers voicing of a preceding obstruent
 *              (б г д ж з; в is excluded as it does not trigger it)
 *  0x08  ['.'] voiceless obstruent - triggers devoicing of a preceding one
 *  0x10  ['&'] always hard consonant (ж ш ц) - blocks palatalisation, и -> ы
 *  0x20  ['^'] consonant (ь and ъ included so clusters can be walked over)
 *  0x40  ['#'] vowel
 *  0x80        alpha or stress mark
 */
export const charFlags = {
  ' ':  0,
  // The stress mark. Alpha, so it can be matched literally by a rule, and
  // rule set 2, so the main loop silently eats it.
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

/** Characters matched by the '+' operator: the vowels that soften a preceding
 * consonant, plus the soft sign. Ъ is deliberately absent - it *blocks*
 * palatalisation. */
export const plusChars = ['Е', 'Ё', 'И', 'Ю', 'Я', 'Ь'];

/** The '@' operator has no exception character in russian. */
export const atChar = '';
export const atCheckChars = [];

/** The '&' operator is a pure flag check here, no digraphs. */
export const ampersandPrefixDigraphs = [];
export const ampersandSuffixDigraphs = [];

const VOWELS = 'АЕЁИОУЫЭЮЯ';

/**
 * Transliteration used for latin input so mixed script text does not abort
 * the conversion.
 */
const LATIN = {
  'A': 'А', 'B': 'Б', 'C': 'К', 'D': 'Д', 'E': 'Е', 'F': 'Ф', 'G': 'Г',
  'H': 'Х', 'I': 'И', 'J': 'Ж', 'K': 'К', 'L': 'Л', 'M': 'М', 'N': 'Н',
  'O': 'О', 'P': 'П', 'Q': 'К', 'R': 'Р', 'S': 'С', 'T': 'Т', 'U': 'У',
  'V': 'В', 'W': 'В', 'X': 'КС', 'Y': 'Й', 'Z': 'З',
};

/**
 * Prepare the input for the rule engine.
 *
 * Stress is the one thing the rules cannot work out on their own - it is
 * lexical in russian and the rule language only sees a local window. All
 * accepted ways of writing it are normalised to a single apostrophe placed
 * *directly behind* the stressed vowel, which is where the rules expect it:
 *
 *   приве́т  (combining acute)  -> ПРИВЕ'Т
 *   прив+ет ('+' before vowel) -> ПРИВЕ'Т
 *   привёт  (ё is always stressed)
 *
 * Without a mark a word simply keeps its full, unreduced vowels.
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
  // Latin letters are transliterated.
  text = text.replace(/[A-Z]/g, (c) => LATIN[c]);
  // Doubled consonants are pronounced as one.
  text = text.replace(/([БВГДЖЗКЛМНПРСТФХЦЧШЩ])\1/g, '$1');
  // Anything the tables do not know would abort the conversion - drop it.
  text = text.replace(/[^АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0-9 '!"#$%&*+,\-./:;=?@^]/g, ' ');

  return text;
};

export const rules =
  // --- А -----------------------------------------------------------------
  '(А)\'=AA4|' +
  '(А):#:#\'=AX|' +
  '(А):#\'=AH|' +
  '\':(А)=AX|' +
  '\':#:(А)=AX|' +
  '(А)=AA|' +
  // --- Б -----------------------------------------------------------------
  '(Б)Ь =PY|' +
  '(Б)@ =P|' +
  '(Б) =P|' +
  '(Б).=P|' +
  '(Б)+=BY|' +
  '(Б)=B|' +
  // --- В -----------------------------------------------------------------
  // чувство, здравствуй - в drops out of -вств-
  '(В)СТВ=|' +
  '(В)Ь =FY|' +
  '(В)@ =F|' +
  '(В) =F|' +
  '(В).=F|' +
  '(В)+=VY|' +
  '(В)=V|' +
  // --- Г -----------------------------------------------------------------
  // Adverbs that keep their Г against the genitive rule below.
  ' МНО(Г)О =G|' +
  ' СТРО(Г)О =G|' +
  ' ДОРО(Г)О =G|' +
  ' УБО(Г)О =G|' +
  ' ПОЛО(Г)О =G|' +
  // Genitive endings -ого / -его are spoken -ово / -ево.
  'О(Г)О =V|' +
  'Е(Г)О =V|' +
  '(Г)Ь =KY|' +
  '(Г)@ =K|' +
  '(Г) =K|' +
  '(Г).=K|' +
  '(Г)+=GY|' +
  '(Г)=G|' +
  // --- Д -----------------------------------------------------------------
  // здн -> зн, рдц -> рц
  'З(Д)Н=|' +
  'Р(Д)Ц=|' +
  '(Д)Ь =TY|' +
  '(Д)@ =T|' +
  '(Д) =T|' +
  '(Д).=T|' +
  '(Д)+=DY|' +
  '(Д)=D|' +
  // --- Е -----------------------------------------------------------------
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
  // --- Ё -----------------------------------------------------------------
  'Ь(Ё)=OH4|' +
  'Ъ(Ё)=OH4|' +
  ' (Ё)=YOH4|' +
  '#\'(Ё)=YOH4|' +
  '#(Ё)=YOH4|' +
  '(Ё)=OH4|' +
  // --- Ж -----------------------------------------------------------------
  '(Ж)@ =SH|' +
  '(Ж) =SH|' +
  '(Ж).=SH|' +
  '(Ж)=ZH|' +
  // --- З -----------------------------------------------------------------
  '(З)Ь =SY|' +
  '(З)@ =S|' +
  '(З) =S|' +
  '(З).=S|' +
  '(З)+=ZY|' +
  '(З)=Z|' +
  // --- И -----------------------------------------------------------------
  '&(И)\'=' + Y + '4|' +
  '&(И)=' + Y + '|' +
  '(И)\'=IY4|' +
  '(И)=IH|' +
  // --- Й -----------------------------------------------------------------
  '(Й)=Y|' +
  // --- К -----------------------------------------------------------------
  '(К)@=G|' +
  '(К)+=KY|' +
  '(К)=K|' +
  // --- Л -----------------------------------------------------------------
  // солнце, сердце - л drops out of -лнц-
  '(Л)НЦ=|' +
  '(Л)+=LY|' +
  '(Л)=L|' +
  // --- М -----------------------------------------------------------------
  '(М)+=MY|' +
  '(М)=M|' +
  // --- Н -----------------------------------------------------------------
  '(Н)К=NX|' +
  '(Н)Г=NX|' +
  '(Н)+=NY|' +
  '(Н)=N|' +
  // --- О -----------------------------------------------------------------
  '(О)\'=OH4|' +
  '(О):#:#\'=AX|' +
  '(О):#\'=AH|' +
  '\':(О)=AX|' +
  '\':#:(О)=AX|' +
  '(О)=OH|' +
  // --- П -----------------------------------------------------------------
  '(П)@=B|' +
  '(П)+=PY|' +
  '(П)=P|' +
  // --- Р -----------------------------------------------------------------
  '(Р)+=' + R + 'Y|' +
  '(Р)=' + R + '|' +
  // --- С -----------------------------------------------------------------
  '(С)Ч=SH|' +
  '(С)Ш=SH|' +
  '(С)Ж=ZH|' +
  '(С)Ь =SY|' +
  '(С)@=Z|' +
  '(С)+=SY|' +
  '(С)=S|' +
  // --- Т -----------------------------------------------------------------
  // Reflexive -тся / -ться are spoken -цца.
  '(ТЬСЯ) =TSAX|' +
  '(ТСЯ) =TSAX|' +
  // стн -> сн, стл -> сл
  'С(Т)Н=|' +
  'С(Т)Л=|' +
  '(Т)Ь =TY|' +
  '(Т)@=D|' +
  '(Т)+=TY|' +
  '(Т)=T|' +
  // --- У -----------------------------------------------------------------
  '(У)\'=UW4|' +
  '\':(У)=UH|' +
  '(У):#\'=UH|' +
  '(У)=UW|' +
  // --- Ф -----------------------------------------------------------------
  '(Ф)+=FY|' +
  '(Ф)=F|' +
  // --- Х -----------------------------------------------------------------
  '(Х)+=' + H + 'Y|' +
  '(Х)=' + H + '|' +
  // --- Ц -----------------------------------------------------------------
  '(Ц)=TS|' +
  // --- Ч -----------------------------------------------------------------
  ' (ЧТОБ)=SHTOH4B|' +
  ' (ЧТО)=SHTOH4|' +
  'КОНЕ(ЧН)О=SHN|' +
  '(Ч)=CH|' +
  // --- Ш -----------------------------------------------------------------
  '(Ш)=SH|' +
  // --- Щ -----------------------------------------------------------------
  '(Щ)=' + Q + '|' +
  // --- Ъ -----------------------------------------------------------------
  '(Ъ)#=Y|' +
  '(Ъ)=|' +
  // --- Ы -----------------------------------------------------------------
  '(Ы)\'=' + Y + '4|' +
  '(Ы)=' + Y + '|' +
  // --- Ь -----------------------------------------------------------------
  '(Ь)=|' +
  // --- Э -----------------------------------------------------------------
  '(Э)\'=EH4|' +
  '(Э)=EH|' +
  // --- Ю -----------------------------------------------------------------
  'Ь(Ю)\'=UW4|' +
  'Ь(Ю):#\'=UH|' +
  'Ь(Ю)=UW|' +
  'Ъ(Ю)\'=UW4|' +
  'Ъ(Ю):#\'=UH|' +
  'Ъ(Ю)=UW|' +
  ' (Ю)\'=YUW4|' +
  ' (Ю):#\'=YUH|' +
  ' (Ю)=YUW|' +
  '#\'(Ю)=YUH|' +
  '#(Ю)\'=YUW4|' +
  '#(Ю):#\'=YUH|' +
  '#(Ю)=YUW|' +
  '(Ю)\'=UW4|' +
  '\':(Ю)=UH|' +
  '(Ю):#\'=UH|' +
  '(Ю)=UW|' +
  // --- Я -----------------------------------------------------------------
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
  // Unstressed word final -я is far more common than the stressed one
  // (дядя, время, здания, ...), so it is reduced even without a mark.
  '(Я) =AX|' +
  '\':(Я)=IH|' +
  '(Я):#\'=IH|' +
  '(Я)=AE'
;

export const rules2 =
  '(\')=|' +
  '(!)=.|' +
  '(")=|' +
  '(#)= NOHMIHR|' +
  '($)= DOHLAR|' +
  '(%)= PRAHTSEH4NT|' +
  '(&)= IH|' +
  '(*)= ZVYOH4ZDAHCHKAH|' +
  '(+)= PLYUS|' +
  '(,)=,|' +
  ' (-) =-|' +
  '(-)=|' +
  '(.)= TOH4CHKAH|' +
  '(/)= DRAH4PY|' +
  '(0)= NOHLY|' +
  '(1)= AHDIY4N|' +
  '(2)= DVAA4|' +
  '(3)= TRIY4|' +
  '(4)= CHIH' + Y + '4RYIH|' +
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
