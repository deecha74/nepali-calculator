/**
 * Preeti to Unicode & Unicode to Preeti conversion rules
 * Compliant with traditional Nepal Government & Media font standard.
 */

// Preeti character to Unicode map
const PREETI_TO_UNICODE_MAP: Record<string, string> = {
  "~": "ञ्", "±": "ध्र", "²": "द्घ", "³": "द्ध", "´": "द्य",
  "µ": "द्व", "¶": "ष्ठ", "·": "ष्ट", "¸": "द्र", "¹": "प्र",
  "º": "त्र", "»": "श्र", "¼": "ग्र", "½": "म्र", "¾": "भ्र",
  "¿": "रु", "À": "रू", "Á": "हृ", "Â": "ङ्क", "Ã": "ङ्ख",
  "Ä": "ङ्ग", "Å": "ङ्घ", "Æ": "क्क", "Ç": "त्त", "È": "त्थ",
  "q": "त्र", "w": "ध", "e": "भ", "r": "च", "t": "त",
  "y": "थ", "u": "ग", "i": "ष", "o": "घ", "p": "प",
  "a": "ब", "s": "क", "d": "म", "f": "ा", "g": "न",
  "h": "ज", "j": "व", "k": "प", "l": "ि", ";": "स",
  "'": "ु", "z": "श", "x": "ह", "c": "अ", "v": "ख",
  "b": "द", "n": "ल", "m": "उ", ",": "ए", ".": "।",
  "/": "र्", "Q": "त्त", "W": "ध्", "E": "भ्", "R": "च्",
  "T": "त्", "Y": "थ्", "U": "ग्", "I": "क्ष्", "O": "घ्",
  "P": "फ्", "A": "ब्", "S": "क्", "D": "म्", "F": "ँ",
  "G": "न्", "H": "ज्", "J": "व्", "K": "प्", "L": "ी",
  ":": "स्", '"': "ू", "Z": "श्", "X": "ह्", "C": "ऋ",
  "V": "ख्", "B": "द्य", "N": "ल्", "M": "ऊ", "<": "ङ",
  ">": "श्र", "?": "रु", "1": "१", "2": "२", "3": "३",
  "4": "४", "5": "५", "6": "६", "7": "७", "8": "८",
  "9": "९", "0": "०", "!": "१", "@": "२", "#": "३",
  "$": "४", "%": "५", "^": "६", "&": "७", "*": "८",
  "(": "९", ")": "०",
};

export function preetiToUnicode(input: string): string {
  if (!input) return "";
  let text = input;

  // Handle post-consonant 'l' (matra 'ि') in Preeti which precedes the consonant in typing
  text = text.replace(/l([a-zA-Z])/g, "$1l");

  let out = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (PREETI_TO_UNICODE_MAP[ch]) {
      out += PREETI_TO_UNICODE_MAP[ch];
    } else {
      out += ch;
    }
  }

  // Common conjuncts clean-up
  out = out.replace(/र्([क-ह])/g, "$1्");
  return out;
}

// Reverse mapping Unicode to Preeti
const UNICODE_TO_PREETI_MAP: Record<string, string> = {};
for (const [p, u] of Object.entries(PREETI_TO_UNICODE_MAP)) {
  if (!UNICODE_TO_PREETI_MAP[u]) {
    UNICODE_TO_PREETI_MAP[u] = p;
  }
}

export function unicodeToPreeti(input: string): string {
  if (!input) return "";
  let out = "";
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (UNICODE_TO_PREETI_MAP[ch]) {
      out += UNICODE_TO_PREETI_MAP[ch];
    } else {
      out += ch;
    }
  }
  return out;
}
