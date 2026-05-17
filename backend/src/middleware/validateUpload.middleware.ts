import { Response, NextFunction } from 'express';
import config from '../config';

interface MulterRequest extends Express.Request {
  file?: Express.Multer.File;
}

export const validateUpload = (req: MulterRequest, res: Response, next: NextFunction): void => {
  const file = req.file;

  if (!file) {
    res.status(400).json({ success: false, message: 'No file uploaded' });
    return;
  }

  if (!config.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    res.status(400).json({ success: false, message: 'Invalid file type. Allowed: PDF, PNG, JPG' });
    return;
  }

  next();
};
