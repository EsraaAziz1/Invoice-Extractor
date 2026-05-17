import fs from 'fs/promises';

export const removeFile = async (path: string): Promise<void> => {
  try {
    await fs.unlink(path);
  } catch (error) {
    // ignore cleanup errors
  }
};
