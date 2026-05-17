import fs from 'fs/promises';
import pdfParse from 'pdf-parse';

export const extractTextFromPdf = async (path: string): Promise<string> => {
  const fileBuffer = await fs.readFile(path);
  const data = await pdfParse(fileBuffer);
  return data.text.trim();
};
