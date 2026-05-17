export function cleanText(text: string) {
  return text
    .replace(/\s+/g, " ")
    .replace(/[\n\r]/g, " ")
    .replace(/\t/g, " ")
    .trim();
}