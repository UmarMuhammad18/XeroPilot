import express from 'express';
import { fetchInvoices, createInvoice, updateInvoiceStatus } from '../controllers/invoiceController.js';

const router = express.Router();

router.get('/', fetchInvoices);
router.post('/create', createInvoice);
router.post('/update-status', updateInvoiceStatus);

export default router;
