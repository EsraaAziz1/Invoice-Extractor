import express from 'express';
import cors from 'cors';
import invoiceRoutes from './routes/invoice.routes';
import requestLogger from './middleware/requestLogger.middleware';
import errorMiddleware from './middleware/error.middleware';

const app = express();

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use(requestLogger);
app.use('/api/invoices', invoiceRoutes);
app.use(errorMiddleware);

export default app;
