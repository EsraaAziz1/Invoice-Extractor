import dotenv from 'dotenv';

dotenv.config();

const parseNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const PORT = parseNumber(process.env.PORT, 4000);
const MAX_FILE_SIZE_MB = parseNumber(process.env.MAX_FILE_SIZE_MB, 10);
const UPLOAD_DIR = process.env.UPLOAD_DIR?.trim() || './uploads';
const HF_TOKEN = process.env.HF_TOKEN?.trim();

if (!HF_TOKEN) {
  throw new Error('HF_TOKEN is required in the environment.');
}

const config = {
  PORT,
 HF_TOKEN,
  UPLOAD_DIR,
  MAX_FILE_SIZE: MAX_FILE_SIZE_MB * 1024 * 1024,
  ALLOWED_MIME_TYPES: ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']
};

export default config;
