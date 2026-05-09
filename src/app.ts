import compression from 'compression';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './routes';
import { Morgan } from './shared/morgen';
import sendResponse from './shared/sendResponse';

const app = express();

// Logging
app.use(Morgan.successHandler);
app.use(Morgan.errorHandler);

// Compression for optimized response payloads
app.use(compression());

// Body parser & CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use(express.static('uploads'));

// API routes
app.use('/api/v1', router);

// Health check
app.get('/', (_req: Request, res: Response) => {
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Server is running',
    data: { timestamp: new Date().toISOString(), status: 'healthy' },
  });
});

// Global error handler
app.use(globalErrorHandler);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API doesn't exist",
      },
    ],
  });
});

export default app;
