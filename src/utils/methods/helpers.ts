/*global google*/
export const TRAVEL_MODE_MAPPER = (mode: google.maps.TravelMode): string => {
  return {
    DRIVING: 'Driving',
    WALKING: 'Foot',
    BICYCLING: 'Cycling',
    TRANSIT: 'Public transport',
  }[mode];
};

/**
 * leave out the first and last slash
 * @param input string
 * @param pattern string
 * @returns boolean
 */
export function validateInput(input: string, pattern: string): boolean {
  if (!pattern) return true;
  const regex = new RegExp(pattern);
  return regex.test(input);
}

export function translateRegex(regex: string) {
  // Define common regex patterns and their plain language descriptions
  const patterns = [
    { regex: /^/, description: 'start of the string' },
    { regex: /$/, description: 'end of the string' },
    { regex: /\d/, description: 'a digit' },
    { regex: /\D/, description: 'a non-digit' },
    { regex: /\w/, description: 'a word character (alphanumeric or underscore)' },
    { regex: /\W/, description: 'a non-word character' },
    { regex: /\s/, description: 'a whitespace character' },
    { regex: /\S/, description: 'a non-whitespace character' },
    { regex: /\b/, description: 'a word boundary' },
    { regex: /\B/, description: 'a non-word boundary' },
    { regex: /./, description: 'any character except newline' },
    { regex: /\*/, description: 'zero or more occurrences' },
    { regex: /\+/, description: 'one or more occurrences' },
    { regex: /\?/, description: 'zero or one occurrence' },
    { regex: /\|/, description: 'alternation (OR)' },
    { regex: /\[/, description: 'start of a character set' },
    { regex: /\]/, description: 'end of a character set' },
    { regex: /\(/, description: 'start of a group' },
    { regex: /\)/, description: 'end of a group' },
    { regex: /\\/, description: 'escape character' },
    { regex: /\{(\d+)\}/, description: 'exactly $1 occurrences' },
    { regex: /\{(\d+),\}/, description: 'at least $1 occurrences' },
    { regex: /\{(\d+),(\d+)\}/, description: 'between $1 and $2 occurrences' },
  ];

  const regexString = new RegExp(regex).toString(); // Convert regex to string
  let translation = regexString;

  // Iterate over each pattern and replace it with its description
  patterns.forEach((pattern) => {
    translation = translation.replace(pattern.regex, pattern.description);
  });

  return translation;
}

export function separateAndCapitalize(input: string | undefined): string | undefined {
  if (!input) return;
  // Use a regular expression to split at capital letters
  const parts = input.split(/(?=[A-Z])/);

  // Capitalize the first letter of each part and join them with a space
  const result = parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(' ');

  return result;
}

export const errorTransform = (err: string): string => {
  return err?.replace(/Firebase:/g, '');
};
