import express, { Response, NextFunction } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import config from '../config';
import { runInvoiceAgent } from '../agents/invoiceAgent';
import { validateUpload } from '../middleware/validateUpload.middleware';
import { ExtractApiResponse } from '../interfaces/invoice.interface';

interface MulterRequest extends express.Request {
  file?: Express.Multer.File;
}

const router = express.Router();

const uploadDir = path.resolve(config.UPLOAD_DIR);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeName = `${timestamp}-${file.originalname}`.replace(/\s+/g, '-');
    cb(null, safeName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: config.MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    cb(null, config.ALLOWED_MIME_TYPES.includes(file.mimetype));
  }
});

router.post('/extract', upload.single('invoice'), validateUpload, async (req: MulterRequest, res: Response, next: NextFunction) => {
  const file = req.file;

  if (!file) {
    const errorResponse: ExtractApiResponse = { success: false, message: 'No file uploaded' };
    return res.status(400).json(errorResponse);
  }

  const filePath = path.resolve(file.path);
  const mimeType = file.mimetype;

  try {
    const data = await runInvoiceAgent(filePath, mimeType);
    const successResponse: ExtractApiResponse = { success: true, data };
    return res.json(successResponse);
  } catch (error: unknown) {
    next(error);
  } finally {
    fs.unlink(filePath, (unlinkError) => {
      if (unlinkError) {
        console.error('Failed to delete uploaded file:', unlinkError);
      }
    });
  }
});

export default router;
