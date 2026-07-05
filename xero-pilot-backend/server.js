import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.js';
import invoiceRoutes from './src/routes/invoices.js';
import receiptRoutes from './src/routes/receipts.js';
import bankRoutes from './src/routes/bank.js';
import contactRoutes from './src/routes/contacts.js';
import automationRoutes from './src/routes/automations.js';
import logRoutes from './src/routes/logs.js';
import aiRoutes from './src/routes/ai.js';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/bank', bankRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/automations', automationRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/ai', aiRoutes);

// Root endpoint for health checks
app.get('/', (req, res) => {
  res.json({ message: 'XeroPilot backend is running' });
});

const server = app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

// Handle listen errors (for example when the port is already in use)
server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please free the port or set PORT to a different value.`);
    console.error(`If you want to stop the process currently using the port run (PowerShell): Stop-Process -Id <pid> -Force`);
    process.exit(1);
  }
  // Re-throw unexpected errors so they are visible
  throw err;
});
