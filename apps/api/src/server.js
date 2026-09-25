import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const PORT = process.env.API_PORT || 4000;
const HOST = process.env.API_HOST || 'localhost';

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'orion-api' });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'orion-api', version: '0.1.0' });
});

app.use((err, _req, res, _next) => {
  console.error('[API Error]', err);
  const status = err.statusCode || 500;
  const message = status === 500 ? 'Internal server error' : err.message;
  res.status(status).json({
    error: { message, status, timestamp: new Date().toISOString() }
  });
});

app.listen(PORT, HOST, () => {
  console.log(`[ORION API] Running on http://${HOST}:${PORT}`);
  console.log(`[ORION API] Health: http://${HOST}:${PORT}/health`);
});

export { app };
