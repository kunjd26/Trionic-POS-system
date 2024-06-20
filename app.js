import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Local imports.
import apiRouter from './routes/api.js';
import globalErrorHandler from './middlewares/GlobalErrorHandler.js';
import env from './config/EnvironmentConfig.js';

// Initializing.
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Global middlewares.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes.
app.use('/api', apiRouter);

// Global error handler middlewares.
app.use(globalErrorHandler.notFound);
app.use(globalErrorHandler.internalServerError);

const PORT = env.APP_PORT || 3000;
const APP_URL = env.APP_URL;

app.listen(PORT, () => {
    console.log(`Server running at ${APP_URL}.`);
});

export default app;
