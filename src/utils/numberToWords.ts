/**
 * Utility to convert numbers, years, currencies, ordinals, and quantities into fully spoken English words
 * for speech synthesis and AI video generator audio prompts.
 * Prevents TTS engines from mispronouncing "330 million" as "30 million", "10,000" as "ten zero zero", etc.
 */

const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const TEENS = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

const ORDINAL_ONES: Record<number, string> = {
  1: 'first',
  2: 'second',
  3: 'third',
  4: 'fourth',
  5: 'fifth',
  6: 'sixth',
  7: 'seventh',
  8: 'eighth',
  9: 'ninth',
  10: 'tenth',
  11: 'eleventh',
  12: 'twelfth',
  13: 'thirteenth',
  14: 'fourteenth',
  15: 'fifteenth',
  16: 'sixteenth',
  17: 'seventeenth',
  18: 'eighteenth',
  19: 'nineteenth',
  20: 'twentieth',
  30: 'thirtieth',
  40: 'fortieth',
  50: 'fiftieth',
  60: 'sixtieth',
  70: 'seventieth',
  80: 'eightieth',
  90: 'ninetieth'
};

/**
 * Converts any positive integer to an ordinal string (e.g., 51 -> 'fifty-first', 25 -> 'twenty-fifth')
 */
export function ordinalToWords(n: number): string {
  if (ORDINAL_ONES[n]) return ORDINAL_ONES[n];
  if (n < 100) {
    const tens = Math.floor(n / 10) * 10;
    const ones = n % 10;
    return `${TENS[Math.floor(n / 10)]}-${ORDINAL_ONES[ones] || 'th'}`;
  }
  const baseWords = integerToWords(n);
  if (baseWords.endsWith('one')) return baseWords.slice(0, -3) + 'first';
  if (baseWords.endsWith('two')) return baseWords.slice(0, -3) + 'second';
  if (baseWords.endsWith('three')) return baseWords.slice(0, -5) + 'third';
  if (baseWords.endsWith('five')) return baseWords.slice(0, -4) + 'fifth';
  if (baseWords.endsWith('eight')) return baseWords + 'h';
  if (baseWords.endsWith('nine')) return baseWords.slice(0, -4) + 'ninth';
  if (baseWords.endsWith('twelve')) return baseWords.slice(0, -6) + 'twelfth';
  if (baseWords.endsWith('y')) return baseWords.slice(0, -1) + 'ieth';
  return baseWords + 'th';
}

/**
 * Converts integer under 1000 to words
 */
function convertHundreds(n: number): string {
  if (n === 0) return '';
  let str = '';
  if (n >= 100) {
    str += ONES[Math.floor(n / 100)] + ' hundred';
    n %= 100;
    if (n > 0) str += ' and ';
  }
  if (n >= 20) {
    str += TENS[Math.floor(n / 10)];
    n %= 10;
    if (n > 0) str += '-' + ONES[n];
  } else if (n >= 10) {
    str += TEENS[n - 10];
  } else if (n > 0) {
    str += ONES[n];
  }
  return str;
}

/**
 * Converts any positive integer up to billions to words
 */
export function integerToWords(num: number): string {
  if (num === 0) return 'zero';
  if (num < 0) return 'minus ' + integerToWords(Math.abs(num));

  // Check 4-digit years (e.g. 1971, 1887, 1844, 1921, 1896, 1901)
  if (num >= 1000 && num <= 2099 && num % 100 !== 0) {
    const century = Math.floor(num / 100);
    const rest = num % 100;
    const centuryStr = convertHundreds(century);
    if (rest < 10) {
      return `${centuryStr} oh-${ONES[rest]}`;
    } else {
      return `${centuryStr} ${convertHundreds(rest)}`;
    }
  }

  const parts: string[] = [];

  if (num >= 1000000000) {
    const b = Math.floor(num / 1000000000);
    parts.push(convertHundreds(b) + ' billion');
    num %= 1000000000;
  }
  if (num >= 1000000) {
    const m = Math.floor(num / 1000000);
    parts.push(convertHundreds(m) + ' million');
    num %= 1000000;
  }
  if (num >= 1000) {
    const k = Math.floor(num / 1000);
    parts.push(convertHundreds(k) + ' thousand');
    num %= 1000;
  }
  if (num > 0) {
    parts.push(convertHundreds(num));
  }

  return parts.join(' and ');
}

/**
 * Expands numeric expressions and digits within spoken text to fully written words.
 */
export function expandNumbersToWords(text: string): string {
  if (!text) return '';

  let out = text;

  // 1. Decade expressions like "1970s", "1980s", "1990s", "1800s", "1100s", "1700s"
  out = out.replace(/\b1100s\b/gi, 'eleven hundreds');
  out = out.replace(/\b1200s\b/gi, 'twelve hundreds');
  out = out.replace(/\b1300s\b/gi, 'thirteen hundreds');
  out = out.replace(/\b1400s\b/gi, 'fourteen hundreds');
  out = out.replace(/\b1500s\b/gi, 'fifteen hundreds');
  out = out.replace(/\b1600s\b/gi, 'sixteen hundreds');
  out = out.replace(/\b1700s\b/gi, 'seventeen hundreds');
  out = out.replace(/\b1800s\b/gi, 'eighteen hundreds');
  out = out.replace(/\b1900s\b/gi, 'nineteen hundreds');
  out = out.replace(/\b1920s\b/gi, 'nineteen-twenties');
  out = out.replace(/\b1930s\b/gi, 'nineteen-thirties');
  out = out.replace(/\b1940s\b/gi, 'nineteen-forties');
  out = out.replace(/\b1950s\b/gi, 'nineteen-fifties');
  out = out.replace(/\b1960s\b/gi, 'nineteen-sixties');
  out = out.replace(/\b1970s\b/gi, 'nineteen-seventies');
  out = out.replace(/\b1980s\b/gi, 'nineteen-eighties');
  out = out.replace(/\b1990s\b/gi, 'nineteen-nineties');
  out = out.replace(/\b2000s\b/gi, 'two-thousands');
  out = out.replace(/\b2020s\b/gi, 'twenty-twenties');

  // 2. Specific ordinal centuries (e.g. "19th-century", "18th century", "20th-century")
  out = out.replace(/\b1st[- ]century\b/gi, 'first-century');
  out = out.replace(/\b2nd[- ]century\b/gi, 'second-century');
  out = out.replace(/\b3rd[- ]century\b/gi, 'third-century');
  out = out.replace(/\b10th[- ]century\b/gi, 'tenth-century');
  out = out.replace(/\b11th[- ]century\b/gi, 'eleventh-century');
  out = out.replace(/\b12th[- ]century\b/gi, 'twelfth-century');
  out = out.replace(/\b13th[- ]century\b/gi, 'thirteenth-century');
  out = out.replace(/\b14th[- ]century\b/gi, 'fourteenth-century');
  out = out.replace(/\b15th[- ]century\b/gi, 'fifteenth-century');
  out = out.replace(/\b16th[- ]century\b/gi, 'sixteenth-century');
  out = out.replace(/\b17th[- ]century\b/gi, 'seventeenth-century');
  out = out.replace(/\b18th[- ]century\b/gi, 'eighteenth-century');
  out = out.replace(/\b19th[- ]century\b/gi, 'nineteenth-century');
  out = out.replace(/\b20th[- ]century\b/gi, 'twentieth-century');
  out = out.replace(/\b21st[- ]century\b/gi, 'twenty-first-century');

  // 3. Currency (e.g. £65,000, £8,000, £100 million, £50)
  out = out.replace(/£(\d+[\d,]*)\s*million/gi, (_, n) => {
    const val = parseInt(n.replace(/,/g, ''), 10);
    return `${integerToWords(val)} million pounds`;
  });
  out = out.replace(/£(\d+[\d,]*)/g, (_, n) => {
    const val = parseInt(n.replace(/,/g, ''), 10);
    return `${integerToWords(val)} pounds`;
  });

  // 4. Millions / Billions with numbers (e.g. "330 million", "340 million", "6.5 million", "100 million")
  out = out.replace(/(\d+(?:\.\d+)?)\s*million/gi, (_, n) => {
    if (n.includes('.')) {
      const [whole, dec] = n.split('.');
      if (dec === '5') return `${integerToWords(parseInt(whole, 10))} and a half million`;
      return `${integerToWords(parseInt(whole, 10))} point ${integerToWords(parseInt(dec, 10))} million`;
    }
    return `${integerToWords(parseInt(n, 10))} million`;
  });

  out = out.replace(/(\d+(?:\.\d+)?)\s*billion/gi, (_, n) => {
    return `${integerToWords(parseInt(n, 10))} billion`;
  });

  // 5. Time expressions (e.g. "1 PM", "10 PM", "1:00 PM", "9 AM")
  out = out.replace(/\b1\s*PM\b/gi, 'one PM');
  out = out.replace(/\b2\s*PM\b/gi, 'two PM');
  out = out.replace(/\b3\s*PM\b/gi, 'three PM');
  out = out.replace(/\b4\s*PM\b/gi, 'four PM');
  out = out.replace(/\b5\s*PM\b/gi, 'five PM');
  out = out.replace(/\b6\s*PM\b/gi, 'six PM');
  out = out.replace(/\b7\s*PM\b/gi, 'seven PM');
  out = out.replace(/\b8\s*PM\b/gi, 'eight PM');
  out = out.replace(/\b9\s*PM\b/gi, 'nine PM');
  out = out.replace(/\b10\s*PM\b/gi, 'ten PM');
  out = out.replace(/\b11\s*PM\b/gi, 'eleven PM');
  out = out.replace(/\b12\s*PM\b/gi, 'twelve PM');
  out = out.replace(/\b1\s*AM\b/gi, 'one AM');
  out = out.replace(/\b10\s*AM\b/gi, 'ten AM');

  // 6. Common compound adjectives (e.g. "14-storey", "10-foot", "175-foot", "100-ton", "2-foot")
  out = out.replace(/\b(\d+)-storey\b/gi, (_, n) => `${integerToWords(parseInt(n, 10))}-storey`);
  out = out.replace(/\b(\d+)-foot\b/gi, (_, n) => `${integerToWords(parseInt(n, 10))}-foot`);
  out = out.replace(/\b(\d+)-ton\b/gi, (_, n) => `${integerToWords(parseInt(n, 10))}-ton`);
  out = out.replace(/\b(\d+)-metre\b/gi, (_, n) => `${integerToWords(parseInt(n, 10))}-metre`);
  out = out.replace(/\b(\d+)-inch\b/gi, (_, n) => `${integerToWords(parseInt(n, 10))}-inch`);
  out = out.replace(/\b(\d+)-minute\b/gi, (_, n) => `${integerToWords(parseInt(n, 10))}-minute`);
  out = out.replace(/\b(\d+)-second\b/gi, (_, n) => `${integerToWords(parseInt(n, 10))}-second`);

  // 7. Ordinals (e.g. 1st, 2nd, 3rd, 4th, 10th, 14th, 25th, 51st)
  out = out.replace(/\b(\d+)(?:st|nd|rd|th)\b/gi, (_, n) => {
    const num = parseInt(n, 10);
    return ordinalToWords(num);
  });

  // 8. Specific 4-digit years (1000 - 2099)
  out = out.replace(/\b(1[0-9]{3}|20[0-2][0-9])\b/g, (match) => {
    const val = parseInt(match, 10);
    return integerToWords(val);
  });

  // 9. Comma-separated large numbers (e.g. 10,000, 53,000, 65,000)
  out = out.replace(/\b(\d{1,3}(?:,\d{3})+)\b/g, (match) => {
    const val = parseInt(match.replace(/,/g, ''), 10);
    return integerToWords(val);
  });

  // 10. Remaining standalone numbers 1 to 999
  out = out.replace(/\b([1-9]\d{0,2})\b/g, (match, n, offset, fullStr) => {
    // Avoid replacing if it's part of a technical code or measurement already handled
    const prevChar = offset > 0 ? fullStr[offset - 1] : '';
    const nextChar = offset + match.length < fullStr.length ? fullStr[offset + match.length] : '';
    if (prevChar === '#' || prevChar === '$' || nextChar === '%') {
      return match;
    }
    const val = parseInt(n, 10);
    return integerToWords(val);
  });

  // Clean up any double spaces or spacing artifacts
  return out.replace(/\s+/g, ' ').trim();
}
