import { Request, Response, NextFunction } from 'express';

interface HttpError extends Error {
  status?: number;
}

const errorMiddleware = (err: HttpError, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = err.status ?? 500;
  console.error(`[${new Date().toISOString()}]`, err);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

export default errorMiddleware;
