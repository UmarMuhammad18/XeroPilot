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

// Root endpoint for health checks
app.get('/', (req, res) => {
  res.json({ message: 'XeroPilot backend is running' });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
